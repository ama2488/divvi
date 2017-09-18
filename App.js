import './shim.js'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import TabBarNavigation from './src/components/Navigation/TabsNavigation'
import { Provider } from 'react-redux'
import store from './store.js'

export default class App extends React.Component {
  state={
    fontLoaded:false
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({fontLoaded:true})
  }

  render () {
    return (
      this.state.fontLoaded ? (
      <Provider store={store}>
        <TabBarNavigation />
      </Provider>
      ): null
    )}
}
