import React, { Component } from 'react'
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  TextInput,
  ScrollView,
  Text
} from 'react-native'
import FormContainer from '../components/common/formcontainer.js'
import Label from '../components/common/label.js'
import Button from '../components/common/button.js'

const { width, height } = Dimensions.get('window')

export default class SignIn extends Component {
  onSignUp = () => {
    this.props.navigation.navigate('Register')
  };
  onSignIn = () => {
    this.props.navigation.navigate('Tabs')
  };
  render () {
    return (
      <ScrollView style={styles.scroll}>
        <FormContainer>
          <Text style={styles.header}>
            D I V V I
          </Text>
        </FormContainer>
        <FormContainer>
          <Label text='Password'/>
          <TextInput secureTextEntry={true} style={styles.textInput}/>
        </FormContainer>
        <Button label='Select account from keychain' styles={{
          button: styles.noBorder,
          label: styles.label
        }}/>
        <FormContainer>
          <Button label='Submit' styles={{
            label: styles.buttonWhiteText
          }} onPress={() => {
            this.onSignIn()
          }}/>
        </FormContainer>
        <FormContainer>
          <Button label='Create Account' styles={{
            label: styles.buttonBlackText
          }} onPress={() => {
            this.onSignUp()
          }}/>
        </FormContainer>
      </ScrollView>
    )
  }
}

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
