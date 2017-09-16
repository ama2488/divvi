import { StackNavigator } from 'react-navigation'
// Screens
import Charities from './views/charities'
import charityProfile from './views/charityProfile'
const routeConfiguration = {
  Charities: { screen: Charities },
  CharityProfile: { screen: charityProfile }
}
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Charities'
}
export const CharityStack = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
