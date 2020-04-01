const initialState = {
  data: [],
  isLoading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'GET_RESERVATIONS_DATA': {
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    }

    default: {
      return { state }
    }
  }
}
