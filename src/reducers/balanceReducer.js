export const balanceReducer = (state, action) => {
  if (state === undefined) {
    return { coins: 0, donations: 0 }
  }
  if (action.type === 'UPDATE_BALANCE') {
    if (action.payload.direction === 'increase') {
      state.coins += action.payload.amount
    }
    if (action.payload.direction === 'decrease') {
      state.coins -= action.payload.amount
    }
  }
  if (action.type === 'UPDATE_DONATIONS') {
    state.donations += action.payload
  }
  return state
}
