import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import Profile from '../screens/profile.js';
import Charities from '../screens/charities.js';
import Account from '../screens/account.js';
import SignIn from '../screens/signin.js';
import SignUp from '../screens/signup.js';
import Interests from '../screens/interests.js';
import EditProfile from '../screens/editProfile.js';
import Purchase from '../screens/purchase.js';
import CharityProfile from '../screens/charityProfile.js'

export const ProfileStack = StackNavigator({
  Profile: {
    screen: Profile
  },
  EditProfile: {
    screen: EditProfile
  },
  Interests: {
    screen: Interests
  }
}, {headerMode: 'none'});

export const AccountStack = StackNavigator({
  Account: {
    screen: Account,
    navigationOptions: {
      title: 'Account'
    }
  },
  Purchase: {
    screen: Purchase,
    navigationOptions: {
      title: 'Purchase'
    }
  }
}, {headerMode: 'none'});

export const CharityStack = StackNavigator({
  Charities: {
    screen: Charities,
    navigationOptions: {
      title: 'Account'
    }
  },
  CharityProfile: {
    screen: CharityProfile,
    navigationOptions: {
      title: 'Purchase'
    }
  }
}, {headerMode: 'none'});

export const Tabs = TabNavigator({
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      title: 'Profile',
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => <Icon name="ios-settings-outline" type="ionicon" size={33} color={tintColor}/>
    }
  },
  Charities: {
    screen: CharityStack,
    navigationOptions: {
      title: 'Browse',
      tabBarLabel: 'Browse',
      tabBarIcon: ({tintColor}) => <View style={{
          height: 80,
          width: 80,
          borderRadius: 100,
          backgroundColor: '#FE6D64',
          paddingTop: 15
        }}>
          <Icon name="ios-heart-outline" type="ionicon" size={45} color={tintColor}/>
        </View>
    }
  },
  Account: {
    screen: AccountStack,
    navigationOptions: {
      title: 'Account',
      tabBarLabel: 'Account',
      tabBarIcon: ({tintColor}) => <Icon name="connectdevelop" type="font-awesome" size={25} color={tintColor}/>
    }
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
});

export const Root = StackNavigator({
  Register: {
    screen: SignUp
  },
  Login: {
    screen: SignIn
  },
  Tabs: {
    screen: Tabs
  }
}, {headerMode: 'none'});
