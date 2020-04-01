import React from 'react'
import axios from 'axios'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
import config from '../utils/config'
export const AgentContext = React.createContext()

export default class Provider extends React.Component {
  state = {
    data: [],
    isLoading: true
  }

  loadData = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
    axios.get(config.DATA_URL.concat('agents')).then(data => {
      // console.table(data.data.data)
      this.setState({
        data: data.data.data,
        isLoading: false
      })
    })
  }

  componentWillMount() {}

  render() {
    return (
      <AgentContext.Provider
        value={{
          data: this.state.data,
          isLoading: this.state.isLoading,
          actions: {
            loadData: this.loadData
          }
        }}>
        {this.props.children}
      </AgentContext.Provider>
    )
  }
}

export const Consumer = AgentContext.Consumer
