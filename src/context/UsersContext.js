import React from 'react'
import axios from 'axios'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

export const UsersContext = React.createContext()

export default class Provider extends React.Component {
  state = {
    isLogin: false,
    isWrong: false
  }

  componentWillMount() {}

  render() {
    return <UsersContext.Provider>{this.props.children}</UsersContext.Provider>
  }
}

export const Consumer = UsersContext.Consumer
