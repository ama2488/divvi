import { StackNavigator } from 'react-navigation'
import Account from './views/account'

const routeConfiguration = {
  Account: { screen: Account }
}
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Account',
  transitionConfig: () => ({ screenInterpolator: () => null })
}
export const AccountStack = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
