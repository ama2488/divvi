pragma solidity ^0.4.2;

import './Owned.sol';

contract DivviCoin is Ownable {
uint256 public totalSupply;
string public name;
uint8 public decimals;
string public symbol;

event Transfer(address indexed _from, address indexed _to, uint256 _value);
event Approval(address indexed _owner, address indexed _spender, uint256 _value);

struct Balance {
  uint256 balance;
  bool isCharity;
  uint256 totalDonations;
}

mapping (address => Balance) balances;
mapping (address => mapping (address => uint256)) allowed;

function DivviCoin(
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol
        ) {
        balances[msg.sender] = Balance(_initialAmount, true, 0);// Give the creator all initial tokens
        totalSupply = _initialAmount;                        // Update total supply
        name = _tokenName;                                   // Set the name for display purposes
        decimals = _decimalUnits;                            // Amount of decimals for display purposes
        symbol = _tokenSymbol;                               // Set the symbol for display purposes
    }

		function transfer(address _to, uint256 _value) returns (bool success) {
        require(balances[msg.sender].balance >= _value);
        balances[msg.sender].balance -= _value;
        balances[_to].balance += _value;
        Transfer(msg.sender, _to, _value);
        if (balances[_to].isCharity){
          balances[msg.sender].totalDonations += _value;
        }
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) onlyOwner returns (bool success) {
        if (allowed[_from][_to] >= _value && balances[_from].balance >= _value){
        balances[_to].balance += _value;
        balances[_from].balance -= _value;
        allowed[_from][_to] -= _value;
        Transfer(_from, _to, _value);
        return true;
      } else {
        return false;
      }
    }

    function balanceOf(address _account) constant returns (uint256 balance) {
        return balances[_account].balance;
    }

    function balanceOfDonations(address _account) constant returns (uint balance) {
      return balances[_account].totalDonations;
    }

    function approve(address _to, uint256 _value) returns (bool success) {
        allowed[msg.sender][_to] = _value;
        Approval(msg.sender, _to, _value);
        return true;
    }

    function allowance(address _from, address _to) constant returns (uint256 remaining) {
      return allowed[_from][_to];
    }

    function addCharity(address charity) onlyOwner {
      balances[charity] = Balance(500, true, 0);
      balances[msg.sender].balance -= 500;
    }

    function addAccount(address account) onlyOwner {
      balances[account] = Balance(500, false, 0);
      balances[msg.sender].balance -= 500;
    }

    function removeAccount(address account) onlyOwner {
      balances[msg.sender].balance += balances[account].balance;
      delete balances[account];
    }
}
