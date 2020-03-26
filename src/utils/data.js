import config from './config'
import axios from 'axios'

// let token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoxLCJyb2xlIjoiU1VQRVJBRE1JTiIsInVzZXJuYW1lIjoic3VwZXJhZG1pbiIsImlhdCI6MTU4NTEzNTg2MCwiZXhwIjoxNTg1MjIyMjYwfQ.MbMXTXb6aEk3Caa4thRgNIBKpKmiNI3vb8PuLemCfTc'

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
