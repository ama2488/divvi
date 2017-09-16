import { AsyncStorage } from 'react-native'
import charities from '../data/charitylist.json'
import interests from '../data/interests.json'

export const data = () => {
  return { charities, interests }
}
