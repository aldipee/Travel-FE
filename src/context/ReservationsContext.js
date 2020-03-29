import React from 'react'
import axios from 'axios'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
import config from '../utils/config'
export const ReservationsContext = React.createContext()

export default class Provider extends React.Component {
  state = {
    data: [],
    search: '',
    isLoading: true
  }
  loadData = query => {
    query = (query && `reservations/all${query}`) || 'reservations/all'

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
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

  render() {
    return (
      <ReservationsContext.Provider value={{ data: this.state.data, actions: { loadData: this.loadData } }}>
        {this.props.children}
      </ReservationsContext.Provider>
    )
  }
}

export const Consumer = ReservationsContext.Consumer
