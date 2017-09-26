import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { AccountStack } from '../navigationConfiguration'
import { Icon, View } from 'react-native-elements'
import { connect } from 'react-redux'


class AccountNavigation extends React.Component {
  static navigationOptions = {
    title: 'Account',
    tabBarLabel: 'Account',
    transitionConfig: () => ({ screenInterpolator: () => null }),
    tabBarIcon: ({ tintColor }) => <Icon name='connectdevelop' type='font-awesome' size={25} color={tintColor}/>
  }
  render () {
    const { navigationState, dispatch } = this.props
    return (
      <AccountStack
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    navigationState: state.account
  }
}

export default connect(mapStateToProps)(AccountNavigation)
