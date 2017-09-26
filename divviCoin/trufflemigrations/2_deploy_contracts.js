var DivviCoin = artifacts.require("./DivviCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(DivviCoin, 1000000000000000, "Divvi Coin", 1, "DIV");
};
