import axios from 'axios'
import {
  SET_LOADING_AUTH,
  SET_LOGIN,
  SET_WRONG_DATA,
  ERROR_AUTH,
  IS_TOKEN_AVAILABLE
} from '../actions/types'

export const userLogin = (username, password) => async (dispatch) => {
  try {
    setLoading()
    const data = { username, password }
    const res = await axios.post('http://localhost:5001/auth/login', data)
    if (res.data.token) {
      localStorage.setItem('token_user', res.data.token)
      localStorage.setItem('role', res.data.role)
      console.log(res.data)
      dispatch({
        type: SET_LOGIN,
        payload: res.data.role
      })
    } else {
      dispatch({
        type: SET_WRONG_DATA
      })
    }
  } catch (error) {
    console.error('This Error comes from Auth Actions', error)
    dispatch({
      type: ERROR_AUTH,
      payload: error
    })
  }
}

export const isTokenAvaiable = () => async (dispatch) => {
  try {
    const token = `Bearer ${localStorage.getItem('token_user')}`
    const res = await axios.post('http://localhost:5001/auth/token', { token })
    if (res.data.valid) {
      dispatch({
        type: IS_TOKEN_AVAILABLE,
        payload: true
      })
    } else {
      dispatch({
        type: IS_TOKEN_AVAILABLE,
        payload: false
      })
    }
  } catch (error) {
    console.error('This Error comes from Auth Actions', error)
    dispatch({
      type: ERROR_AUTH,
      payload: error
    })
  }
}

export const setLoading = () => {
  return {
    action: SET_LOADING_AUTH
  }
}
