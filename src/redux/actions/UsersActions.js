import axios from 'axios'
import { SET_LOADING_USERS, GET_ALL_USERS, GET_USER_BY_ID, ERROR_USERS } from '../actions/types'
import config from '../../utils/config'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`

export const getUserById = id => async dispatch => {
  try {
    setLoading()
    const res = await axios.get(config.DATA_URL.concat(`users/profile/${id}`))
    dispatch({
      type: GET_USER_BY_ID,
      payload: {
        userProfile: res.data.profileData,
        userReservations: res.data.reservationsData
      }
    })
  } catch (error) {
    dispatch({
      type: ERROR_USERS,
      payload: error.response.data
    })
  }
}

const setLoading = () => {
  return {
    type: SET_LOADING_USERS
  }
}
