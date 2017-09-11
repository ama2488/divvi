import React, {Component} from 'react';
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Text
} from 'react-native';

import Button from '../components/button.js';
import Header from '../components/header.js';

const {width, height} = Dimensions.get('window');

export default class Account extends Component {
  onPurchase = () => {
    this.props.navigation.navigate('Purchase');
  };
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#84E1BF',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Header text={'Account'}></Header>
        <Button label="Purchase" styles={{
          label: styles.buttonWhiteText
        }} onPress={() => {
          this.onPurchase()
        }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF'
  }
})
