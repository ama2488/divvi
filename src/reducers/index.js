import { combineReducers } from 'redux'
import { loginReducer } from './loginReducer'
import { tabBarReducer } from './tabBarReducer'
import { data } from './dataReducer'
import { balanceReducer } from './balanceReducer'
import { CharityStack } from '../components/Cards/navigationConfiguration'
import { AccountStack } from '../components/Account/navigationConfiguration'
import {InterestsStack} from '../components/Interests/navigationConfiguration'

export default combineReducers({
  tabBar: tabBarReducer,
  user: loginReducer,
  interests: (state, action) =>
    InterestsStack.router.getStateForAction(action, state),
  cards: (state, action) =>
    CharityStack.router.getStateForAction(action, state),
  account: (state, action) =>
    AccountStack.router.getStateForAction(action, state),
  data: data,
  balance: balanceReducer
})
