import { Tabs } from '../components/Navigation/navigationConfiguration'

export const tabBarReducer = (state, action) => {
  if (action.type === 'JUMP_TO_TAB') {
    return { ...state, ...action.payload }
  } else {
    return Tabs.router.getStateForAction(action, state)
  }
}
