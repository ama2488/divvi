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
import Container from '../components/common/container.js'
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
            this.onSignIn()
          }}/>
        </Container>
        <Container>
          <Button label='Create Account' styles={{
            label: styles.buttonBlackText
          }} onPress={() => {
            this.onSignUp()
          }}/>
        </Container>
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
