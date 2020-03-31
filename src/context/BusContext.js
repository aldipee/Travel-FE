import React from 'react'
import axios from 'axios'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
import config from '../utils/config'
export const BusContext = React.createContext()

export default class Provider extends React.Component {
  state = {
    data: [],
    agents: [],
    isLoading: true
  }
  componentDidMount() {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('token_user')}`
  }
  loadAgents = () => {
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
      .get(config.DATA_URL.concat(`bus/agent/${e.value}`))
      .then(data => {
        console.log('from context', data.data.data)
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

  loadData = async () => {
    this.setState({ isLoading: true })
    const res = await axios.get(config.DATA_URL.concat('bus'))
    this.setState({ data: res.data.data, isLoading: false })
  }

  render() {
    return (
      <BusContext.Provider
        value={{
          data: this.state.data,
          agents: this.state.agents,
          isLoading: this.state.isLoading,
          actions: {
            loadAgents: this.loadAgents,
            selectAgent: this.selectAgent,
            loadData: this.loadData
          }
        }}>
        {this.props.children}
      </BusContext.Provider>
    )
  }
}

export const Consumer = BusContext.Consumer
