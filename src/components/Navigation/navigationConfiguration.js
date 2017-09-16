import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation'
import { Icon, View } from 'react-native-elements'
import SignIn from '../../screens/signin'
import SignUp from '../../screens/signup'
import Interests from '../Interests/views/interests.js'
import AccountStack from '../Account/views/AccountNavigation'
import CharityStack from '../Cards/views/CardNavigation'

export const Tabs = TabNavigator({
  Profile: {
    screen: Interests,
    navigationOptions: {
      title: 'Interests',
      tabBarLabel: 'Interests',
      tabBarIcon: ({ tintColor }) => <Icon name={ 'superpowers' } type={'font-awesome'} size={25} color={tintColor}/>
    }
  },
  Charities: {
    screen: CharityStack
  },
  Account: {
    screen: AccountStack
  }
}, {
  tabBarOptions: {
    activeTintColor: '#84E1BF',
    inactiveTintColor: 'white',
    labelStyle: {
      fontSize: 12
    },
    style: {
      backgroundColor: '#283940'
    },
    showLabel: false
  }
})

export const tabBarReducer = (state, action) => {
  if (action.type === 'JUMP_TO_TAB') {
    return { ...state, ...action.payload }
  } else {
    return Tabs.router.getStateForAction(action, state)
  }
}
