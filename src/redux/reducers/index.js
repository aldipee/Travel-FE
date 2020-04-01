import { combineReducers } from 'redux'

import reservationsReducer from './ReservationsReducer'
import schedulesReducer from './SchedulesReducer'
import usersReducers from './UsersReducers'

export default combineReducers({
  dataReservations: reservationsReducer,
  schedules: schedulesReducer,
  usersData: usersReducers
})
