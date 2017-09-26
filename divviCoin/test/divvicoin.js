const DivviCoin = artifacts.require('./DivviCoin.sol')
const expectThrow = require('./utils').expectThrow
let DIV

contract('DivviCoin', function (accounts) {
  beforeEach(async () => {
    DIV = await DivviCoin.deployed()
  })

  it('should put 10000 DivviCoin in the first account', async() => {
    const balance = await DIV.balanceOf.call(accounts[0])
    assert.equal(balance.toNumber(), 10000, "10000 wasn't in the first account")
  })

  it('creation: test correct setting of vanity information', async () => {
    const name = await DIV.name.call()
    assert.strictEqual(name, 'Divvi Coin')

    const decimals = await DIV.decimals.call()
    assert.strictEqual(decimals.toNumber(), 1)

    const symbol = await DIV.symbol.call()
    assert.strictEqual(symbol, 'DIV')
  })

  xit('should call a function that depends on a linked library', async () => {
    let balance = await DIV.balanceOf.call(accounts[0])
    let CoinBalance = await balance.toNumber()
    let ethBalance = await DIV.getBalanceInEth.call(accounts[0])
    let CoinEthBalance = await ethBalance.toNumber()
    assert.equal(CoinEthBalance, 2 * CoinBalance, 'Library function returned unexpeced function, linkage may be broken')
  })

  // TRANSERS
  // normal transfers without approvals
  it('transfers: ether transfer should be reversed.', async () => {
    const balanceBefore = await DIV.balanceOf.call(accounts[0])
    assert.strictEqual(balanceBefore.toNumber(), 10000)

    web3.eth.sendTransaction({ from: accounts[0], to: DIV.address, value: web3.toWei('10', 'Ether') }, async (err, res) => {
      expectThrow(new Promise((resolve, reject) => {
        if (err) reject(err)
        resolve(res)
      }))
      const balanceAfter = await DIV.balanceOf.call(accounts[0])
      assert.strictEqual(balanceAfter.toNumber(), 10000)
    })
  })

  it('transfers: should transfer 10000 to accounts[1] with accounts[0] having 10000', async () => {
    let whitePawl = await DIV.balanceOf.call(accounts[1])
    let puffYchest = await DIV.balanceOf.call(accounts[0])
    assert.strictEqual(whitePawl.toNumber(), 0)
    assert.strictEqual(puffYchest.toNumber(), 10000)
    await DIV.transfer(accounts[1], 500, { from: accounts[0] })
    let boop = await DIV.balanceOf.call(accounts[1])
    let boop2 = await DIV.balanceOf.call(accounts[0])
    assert.strictEqual(boop.toNumber(), 500)
  })

  it('transfers: should fail when trying to transfer 10001 to accounts[1] with accounts[0] having 10000', () => {
    return expectThrow(DIV.transfer.call(accounts[1], 10001, { from: accounts[0] }))
  })

  it('transfers: should handle zero-transfers normally', async () => {
    assert(await DIV.transfer.call(accounts[1], 0, { from: accounts[0] }), 'zero-transfer has failed')
  })

  it('should send coin correctly', async () => {
    //    Get initial balances of first and second account.
    let account_one = accounts[0]
    let account_two = accounts[1]
    const one = await DIV.balanceOf.call(account_one)
    const two = await DIV.balanceOf.call(account_two)
    const account_one_starting_balance = one.toNumber()
    const account_two_starting_balance = two.toNumber()
    const amount = 10

    await DIV.transfer(account_two, amount, { from: account_one })

    const oneEnd = await DIV.balanceOf.call(account_one)
    const twoEnd = await DIV.balanceOf.call(account_two)
    let account_one_ending_balance = oneEnd.toNumber()
    let account_two_ending_balance = twoEnd.toNumber()

    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender")
    assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver")
  })
})
