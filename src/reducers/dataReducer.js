import { AsyncStorage } from 'react-native'
import charities from '../data/charitylist.json'
import interests from '../data/interests.json'

export const data = (state, action) => {
  if (state === undefined){
    return { charities, interests}
  }
  if (state.history === undefined){
    state.history = []
  }
  if (action.type === 'REMOVE_CARD'){
    let charities = [...state.charities]
    let hist = charities.shift()
    hist.amount = action.payload.amount
    hist.date = new Date()
    state.history.push(hist)
    state.charities = charities
    return state
  }
  if (action.type === 'PASS_CARD'){
    let charities = [...state.charities]
    charities.push(charities.shift())
    state.charities = charities
    return state
  }
  if (action.type === 'GET_CHARITIES') {
    newState.cardStatus.charities = action.payload.chars.filter((char) => {
      let interests = action.payload.interests
      if (interests.indexOf(char.tag) > 0) {
        return char
      }
    })
  }
  if (action.type === 'GET_ADS') {
    newState.cardStatus.ads = action.payload.ads.filter((ad) => {
      let interests = action.payload.interests
      if (interests.indexOf(ad.tag) > 0) {
        return ad
      }
    })
  }
  if (action.type === 'LOAD_HISTORY') {
    state.history = action.payload
  }

  return state
}
