import React, { Component } from 'react'
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import RNSecureKeyStore from 'react-native-secure-key-store'
// Import our contract artifacts and turn them into usable abstractions.
import divvicoinArtifacts from '../../../../build/contracts/DivviCoin.json'
import Button from '../../common/button'
import Header from '../../common/header'

let web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://5516f622.ngrok.io'))

const { width, height } = Dimensions.get('window')
const DivviCoin = contract(divvicoinArtifacts)
DivviCoin.setProvider(web3.currentProvider)

class Account extends Component {
  constructor () {
    super()
    this.state = {
      owner: null,
      balance: 0,
      donations: 0
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
      account: this.props.user
    })

    this.refreshBalance()
  })
}
  refreshBalance = () => {
    let self = this
    let div
    DivviCoin.deployed().then(function (instance) {
      div = instance
      return div.balanceOf.call(self.props.user)
    }).then(function (value) {
      self.setState({ balance: value.valueOf() })
      return div.balanceOfDonations.call(self.props.user)
    })
      .then((bal) => {
        console.log(bal, 'DONA BAL')
        self.setState({ donations: bal.valueOf() })
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

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Account)

const styles = StyleSheet.create({
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF'
  }
})
