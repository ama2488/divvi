import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { AccountStack } from '../navigationConfiguration'
import { Icon, View } from 'react-native-elements'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    navigationState: state.account
  }
}
class AccountNavigation extends React.Component {
  static navigationOptions = {
    title: 'Account',
    tabBarLabel: 'Account',
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
export default connect(mapStateToProps)(AccountNavigation)
