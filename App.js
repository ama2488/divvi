import './shim.js'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { Tabs, NavStack, Root } from './components/navigation.js'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

export default class App extends React.Component {
  render () {
    return (
      // <Provider store={createStore(() => [])}>
    // <View>
      <Root/>
    // </View>
      // </Provider>
    )
  }
}
