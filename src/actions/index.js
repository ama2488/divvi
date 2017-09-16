export const getUser = (userId) => {
  return { type:'SIGNIN', payload: userId }
}

export const createUser = (userObj) => {
  return { type: 'SIGNUP', payload: userObj }
}

export const removeCard = (cardId) => {
  return { type: 'REMOVE_CARD', payload: cardId }
}

export const markCard = (cardId) => {
  return { type: 'UPDATE_CARD', payload: cardId }
}
