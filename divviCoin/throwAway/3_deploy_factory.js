const DivviCoinFactory = artifacts.require(`./DivviCoinFactory.sol`)

module.exports = (deployer) => {
  deployer.deploy(DivviCoinFactory)
}
