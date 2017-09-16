import { StackNavigator } from 'react-navigation'
// Screens
import Account from './views/account'
import Purchase from './views/purchase'
const routeConfiguration = {
  Account: { screen: Account },
  Purchase: { screen: Purchase }
}
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Account'
}
export const AccountStack = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
