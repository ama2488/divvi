import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  ScrollView,
  Text,
  Modal,
  AsyncStorage,
} from 'react-native'
import { dispatch } from 'redux'
import { connect } from 'react-redux'
import Container from '../common/container.js'
import Label from '../common/label.js'
import Button from '../common/button.js'
import * as actions from '../../actions'
import SignUp from './signup'
import SignIn from './signin'

const { width, height } = Dimensions.get('window')

class Login extends Component {
  state = {
    signIn: false,
    signUp: true
  }

  onSignUp = () => {
    this.setState({ signUp: true})
    this.setState({signIn: false})
  };
  onSignIn = () => {
    this.setState({ signIn: true})
    this.setState({signUp: false})
  };
  onSubmit = (visible) => {
    this.props.getUser('0x6771442aec04ba1f4e825779b6fa225d4a9d89d8')
    this.setState({ signIn: visible, signUp: visible })
  }
  render () {
    return (
      <View>
        <Modal
          transparent={true}
          visible={this.state.signIn}>
          <SignIn onSubmit={()=>{this.onSubmit(false)}} onSignUp={()=>{this.onSignUp()}}/>
        </Modal>
        <Modal
          transparent={true}
          visible={this.state.signUp}>
        <SignUp onSubmit={()=>{this.onSubmit(false)}}
        onSignIn={()=>{this.onSignIn()}}/>
        </Modal>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, actions)(Login)
