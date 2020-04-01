import { combineReducers } from 'redux'

import reservationsReducer from './ReservationsReducer'

export default combineReducers({
  data: reservationsReducer
})
