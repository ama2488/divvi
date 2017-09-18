import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { CharityStack } from '../navigationConfiguration'
import { Icon } from 'react-native-elements'
import {View} from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    navigationState: state.cards
  }
}
class CardNavigation extends React.Component {
  static navigationOptions = {
    title: 'Browse',
    tabBarLabel: 'Browse',
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
export default connect(mapStateToProps)(CardNavigation)
