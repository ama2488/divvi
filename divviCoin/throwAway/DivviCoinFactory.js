const DivviCoinFactory = artifacts.require('DivviCoinFactory')

contract('DivviCoinFactory', function (accounts) {
  it('Verify a Divvi Coin once deployed using both verification functions.', async () => {
    const factory = await DivviCoinFactory.new()
    const newTokenAddr = await factory.createDivviCoin.call(100000, 'Divvi Coin', 3, 'DIV', { from: accounts[0] })
    await factory.createDivviCoin(100000, 'Divvi Coin', 3, 'DIV', { from: accounts[0] })
    const res = await factory.verifyDivviCoin.call(newTokenAddr, { from: accounts[0] })
    assert(res, 'Could not verify the token.')
  })
})
