import React from 'react'
import axios from 'axios'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
import config from '../utils/config'
export const BusContext = React.createContext()

export default class Provider extends React.Component {
  state = {
    data: [],
    agents: []
  }

  loadAgents = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
    axios.get(config.DATA_URL.concat('agents')).then(data => {
      let agents = data.data.data.map(dest => ({
        value: `${dest.agent_id}`,
        label: `${dest.agent_name} `
      }))
      this.setState({
        agents
      })
    })
  }
  selectAgent = e => {
    axios
      .get(config.DATA_URL.concat(`bus/${e.value}`))
      .then(data => {
        console.log(data)
        if (data.status === 200) {
          this.setState({
            data: data.data.data
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  componentWillMount() {}

  render() {
    return (
      <BusContext.Provider
        value={{
          data: this.state.data,
          agents: this.state.agents,
          actions: {
            loadAgents: this.loadAgents,
            selectAgent: this.selectAgent
          }
        }}>
        {this.props.children}
      </BusContext.Provider>
    )
  }
}

export const Consumer = BusContext.Consumer
