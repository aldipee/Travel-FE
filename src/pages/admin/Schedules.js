import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'
import config from '../../utils/config'

import { Button, Container, Col, Row, Card, CardTitle, CardText, Table, UncontrolledTooltip } from 'reactstrap'
import Icon from '@mdi/react'
import { mdiFileEditOutline, mdiDeleteOutline } from '@mdi/js'

import { SchedulesContext } from '../../context/SchedulesContext'
import Layout from '../layout/Dashboard.layout'

class Schedules extends Component {
  static contextType = SchedulesContext
  state = {
    data: [],
    routes: [],
    dataSchedules: []
  }
  loadRoutes = () => {
    axios
      .get(config.DATA_URL.concat('routes'))
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
    console.log(data)
    this.props.history.push({ search: `?origin=${data.origin}&destination=${data.destination}` })
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
            <p>
              The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on
              larger screens. When toggled using the Button below, the menu will change.
            </p>
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>All Schedules</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="12">
                <Card body>
                  <CardTitle>
                    <Row>
                      <Col sm="6">All Routes</Col>
                      <Col sm="6" className="text-right">
                        <Button onClick={this.context.openModal}>Add Routes</Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <Select
                          onChange={this.selectDest}
                          name="origDest"
                          options={this.state.routes}
                          isSearchable={true}
                          isClearable={true}

                        />
                      </Col>
                      <Col sm="6">


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
                            <td>
                              {data && data.agent}
                            </td>
                            <td>
                              {data && data.bus_name}
                            </td>
                            <td> {data && data.price}</td>
                            <td>
                              {data && data.date}
                            </td>
                            <td>
                              {data && data.time}
                            </td>
                            <td>
                              {data && data.seatsAvaiable.length}
                            </td>
                            <td>
                              {data && data.total_seat}
                            </td>

                          </tr>
                        ))}
                    </tbody>
                  </Table>

                  <Button>Go somewhere</Button>
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
