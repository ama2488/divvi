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

const { width, height } = Dimensions.get('window')

class SignIn extends Component {
  state = {
    signIn: false,
    signUp: true
  }
  componentWillMount = () => {
    this.setState({ signIn: true })
}
  onSignUp = (isSignUp, isSignIn) => {
    this.setState({ signUp: isSignUp, signIn: isSignIn })
  };
  onSignIn = (isSignIn, isSignUp) => {
    this.setState({ signIn: isSignIn, signUp: isSignUp })
  };
  onSubmit = (visible) => {
    this.props.getUser('0xdb1248c95a6cef3eace6e44f56fd3c1ff7ccac73')
    this.setState({ signIn: visible, signUp: visible })
  }
  render () {
    return (
      <View>
        <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.signIn}
        >
          <ScrollView style={styles.scroll}>
            <Container>
              <Text style={styles.header}>
            D I V V I
              </Text>
            </Container>
            <Container>
              <Label text='Password'/>
              <TextInput secureTextEntry={true} style={styles.textInput}/>
            </Container>
            <Button label='Select account from keychain' styles={{
              button: styles.noBorder,
              label: styles.label
            }}/>
            <Container>
              <Button label='Submit' styles={{
                label: styles.buttonWhiteText
              }} onPress={() => {
                this.onSubmit(false)
              }}/>
            </Container>
            <Container>
              <Button label='Create Account' styles={{
                label: styles.buttonBlackText
              }} onPress={() => {
                this.onSignUp(true, false)
              }}/>
            </Container>
          </ScrollView>
        </Modal>
        <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.signUp}
        >
          <ScrollView style={styles.scroll}>
            <Container>
              <Text style={styles.header}>
            D I V V I
              </Text>
            </Container>
            <Container>
              <Label text='Password'/>
              <TextInput style={styles.textInput}/>
            </Container>
            <Container>
              <Label text='Repeat Password'/>
              <TextInput secureTextEntry={true} style={styles.textInput}/>
            </Container>
            <View>
              <Container>
                <Button label='Create Account' styles={{
                  label: styles.buttonWhiteText
                }} onPress={() => {
                  this.onSubmit(false)
                }}/>
              </Container>
              <Container>
                <Button label='Login' styles={{
                  label: styles.buttonBlackText
                }} onPress={() => {
                  this.onSignIn(true, false)
                }}/>
              </Container>
            </View>
          </ScrollView>
        </Modal>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, actions)(SignIn)

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#283940',
    padding: 30,
    flexDirection: 'column'
  },
  label: {
    color: '#84E1BF',
    fontSize: 13
  },
  alignRight: {
    alignSelf: 'flex-end'
  },
  textInput: {
    height: 50,
    fontSize: 30,
    borderBottomWidth: 2,
    borderColor: 'white'
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF'
  },
  buttonBlackText: {
    fontSize: 20,
    color: 'grey'
  },
  footer: {
    marginTop: 0
  },
  header: {
    fontSize: 40,
    color: '#84E1BF',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  noBorder: {
    borderWidth: 0
  }
})
