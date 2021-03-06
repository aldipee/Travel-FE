import {
  SET_LOADING_BUS,
  ERROR_BUS,
  GET_ALL_BUS_FOR_AGENT,
  GET_ALL_BUS_FOR_ADMIN
} from '../actions/types'
const initialState = {
  data: [],
  isLoading: false,
  error: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING_BUS: {
      return {
        ...state,
        isLoading: true
      }
    }

    case ERROR_BUS: {
      return {
        ...state,
        error: payload
      }
    }

    case GET_ALL_BUS_FOR_AGENT: {
      return {
        ...state,
        data: payload
      }
    }
    case GET_ALL_BUS_FOR_ADMIN: {
      return {
        ...state,
        data: payload
      }
    }
    default: {
      return state
    }
  }
}
