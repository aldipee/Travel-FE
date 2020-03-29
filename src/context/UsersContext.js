import React from 'react'
import axios from 'axios'
import config from '../utils/config'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

export const UsersContext = React.createContext()
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'token_user'
)}`
export default class Provider extends React.Component {
  state = {
    data: [],
    isLoading: true
  }

  searchData = query => {
    query = (query && `users/${query}&lime=5`) || 'users?limit=5'
    axios
      .get(config.DATA_URL.concat(query))
      .then(data => {
        this.setState({
          data: data.data.data,
          isLoading: false
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentWillMount() {}

  render() {
    return (
      <UsersContext.Provider
        value={{
          data: this.state.data,
          isLoading: this.state.isLoading,
          actions: {
            searchData: this.searchData
          }
        }}>
        {this.props.children}
      </UsersContext.Provider>
    )
  }
}

export const Consumer = UsersContext.Consumer
