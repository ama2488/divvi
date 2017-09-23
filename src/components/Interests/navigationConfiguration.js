import { StackNavigator } from 'react-navigation'
import Interests from './views/interests'

const routeConfiguration = {
  Interests: { screen: Interests },
}
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Interests'
}
export const InterestsStack = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
