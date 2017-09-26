import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { InterestsStack } from '../navigationConfiguration'
import { Icon, View } from 'react-native-elements'
import { connect } from 'react-redux'


class InterestNavigation extends React.Component {
  static navigationOptions = {
    title: 'Interests',
    tabBarLabel: 'Interests',
    tabBarIcon: ({ tintColor }) => <Icon name={ 'star' } type={'evilicon'} size={40} color={tintColor}/>
  }
  render () {
    const { navigationState, dispatch } = this.props
    return (
      <InterestsStack
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
    navigationState: state.interests
  }
}

export default connect(mapStateToProps)(InterestNavigation)
