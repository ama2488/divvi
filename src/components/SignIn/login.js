import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  ScrollView,
  Text,
  Modal,
  AsyncStorage
} from 'react-native'
import { dispatch } from 'redux'
import { connect } from 'react-redux'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import Container from '../common/container.js'
import Label from '../common/label.js'
import Button from '../common/button.js'
import * as actions from '../../actions'
import SignUp from './signup'
import SignIn from './signin'
import divvicoinArtifacts from '../../../build/contracts/DivviCoin.json'

let web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://c0a30578.ngrok.io'))
const divviContract = web3.eth.contract(divvicoinArtifacts.abi)
const contractInstance = divviContract.at('0xf8b22d267add336017f7a9c61a8cab4579220188')

const DivviCoin = contract(divvicoinArtifacts)
DivviCoin.setProvider(web3.currentProvider)
const DC = DivviCoin.deployed()

const { width, height } = Dimensions.get('window')

class Login extends Component {
  state = {
    signIn: false,
    signUp: false
  }

  componentWillMount = () =>{
    if (this.props.user !== null && !this.props.isLogout ){
      this.setState({signIn: false, signUp: false})
    } else {
      this.setState({signUp:true})
      this.props.getUser(null)
    }
  }

  toggle = (signUp, signIn) => {
    this.setState({ signUp, signIn})
  };

  onSubmit = (visible) => {
    this.props.getUser('0x6771442aec04ba1f4e825779b6fa225d4a9d89d8')
    this.setState({ signIn: visible, signUp: visible })
    this.props.refreshBalance()
  }

  render () {
    return (
      <View>
        <Modal
          transparent={true}
          visible={this.state.signIn}>
          <SignIn onSubmit={()=>{this.onSubmit(false)}} toggle={()=>{this.toggle(true, false)}}/>
        </Modal>
        <Modal
          transparent={true}
          visible={this.state.signUp}>
        <SignUp onSubmit={()=>{this.onSubmit(false)}}
        toggle={()=>{this.toggle(false, true)}}/>
        </Modal>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, actions)(Login)
