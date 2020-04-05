import {
  SET_LOADING_AUTH,
  SET_LOGIN,
  SET_WRONG_DATA,
  ERROR_AUTH,
  IS_TOKEN_AVAILABLE
} from '../actions/types'
const initialState = {
  isLogin: false,
  isLoading: false,
  isWrong: false,
  error: null,
  role: 0
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING_AUTH: {
      return {
        ...state,
        isLoading: true
      }
    }
    case SET_WRONG_DATA: {
      return {
        ...state,
        isWrong: true
      }
    }
    case IS_TOKEN_AVAILABLE: {
      return {
        ...state,
        isLogin: payload ? true : false
      }
    }
    case ERROR_AUTH: {
      return {
        ...state,
        error: payload
      }
    }
    case SET_LOGIN: {
      return {
        ...state,
        isLogin: true,
        role: parseInt(payload)
      }
    }

    default:
      return {
        ...state
      }
  }
}
