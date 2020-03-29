import React from 'react'
import axios from 'axios'
import formSerialize from 'form-serialize'

import config from '../utils/config'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'token_user'
)}`
export const SchedulesContext = React.createContext()

export default class Provider extends React.Component {
  state = {
    data: [],
    routes: [],
    dataSchedules: [],
    isLoading: false
  }

  loadRoutes = () => {
    axios
      .get(config.DATA_URL.concat('routes?show=all'))
      .then(data => {
        let routes = data.data.data.map(dest => ({
          value: `${dest.origin_code}-${dest.destination_code}`,
          label: `${dest.origin} (${dest.origin_code}) - ${dest.destination} (${dest.destination_code})`
        }))
        this.setState({
          data: data.data.data,
          routes
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  loadSchedules = query => {
    axios
      .get(config.DATA_URL.concat(`schedules${query}`))
      .then(data => {
        if (data.status === 200) {
          this.setState({
            dataSchedules: data.data.data
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <SchedulesContext.Provider
        value={{
          data: this.state.data,
          routes: this.state.routes,
          dataSchedules: this.state.dataSchedules,
          isLoading: this.state.isLoading,
          actions: {
            loadRoutes: this.loadRoutes,
            loadSchedules: this.loadSchedules
          }
        }}>
        {this.props.children}
      </SchedulesContext.Provider>
    )
  }
}

export const Consumer = SchedulesContext.Consumer
