import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { CharityStack } from '../navigationConfiguration'
import { Icon } from 'react-native-elements'
import {View} from 'react-native'
import { connect } from 'react-redux'

class CardNavigation extends React.Component {
  static navigationOptions = {
    title: 'Browse',
    tabBarLabel: 'Browse',
    animationEnabled: true,
    animationType: 'fade',
    tabBarIcon: ({ tintColor }) => <View style={{
          height: 80,
          width: 80,
          borderRadius: 100,
          backgroundColor: '#FE6D64',
          paddingTop: 15}}><Icon name= {'ios-heart-outline'} type={'ionicon'} size={45} color={tintColor}/></View>
  }
  render () {
    const { navigationState, dispatch } = this.props
    return (
      <CharityStack
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
    navigationState: state.cards
  }
}

export default connect(mapStateToProps)(CardNavigation)
