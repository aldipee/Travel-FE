import React from 'react'
import axios from 'axios'
import formSerialize from 'form-serialize'

import config from '../utils/config'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

export const RoutesContext = React.createContext()

export default class Provider extends React.Component {
  state = {
    data: [],
    isLoading: false,

    formData: {},
    pageInfo: {},
    currentPage: 1,
    startPageFrom: 1
  }
  loadData = query => {
    const req = (query && `routes${query}`) || 'routes?limit=5'

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
    axios
      .get(config.DATA_URL.concat(req))
      .then(data => {
        this.setState({
          data: data.data.data,
          pageInfo: {
            ...data.data.pageInfo
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Pagination

  nextData = async () => {
    const results = await axios.get(this.state.pageInfo.nextLink)
    const { data } = results.data
    const { pageInfo } = results.data
    this.setState({ data: data, pageInfo, startPageFrom: this.state.startPageFrom + pageInfo.limit })
  }
  prevData = async () => {
    const results = await axios.get(this.state.pageInfo.prevLink)
    const { data } = results.data
    const { pageInfo } = results.data
    this.setState({ data: data, pageInfo, startPageFrom: this.state.startPageFrom - pageInfo.limit })
  }

  addData = e => {
    e.preventDefault()
    const data = formSerialize(e.target, { hash: true })
    axios.post(config.DATA_URL.concat('routes'), data).then(data => {
      if (data.status === 200) {
        this.setState({
          showModal: false
        })
        this.loadData()
      } else {
        alert('Failed to insert data')
      }
    })
  }

  openModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {
    return (
      <RoutesContext.Provider
        value={{
          ...this.state,
          loadData: this.loadData,
          openModal: this.openModal,
          addData: this.addData,
          nextData: this.nextData,
          prevData: this.prevData
        }}>
        {this.props.children}
      </RoutesContext.Provider>
    )
  }
}

export const Consumer = RoutesContext.Consumer
