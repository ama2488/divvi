export const cardReducer = (state, action) => {
  if (state === undefined) {
    return { ads: [], charities: [] }
  }
  if (action.type === 'UPDATE_AD') {
    state.ads.push(action.payload)
  }
  if (action.type === 'UPDATE_CHAR') {
    state.charities.push(action.payload)
  }
  if (action.type === 'GET_CHARITIES') {
    state.charities = action.payload.chars.filter((char) => {
      let interests = action.payload.interests
      if (interests.indexOf(char.tag) > 0) {
        return char
      }
    })
  }
  if (action.type === 'GET_ADS') {
    state.ads = action.payload.ads.filter((ad) => {
      let interests = action.payload.interests
      if (interests.indexOf(ad.tag) > 0) {
        return ad
      }
    })
  }
  if (action.type === 'UPDATE_INDEX') {
    state.index = action.payload.ads
  }

  // combine ads and charities into cards property -- state.cards = combination

  return state
}
