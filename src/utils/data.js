import config from './config'
import axios from 'axios'

// let token = localStorage.token

// const headers = {
//   Accept: 'application/json',
//   Authorization: token
// }

export const authLogin = async (username, password) => {
  try {
    const data = { username, password }
    const res = await axios.post(config.DATA_URL.concat('auth/login'), data)
    return res
  } catch (error) {
    return false
  }
}
