import React, { Component } from 'react'
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Text,
  Image
} from 'react-native'

import FormContainer from '../components/common/formcontainer.js'
import Label from '../components/common/label.js'
import Button from '../components/common/button.js'
import Header from '../components/common/header.js'

const { width, height } = Dimensions.get('window')

export default class Profile extends Component {
  updateInterests = () => {
    this.props.navigation.navigate('Interests')
  };
  editProfile = () => {
    this.props.navigation.navigate('EditProfile')
  };
  render () {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#84E1BF',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Header text='Profile'></Header>
        <Image style={{
          height: 200,
          width: 200,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: 'white'
        }} source={require('../images/animals.jpg')}/>
        <Button label='Update Interests' styles={{
          label: styles.buttonWhiteText
        }} onPress={() => {
          this.updateInterests()
        }}/>
        <Button label='Edit Profile' styles={{
          label: styles.buttonWhiteText
        }} onPress={() => {
          this.editProfile()
        }}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#E1D7D8',
    padding: 30,
    flexDirection: 'column'
  },
  label: {
    color: '#0d8898',
    fontSize: 13
  },
  alignRight: {
    alignSelf: 'flex-end'
  },
  textInput: {
    height: 50,
    fontSize: 30
    // backgroundColor: '#FFF'
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF'
  },
  buttonBlackText: {
    fontSize: 20,
    color: '#595856'
  },
  footer: {
    marginTop: 5
  }
})
