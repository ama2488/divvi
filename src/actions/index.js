export const getUser = (userId) => {
  return { type:'SIGNIN', payload: userId }
}

export const toTab = (state) => {
  return { type: 'JUMP_TO_TAB', payload: state}
}

export const createUser = (userObj) => {
  return { type: 'SIGNUP', payload: userObj }
}

export const updateAd = (adId) => {
  return { type: 'UPDATE_AD', payload: adId }
}

export const getBalances = (balance, donations) => {
  return {type: 'GET_BALANCE', payload: {balance, donations}}
}

export const updateCharity = (charId) => {
  return { type: 'UPDATE_CHAR', payload: charId }
}

export const getChars = (chars, interests) => {
  return { type: 'GET_CHARITIES', payload: { chars, interests } }
}

export const refreshCharities = () => {
  return { type: 'REFRESH_CHARITIES'}
}

export const getAds = (ads, interests) => {
  return { type: 'GET_ADS', payload: { ads, interests } }
}

export const updateIndex = (index) => {
  return { type: 'UPDATE_INDEX', payload: index }
}

export const passCard = (card) => {
  return {type: 'PASS_CARD', payload: card}
}

export const removeCard = (card, amount) => {
  card.amount = amount
  return {type: 'REMOVE_CARD', payload: card}
}

export const updateHistory = (history) => {
  return {type:'LOAD_HISTORY', payload:history}
}

export const updateDonation = (data) =>{
  return {type: 'UPDATE_DONATION', payload: data}
}
