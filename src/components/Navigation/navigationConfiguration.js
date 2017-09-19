import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import Interests from '../Interests/views/interests.js'
import AccountStack from '../Account/views/AccountNavigation'
import CharityStack from '../Cards/views/CardNavigation'

export const Tabs = TabNavigator({
  Profile: {
    screen: Interests,
    navigationOptions: {
      title: 'Interests',
      tabBarLabel: 'Interests',
      tabBarIcon: ({ tintColor }) => <Icon name={ 'star' } type={'evilicon'} size={40} color={tintColor}/>
    }
  },
  Charities: {
    screen: CharityStack,
    portraitOnlyMode: true,
    animationType:'none'
  },
  Account: {
    screen: AccountStack
  }
}, {
  initialRouteName: 'Charities',
  animationEnabled: false,
  portraitOnlyMode: true,
  tabBarOptions: {
    activeTintColor: '#E6EFC2',
    inactiveTintColor: 'white',
    labelStyle: {
      fontSize: 12
    },
    style: {
      backgroundColor: '#283940',
      height:50
    },
    showLabel: false
  }
})
