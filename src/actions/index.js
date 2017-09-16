export const getUser = (userId) => {
  return { type:'SIGNIN', payload: userId }
}

export const createUser = (userObj) => {
  return { type: 'SIGNUP', payload: userObj }
}

export const updateAd = (adId) => {
  return { type: 'UPDATE_AD', payload: adId }
}

export const updateCharity = (charId) => {
  return { type: 'UPDATE_CHAR', payload: charId }
}

export const getChars = (chars, interests) => {
  return { type: 'GET_CHARITIES', payload: { chars, interests } }
}

export const getAds = (ads, interests) => {
  return { type: 'GET_ADS', payload: { ads, interests } }
}

export const updateIndex = (index) => {
  return { type: 'UPDATE_INDEX', payload: index }
}
