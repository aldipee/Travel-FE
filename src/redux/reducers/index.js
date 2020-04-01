import { combineReducers } from 'redux'

import reservationsReducer from './ReservationsReducer'
import schedulesReducer from './SchedulesReducer'

export default combineReducers({
  dataReservations: reservationsReducer,
  schedules: schedulesReducer
})
