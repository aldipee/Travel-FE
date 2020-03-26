import React from 'react'
import axios from 'axios'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

export const AuthContext = React.createContext()

export default class Provider extends React.Component {
  state = {
    isLogin: false,
    isWrong: false
  }

  componentWillMount() {
    if (localStorage.getItem('token_user')) {
      this.setState({
        isLogin: true
      })
    }
  }

  AuthLogin = async (username, password) => {
    const data = { username, password }
    try {
      const res = await axios.post('http://localhost:5001/auth/login', data)
      if (res.data.token) {
        localStorage.setItem('token_user', res.data.token)
        this.setState({
          isLogin: true
        })
        return true
      } else {
        this.setState({
          isWrong: true
        })
        return false
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{ username: this.state.username, isLogin: this.state.isLogin, AuthLogin: this.AuthLogin }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export const Consumer = AuthContext.Consumer
