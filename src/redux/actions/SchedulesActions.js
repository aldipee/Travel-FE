import axios from 'axios'
import config from '../../utils/config'
import {
  GET_SCHEDULES,
  LOAD_ROUTES,
  ERROR_SCHEDULES,
  SET_LOADING_SCHEDULES,
  LOAD_ROUTES_WITH_ID,
  AGENT_ADD_NEW_SCHEDULES,
  GET_SCHEDULES_FOR_AGENT,
  GET_SCHEDULES_BY_ID,
  EDIT_SCHEDULES
} from './types'

// Set Token
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`

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
export const addSchedule = data => async dispatch => {
  try {
    const res = await axios.post(config.DATA_URL.concat(`schedules`), data)
    dispatch({
      type: AGENT_ADD_NEW_SCHEDULES,
      payload: res.data
    })
    return true
  } catch (error) {
    dispatch({
      type: ERROR_SCHEDULES,
      payload: error
    })
  }
}

export const getSchedulesForAgent = query => async dispatch => {
  try {
    const res = await axios.get(config.DATA_URL.concat(`schedules/my-schedules${query}`))
    dispatch({
      type: GET_SCHEDULES_FOR_AGENT,
      payload: res.data.data
    })
  } catch (error) {
    dispatch({
      type: ERROR_SCHEDULES,
      payload: error
    })
  }
}

export const updateSchedules = (id, data) => async dispatch => {
  try {
    setLoading()
    console.log('DATA HERE')
    const response = await axios.patch(config.DATA_URL.concat(`schedules/${id}`), data)
    alert('Updated')
    dispatch({
      type: EDIT_SCHEDULES,
      payload: response.data
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

export const loadRoutesWithID = () => async dispatch => {
  try {
    setLoading()
    const res = await axios.get(config.DATA_URL.concat('routes?show=all'))
    let routes = res.data.data.map(dest => ({
      value: `${dest.id}`,
      label: `${dest.origin} (${dest.origin_code}) - ${dest.destination} (${dest.destination_code})`
    }))
    dispatch({
      type: LOAD_ROUTES_WITH_ID,
      payload: routes
    })
  } catch (error) {
    dispatch({
      type: ERROR_SCHEDULES,
      payload: error
    })
  }
}

export const getSchedulesById = id => async dispatch => {
  try {
    const res = await axios.get(config.DATA_URL.concat(`schedules/${id}`))
    dispatch({
      type: GET_SCHEDULES_BY_ID,
      payload: res.data.data
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
