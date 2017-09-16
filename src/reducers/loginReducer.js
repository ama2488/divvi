import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import divvicoinArtifacts from '../../build/contracts/DivviCoin.json'

let web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://5516f622.ngrok.io'))

const DivviCoin = contract(divvicoinArtifacts)
DivviCoin.setProvider(web3.currentProvider)

export const loginReducer = (state, action) => {
  if (state === undefined) {
    return null
  }
  if (action.type === 'SIGNIN') {
    return action.payload
  }
  if (action.type === 'SIGNUP') {
    return action.payload.address
  }
  return state
}
