pragma solidity ^0.4.2;

import "./DivviCoin.sol";

contract DivviCoinFactory {

    mapping(address => address[]) public created;
    mapping(address => bool) public isDivviCoin; //verify without having to do a bytecode check.
    bytes public divviByteCode;

    function DivviCoinFactory() {
      //upon creation of the factory, deploy a HumanStandardToken (parameters are meaningless) and store the bytecode provably.
      address verifiedToken = createDivviCoin(10000, "Divvi Coin", 3, "DIV");
      divviByteCode = codeAt(verifiedToken);
    }

    //verifies if a contract that has been deployed is a Human Standard Token.
    //NOTE: This is a very expensive function, and should only be used in an eth_call. ~800k gas
    function verifyDivviCoin(address _tokenContract) constant returns (bool) {
      bytes memory fetchedTokenByteCode = codeAt(_tokenContract);

      if (fetchedTokenByteCode.length != divviByteCode.length) {
        return false; //clear mismatch
      }

      //starting iterating through it if lengths match
      for (uint i = 0; i < fetchedTokenByteCode.length; i ++) {
        if (fetchedTokenByteCode[i] != divviByteCode[i]) {
          return false;
        }
      }

      return true;
    }

    function codeAt(address _addr) internal constant returns (bytes o_code) {
      assembly {
          // retrieve the size of the code, this needs assembly
          let size := extcodesize(_addr)
          // allocate output byte array - this could also be done without assembly
          // by using o_code = new bytes(size)
          o_code := mload(0x40)
          // new "memory end" including padding
          mstore(0x40, add(o_code, and(add(add(size, 0x20), 0x1f), not(0x1f))))
          // store length in memory
          mstore(o_code, size)
          // actually retrieve the code, this needs assembly
          extcodecopy(_addr, add(o_code, 0x20), 0, size)
      }
    }

    function createDivviCoin(uint256 _initialAmount, string _name, uint8 _decimals, string _symbol) returns (address) {

        DivviCoin newToken = (new DivviCoin(_initialAmount, _name, _decimals, _symbol));
        created[msg.sender].push(address(newToken));
        isDivviCoin[address(newToken)] = true;
        newToken.transfer(msg.sender, _initialAmount); //the factory will own the created tokens. You must transfer them.
        return address(newToken);
    }
}
