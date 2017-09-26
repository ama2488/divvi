export const balanceReducer = (state, action) => {
  if (state === undefined) {
    return {balance:0, donations:0}
  }
  if (action.type === 'UPDATE_BALANCE') {
    if (action.payload.direction === 'increase') {
      state.balance += action.payload.amount
    }
    if (action.payload.direction === 'decrease') {
      state.balance -= action.payload.amount
    }
  }

  if (action.type === 'GET_BALANCE') {
    state.balance = action.payload.balance
    state.donations = action.payload.donations
  }
  return state
}
