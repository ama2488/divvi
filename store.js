import { createStore, applyMiddleware, combineReducers } from 'redux'
import { tabBarReducer } from './src/components/Navigation/navigationConfiguration'
import { CharityStack } from './src/components/Cards/navigationConfiguration'
import { AccountStack } from './src/components/Account/navigationConfiguration'
import Data from './src/data/charitylist.json'

import { createLogger } from 'redux-logger'

const middleWare = () => {
  return applyMiddleware(createLogger())
}

export default createStore(
  combineReducers({
    tabBar: tabBarReducer,
    cards: (state, action) =>
      CharityStack.router.getStateForAction(action, state),
    account: (state, action) =>
      AccountStack.router.getStateForAction(action, state),
    data: () =>
      Data
  }),
  middleWare()
)
