import { combineReducers } from 'redux'

import reservationsReducer from './ReservationsReducer'
import schedulesReducer from './SchedulesReducer'
import usersReducers from './UsersReducers'
import agentReducers from './AgentsReducer'
import routesReducers from './RoutesReducers'
import busReducers from './BusReducer'

export default combineReducers({
  dataReservations: reservationsReducer,
  schedules: schedulesReducer,
  usersData: usersReducers,
  agentsData: agentReducers,
  routesData: routesReducers,
  busData: busReducers
})
