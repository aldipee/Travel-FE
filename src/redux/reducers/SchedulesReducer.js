import {
  SET_LOADING_SCHEDULES,
  GET_SCHEDULES,
  ERROR_SCHEDULES,
  LOAD_ROUTES
} from '../actions/types'

const initialState = {
  data: [],
  routes: [],
  dataSchedules: [],
  isLoading: false,
  error: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_ROUTES: {
      return {
        ...state,
        routes: action.payload,
        isLoading: false
      }
    }
    case GET_SCHEDULES: {
      return {
        ...state,
        dataSchedules: action.payload,
        isLoading: false
      }
    }

    case SET_LOADING_SCHEDULES: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ERROR_SCHEDULES: {
      return {
        ...state,
        error: action.payload
      }
    }

    default:
      return {
        state
      }
  }
}
