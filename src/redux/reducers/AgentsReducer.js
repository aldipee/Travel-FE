import { GET_ALL_AGENTS, ERORR_AGENTS, SET_LOADING_AGENTS } from '../actions/types'
const initialState = {
  data: [],
  isLoading: false,
  error: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_AGENTS: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_ALL_AGENTS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    }
    case ERORR_AGENTS: {
      return {
        ...state,
        error: action.payload
      }
    }

    default: {
      return {
        state
      }
    }
  }
}
