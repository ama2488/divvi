import React, { Component } from 'react'
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  TextInput,
  Text,
  ScrollView
} from 'react-native'

import FormContainer from '../components/common/formcontainer.js'
import Label from '../components/common/label.js'
import Button from '../components/common/button.js'

const { width, height } = Dimensions.get('window')

export default class SignUp extends Component {
  onSignIn = () => {
    this.props.navigation.navigate('Login')
  };
  onSubmit = () => {
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
          <TextInput style={styles.textInput}/>
        </FormContainer>
        <FormContainer>
          <Label text='Repeat Password'/>
          <TextInput secureTextEntry={true} style={styles.textInput}/>
        </FormContainer>
        <View>
          <FormContainer>
            <Button label='Create Account' styles={{
              label: styles.buttonWhiteText
            }} onPress={() => {
              this.onSubmit()
            }}/>
          </FormContainer>
          <FormContainer>
            <Button label='Login' styles={{
              label: styles.buttonBlackText
            }} onPress={() => {
              this.onSignIn()
            }}/>
          </FormContainer>
        </View>
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
    color: '#0d8898',
    fontSize: 20
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
    marginTop: 5
  },
  header: {
    fontSize: 40,
    color: '#84E1BF',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30
  }
})
