const Web3 = require('web3')
const contract = require('truffle-contract')
const web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://c0a30578.ngrok.io'))
const divviArtifacts = require('../build/contracts/DivviCoin.json')
const DivviCoin = contract(divviArtifacts)
let account
const express = require('express')
const cors = require('cors')
const router = express.Router()

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

router.post('/login', cors(corsOptions), (req, res, next) => {
  if (!req.session.user) {
    res.send('not logged in')
  } else {
    res.send(req.session.user)
  }
})

router.post('/', cors(corsOptions), (req, res, next) => {
  req.session.user = req.body.user
  res.send(req.session.user)
})

router.post('/account', cors(corsOptions), (req, res, next) => {
  let div
  let address
  DivviCoin.deployed().then((instance) => {
    div = instance
    address = web3.personal.newAccount(req.body.password)
    if (req.body.isCharity) {
      return div.addCharity(address, { from: '0xaed42366717d8e6a209a38cddca1a1afe7584491' })
    } else {
      return div.addAccount(address, { from: '0xaed42366717d8e6a209a38cddca1a1afe7584491' })
    }
  })
.then((result) => {
  web3.personal.unlockAccount(result, req.body.password, 1000000)
  return div.balanceOf.call(result, { from: account })
})
.then((bal) => {
  let value = bal.valueOf()
  localStorage.setItem('address', address)
  localStorage.setItem('balance', value)
  res.json({ value, address })
})
})

module.exports = router
