import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'
import config from '../../utils/config'

import { Button, Container, Col, Row, Card, CardTitle, CardText, Table, FormGroup, Label, Input } from 'reactstrap'

import { SchedulesContext } from '../../context/SchedulesContext'
import Layout from '../layout/Dashboard.layout'

class Reservations extends Component {
  static contextType = SchedulesContext
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
  componentDidMount() {
    this.loadData()
  }
  searchData = e => {
    this.setState({
      search: e.currentTarget.value
    })
    this.props.history.push({ search: `?search[key]=fullName&search[value]=${e.currentTarget.value}` })
    this.loadData(this.props.history.location.search)
  }

  render() {
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
                  <CardTitle>All Users</CardTitle>
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
                      <Col sm="3">
                        <FormGroup>
                          <Input
                            type="text"
                            name="name"
                            value={this.state.search}
                            onChange={this.searchData}
                            placeholder="Search by name.."
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6"></Col>
                    </Row>
                  </CardTitle>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>ID Reservations</th>
                        <th>Status</th>
                        <th>Passenger Name</th>
                        <th>Boarding Time</th>
                        <th>Date</th>
                        <th>Gender</th>
                        <th>Routes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data &&
                        this.state.data.map((data, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <Link to={`${this.props.match.path}/details/${data && data.id_reservation}`}>
                                {data && `#${data.id_reservation}`}{' '}
                              </Link>
                            </td>
                            <td>{data && `${data.check_in ? 'Completed' : 'Waiting Check-in'}`}</td>
                            <td>{data && data.fullName}</td>
                            <td> {data && data.time}</td>
                            <td>{data && data.date}</td>
                            <td>{data && data.gender}</td>
                            <td>{data && `${data.origin} - ${data.destination}`}</td>
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

export default Reservations
