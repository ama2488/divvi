import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { Tabs } from './navigationConfiguration.js'
import { connect } from 'react-redux'
const mapStateToProps = (state) => {
  return {
    navigationState: state.tabBar
  }
}
class TabBarNavigation extends React.Component {
  render () {
    const { dispatch, navigationState } = this.props
    return (
      <Tabs
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
export default connect(mapStateToProps)(TabBarNavigation)
