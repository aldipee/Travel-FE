import {
  SET_LOADING_RESERVATIONS,
  GET_RESERVATIONS_DATA,
  ERROR_RESERVATIONS,
  GET_RESERVATIONS_BY_ID
} from '../actions/types'
const initialState = {
  data: [],
  singleData: {},
  isLoading: false,
  error: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_RESERVATIONS: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_RESERVATIONS_DATA: {
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    }
    case GET_RESERVATIONS_BY_ID: {
      return {
        ...state,
        singleData: action.payload
      }
    }
    case ERROR_RESERVATIONS: {
      return {
        ...state,
        error: action.payload
      }
    }

    default: {
      return { state }
    }
  }
}
