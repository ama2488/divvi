import '../stylesheets/app.css'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

let web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://c0a30578.ngrok.io'))
import divvicoin_artifacts from '../../build/contracts/DivviCoin.json'

var DivviCoin = contract(divvicoin_artifacts)

var accounts
var account
let owner

window.App = {
  start: function () {
    $('.modal').modal()
    var self = this
    DivviCoin.setProvider(web3.currentProvider)
    web3.eth.getAccounts(async(err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }
      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }
      accounts = accs
      owner = accounts[0]
      $.post('/users/login', (data) => {
        if (data) {
          console.log(data, 'DATA')
          account = data
          $('#charityForm').toggle()
          $('.signin').toggle()
        } else {
          account = owner
        }
      })
      $.post('/charities/all', (data) => {
        $('.allDaCharities').html(data)
      })
      self.refreshBalance()
    })
  },

  setStatus: function (message) {
    // var status = document.getElementById('status')
    // status.innerHTML = message
  },

  refreshBalance: function () {
    console.log(owner)
    var self = this
    var div
    DivviCoin.deployed().then(function (instance) {
      div = instance
      return div.balanceOf.call(account, { from: account })
    }).then(function (value) {
      var balance_element = document.getElementById('balance')
      console.log(value.valueOf(), 'coin balance')
      balance_element.innerHTML = `${value.valueOf()} DIV`
      return div.balanceOfDonations.call(account)
    })
    .then((bal) => {
      // let donationsElement = document.getElementById('donations')
      // donationsElement.innerHTML = bal.valueOf()
      console.log(bal.valueOf(), 'donations balance')
    })
    .catch(function (e) {
      console.log(e)
      self.setStatus('Error getting balance.')
    })
  },

  createAccount: function (isCharity) {
    let div
    let address
    DivviCoin.deployed().then((instance) => {
      div = instance
      address = web3.personal.newAccount($('#password').val())
      console.log(address, 'new account res')
      if (isCharity) {
        return div.addCharity(address, { from: '0xaed42366717d8e6a209a38cddca1a1afe7584491' })
      } else {
        return div.addAccount(address, { from: '0xaed42366717d8e6a209a38cddca1a1afe7584491' })
      }
    })
    .then((result) => {
      console.log(result, 'add account result')
      web3.personal.unlockAccount(address, $('#password').val(), 1000000)
      account = address
      $.post('/users/', { user: address }, (data) => {
        console.log(data)
      })
      this.refreshBalance()
      if (isCharity) {
        $('#charityForm').toggle()
      } else {
        $('#adForm').toggle()
      }
      $('.signin').toggle()
    })
  },

  sendCoin: function () {
    var self = this
    var amount = parseInt(document.getElementById('amount').value)
    var receiver = document.getElementById('receiver').value

    this.setStatus('Initiating transaction... (please wait)')

    var div
    DivviCoin.deployed().then(function (instance) {
      div = instance
      return div.transfer(receiver, amount, { from: account })
    }).then(function () {
      self.setStatus('Transaction complete!')
      self.refreshBalance()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error sending coin; see log.')
    })
  },

  signInOwner: function () {
    let self = this
    account = owner
    self.refreshBalance()
  }

}

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 DivviCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }

  App.start()

  // $('#charityProfile').submit((event) => {
  //   event.preventDefault()
  //   console.log(event.target)
  // })
})
