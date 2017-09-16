import React, { Component } from 'react'
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native'

import Button from '../../common/button'
import Header from '../../common/header'

const { width, height } = Dimensions.get('window')

export default class CharityProfile extends Component {
  onBack = () => {
    console.log()
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
        <ScrollView>
          <Header text={this.props.navigation.state.params.title}></Header>
          <Text style={styles.label}>
            {this.props.navigation.state.params.subTitle}
          </Text>
          <Image style={styles.image} source={{
            uri: this.props.navigation.state.params.image
          }}/>
          <Button label='Back' styles={{
            label: styles.buttonWhiteText
          }} onPress={() => {
            this.onBack()
          }}/>
        </ScrollView>
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
    color: 'white',
    fontSize: 20,
    margin: 10,
    alignSelf: 'center'
  },
  alignRight: {
    alignSelf: 'flex-end'
  },
  textInput: {
    height: 50,
    fontSize: 30
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
  },
  header: {
    fontSize: 40,
    color: '#283940',
    alignSelf: 'center',
    marginTop: 30
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'white'
  }
})
