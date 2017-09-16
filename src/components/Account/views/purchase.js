import React, { Component } from 'react'
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Text
} from 'react-native'

import Button from '../../common/button'
import Header from '../../common/header'

const { width, height } = Dimensions.get('window')

export default class Purchase extends Component {
  onSave = () => {
    this.props.navigation.goBack()
  };
  render () {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#84E1BF',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Header text={'Purchase'}></Header>
        <Button label='Save' styles={{
          label: styles.buttonWhiteText
        }} onPress={() => {
          this.onSave()
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
