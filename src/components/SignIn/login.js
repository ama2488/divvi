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
  componentWillMount = () => {
    this.setState({ signUp: true })
}
  onSignUp = (isSignUp, isSignIn) => {
    this.setState({ signUp: isSignUp, signIn: isSignIn })
  };
  onSignIn = (isSignIn, isSignUp) => {
    this.setState({ signIn: isSignIn, signUp: isSignUp })
  };
  onSubmit = (visible) => {
    this.props.getUser('0x6771442aec04ba1f4e825779b6fa225d4a9d89d8')
    this.setState({ signIn: visible, signUp: visible })
  }
  render () {
    return (
      <View>
        <Modal
          animationType='none'
          transparent={true}
          visible={this.state.signIn}>
          <SignIn onSubmit={()=>{this.onSubmit(false)}} onSignUp={()=>{this.onSignUp(true, false)}}/>
        </Modal>
        <Modal
          animationType='none'
          transparent={true}
          visible={this.state.signUp}>
        <SignUp onSubmit={()=>{this.onSubmit(false)}}
        onSignIn={()=>{this.onSignIn(true, false)}}/>
        </Modal>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, actions)(Login)

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#283940',
    padding: 30,
    flexDirection: 'column'
  },
  label: {
    color: '#E6EFC2',
    fontSize: 13
  },
  alignRight: {
    alignSelf: 'flex-end'
  },
  textInput: {
    height: 50,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: 'white',
    color:'white'
  },
  textInput2: {
    height: 50,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: 'white',
    color:'white',
    marginBottom: 50
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF'
  },
  buttonBlackText: {
    fontSize: 20,
    color: '#283940'
  },
  footer: {
    marginTop: 0
  },
  header: {
    fontSize: 40,
    color: '#E6EFC2',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 40
  },
  header2: {
    fontSize: 40,
    color: '#E6EFC2',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 70
  },
  noBorder: {
    backgroundColor: 'transparent',
    marginTop: 40
  }
})
