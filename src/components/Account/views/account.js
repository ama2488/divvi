import React, { Component } from 'react'
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Image,
  Slider
} from 'react-native'
import { Container, Content, Card, CardItem, Text, Icon, Right, Thumbnail, Left, Body, Tab, Tabs, TabHeading, StyleProvider } from 'native-base'
import { connect } from 'react-redux'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import RNSecureKeyStore from 'react-native-secure-key-store'
import divvicoinArtifacts from '../../../../build/contracts/DivviCoin.json'
import Button from '../../common/button'
import Header from '../../common/header'
import getTheme from '../../../native-base-theme/components'
import material from '../../../native-base-theme/variables/material'
import Expo, {Font} from 'expo'
import * as actions from '../../../actions'
import History from './history'


let web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://c0a30578.ngrok.io'))
const { width, height } = Dimensions.get('window')
const DivviCoin = contract(divvicoinArtifacts)
DivviCoin.setProvider(web3.currentProvider)

class Account extends Component {
  constructor () {
    super()
    this.state = {
      owner: null,
      balance: 0,
      donations: 0,
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
      account: this.props.user,
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

  render () {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <Header title={'Account'}/>
        <StyleProvider style={getTheme(material)}>
      <Tabs>
          <Tab  heading={ <TabHeading activeTextStyle={{color: '#99e6e6'}}><Icon name="ios-analytics-outline" /><Text>Overview</Text></TabHeading>}>
          <Text style={{ fontSize: 30, color: 'grey', margin: 15 }}> Balance: {this.state.balance} DIV</Text>
          <Text style={{ fontSize: 30, color: 'grey', margin: 15 }}> Donations: {this.state.donations} DIV</Text>
          </Tab>
          <Tab activeTextStyle={{color: '#99e6e6'}} heading={ <TabHeading><Icon name="ios-time-outline" /><Text>History</Text></TabHeading>}>
          <Container>
          <Content>
          <History/>
     </Content>
        </Container>
          </Tab>
        </Tabs>
          </StyleProvider>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, history: state.data.history}
}

export default connect(mapStateToProps, actions)(Account)

const styles = StyleSheet.create({
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF'
  }
})
