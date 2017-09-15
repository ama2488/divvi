import React, { Component } from 'react'
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Text
} from 'react-native'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import RNSecureKeyStore from 'react-native-secure-key-store'

let web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://5516f622.ngrok.io'))

// Import our contract artifacts and turn them into usable abstractions.
import divvicoinArtifacts from '../build/contracts/DivviCoin.json'
import Button from '../components/common/button.js'
import Header from '../components/common/header.js'

const { width, height } = Dimensions.get('window')
const DivviCoin = contract(divvicoinArtifacts)
DivviCoin.setProvider(web3.currentProvider)

export default class Account extends Component {
  constructor () {
    super()
    this.state = {
      accounts: null,
      account: null,
      owner: null,
      balance: null,
      donations: null
    }
  };

componentWillMount = () => {
  let self = this
  web3.eth.getAccounts((err, accs) => {
    if (err != null) {
      alert('There was an error fetching your accounts.')
      return
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
      return
    }
    self.setState({
      owner: accs[0],
      account: accs[0]
    })

    this.refreshBalance()
  })
}
  refreshBalance = () => {
    let self = this
    let div
    DivviCoin.deployed().then(function (instance) {
      div = instance
      return div.balanceOf.call(self.state.account, { from: self.state.account })
    }).then(function (value) {
      self.setState({ balance: value.valueOf() })
      return div.balanceOfDonations.call(self.state.account)
    })
      .then((bal) => {
        self.setState({ donations: bal.valueOf() })
        console.log(self.state)
      })
      .catch(function (e) {
        console.log(e)
      })
  }

  onPurchase = () => {
    this.props.navigation.navigate('Purchase')
  };
  render () {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#84E1BF',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Header text={'Account'}></Header>
        <Text style={{ fontSize: 30, color: 'grey', margin: 15 }}> Balance: {this.state.balance} DIV</Text>
        <Text style={{ fontSize: 30, color: 'grey', margin: 15 }}> Donations: {this.state.donations} DIV</Text>
        <Button label='Purchase' styles={{
          label: styles.buttonWhiteText
        }} onPress={() => {
          this.onPurchase()
        }}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF'
  }
})
