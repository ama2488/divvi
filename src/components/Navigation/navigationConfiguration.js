import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import InterestNavigation from '../Interests/views/InterestNavigation'
import AccountStack from '../Account/views/AccountNavigation'
import CharityStack from '../Cards/views/CardNavigation'

export const Tabs = TabNavigator({
  Profile: {
    screen: InterestNavigation
  },
  Charities: {
    screen: CharityStack
  },
  Account: {
    screen: AccountStack
  }
}, {
  initialRouteName: 'Charities',
  transitionConfig: () => ({ screenInterpolator: () => null }),
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
