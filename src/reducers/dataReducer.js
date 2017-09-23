import { AsyncStorage } from 'react-native'
import charities from '../data/charitylist.json'
import interests from '../data/interests.json'

export const data = (state, action) => {
  if (state === undefined){
    return {charities, interests, donation: 1}
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
    state.charities = action.payload.chars
    let interests = action.payload.interests
    let newChars = action.payload.chars.filter((char) => {
      let match = false;
      char.tags.forEach((t)=>{
          if (interests.indexOf(t) > 0) {
            match = true;
          }
      })
      if (match){
        return char
      }
    })
    state.charities = newChars
  }

  if (action.type === 'GET_ADS') {
    state.ads = action.payload.ads
    let interests = action.payload.interests
    let newAds = action.payload.chars.filter((ad) => {
      let match = false;
      ad.tags.forEach((t)=>{
          if (interests.indexOf(t) > 0) {
            match = true;
          }
      })
      if (match){
        return ad
      }
  })
  state.ads = newAds
}

if (action.type === 'LOAD_HISTORY') {
    state.history = action.payload
}

if(action.type === 'UPDATE_DONATION') {
    state.donation = action.payload
}

if (action.type === 'REFRESH_CHARITIES') {
  state.charities = charities
}

  return state
}
