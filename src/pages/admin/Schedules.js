import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'
import config from '../../utils/config'
import formSerialize from 'form-serialize'

import { Button, Container, Col, Row, Card, CardTitle, CardText, Table, Input, Form } from 'reactstrap'



import { SchedulesContext } from '../../context/SchedulesContext'
import Layout from '../layout/Dashboard.layout'

class Schedules extends Component {
  static contextType = SchedulesContext
  state = {
    data: [],
    routes: [],
    dataSchedules: [],
    date: new Date()
  }

  dateChange = e => {
    this.setState({ date: e.currentTarget.value })
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
  loadSchedules = () => {
    axios
      .get(config.DATA_URL.concat(`schedules${this.props.history.location.search}`))
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
  selectDest = e => {
    const value = e.value.split(/\s*\-\s*/g)
    const data = {
      origin: value[0],
      destination: value[1]
    }
    this.setState({
      selectedRoute: data
    })


  }

  searchData = e => {
    this.props.history.push({ search: `?origin=${this.state.selectedRoute.origin}&destination=${this.state.selectedRoute.destination}&date=${this.state.date}` })
    this.loadSchedules()
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
    this.loadRoutes()
  }


  render() {
    // Destract Destination Value

    return (
      <>
        <Layout>
          <Container fluid={true}>

            <Row className='mx-2 my-2'>
              <Col sm="6">
                <Card body>
                  <CardTitle>All Schedules</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="12" className='mt-3'>
                <Card body>
                  <CardTitle>
                    <Row>
                      <Col sm="6">All Routes</Col>
                      <Col sm="6" className="text-right">

                      </Col>
                    </Row>
                    <Row>
                      <Col sm='12'>
                        <Form inline>
                          <Col sm="6">
                            <Select
                              required
                              onChange={this.selectDest}
                              name="origDest"
                              options={this.state.routes}
                              isSearchable={true}
                              isClearable={true}
                            />
                          </Col>
                          <Col sm="4">
                            <Input
                              type="date"
                              name="date"
                              id="exampleDatetime"
                              required
                              placeholder="datetime placeholder"
                              onChange={this.dateChange}
                            />
                          </Col>
                          <Col sm="2" className='text-left'>
                            <Button onClick={this.searchData} >Search</Button>
                          </Col>
                        </Form>
                      </Col>
                    </Row>
                  </CardTitle>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Agent</th>
                        <th>Bus Name</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Seats avaiable</th>
                        <th>Bus Capacity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.dataSchedules &&
                        this.state.dataSchedules.map((data, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{data && data.agent}</td>
                            <td>{data && data.bus_name}</td>
                            <td> {data && data.price}</td>
                            <td>{data && data.date}</td>
                            <td>{data && data.time}</td>
                            <td>{data && data.seatsAvaiable && data.seatsAvaiable.length}</td>
                            <td>{data && data.total_seat}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>

                </Card>
              </Col>
            </Row>
          </Container>
        </Layout>
      </>
    )
  }
}

export default Schedules
