import { combineReducers } from 'redux'
import { loginReducer } from './loginReducer'
import { tabBarReducer } from './tabBarReducer'
import { balanceReducer } from './balanceReducer'
import { data } from './dataReducer'
import { CharityStack } from '../components/Cards/navigationConfiguration'
import { AccountStack } from '../components/Account/navigationConfiguration'

export default combineReducers({
  tabBar: tabBarReducer,
  user: loginReducer,
  balances: balanceReducer,
  cards: (state, action) =>
    CharityStack.router.getStateForAction(action, state),
  account: (state, action) =>
    AccountStack.router.getStateForAction(action, state),
  data: data
})
