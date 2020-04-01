import axios from 'axios'
import config from '../../utils/config'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'token_user'
)}`

export const getReservations = query => async dispatch => {
  try {
    setLoading()
    query = (query && `reservations/all${query}`) || 'reservations/all'
    const res = await axios.get(config.DATA_URL.concat(query))
    dispatch({
      type: 'GET_RESERVATIONS_DATA',
      payload: res.data.data
    })
  } catch (error) {
    console.error('Error from Reservations ACtiond', error)
    dispatch({
      type: 'ERROR_RESERVATIONS',
      payload: error.response.data
    })
  }
}

export const setLoading = () => {
  return {
    type: 'SET_LOADING'
  }
}
