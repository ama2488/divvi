import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import Reducers from './src/reducers'

const middleWare = () => {
  return applyMiddleware(createLogger())
}

export default createStore(
  Reducers,
  middleWare()
)
