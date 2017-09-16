import './shim.js'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import TabBarNavigation from './src/components/Navigation/TabsNavigation'
import { Provider } from 'react-redux'
import store from './store.js'

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <TabBarNavigation />
      </Provider>
    )
  }
}
