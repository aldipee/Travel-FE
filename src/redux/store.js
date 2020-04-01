import { createStore, applyMiddleware } from 'redux'
import promiseMidlleware from 'redux-promise-middleware'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
//Local
import rootReducer from './reducers'

const config = {
  key: 'container',
  stateReconciler: hardSet,
  storage
}
const persistedReducer = persistReducer(config, rootReducer)

export const store = createStore(
  persistedReducer,
  applyMiddleware(promiseMidlleware, logger, thunk)
)

export const pesistor = persistStore(store)
