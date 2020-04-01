import axios from 'axios'
import config from '../../utils/config'
import {
  GET_SCHEDULES,
  LOAD_ROUTES,
  ERROR_SCHEDULES,
  SET_LOADING_SCHEDULES
} from './types'

// Set Token
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'token_user'
)}`

export const getSchedules = query => async dispatch => {
  try {
    setLoading()
    const res = await axios.get(config.DATA_URL.concat(`schedules${query}`))
    console.log(res)
    dispatch({
      type: GET_SCHEDULES,
      payload: res.data.data
    })
  } catch (error) {
    dispatch({
      type: ERROR_SCHEDULES,
      payload: error
    })
  }
}

export const loadRoutes = () => async dispatch => {
  try {
    console.log('jakaaaa')
    setLoading()
    const res = await axios.get(config.DATA_URL.concat('routes?show=all'))
    let routes = res.data.data.map(dest => ({
      value: `${dest.origin_code}-${dest.destination_code}`,
      label: `${dest.origin} (${dest.origin_code}) - ${dest.destination} (${dest.destination_code})`
    }))
    dispatch({
      type: LOAD_ROUTES,
      payload: routes
    })
  } catch (error) {
    dispatch({
      type: ERROR_SCHEDULES,
      payload: error
    })
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING_SCHEDULES
  }
}
