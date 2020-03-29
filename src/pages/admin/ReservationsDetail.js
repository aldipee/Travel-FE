import React, { Component } from 'react'

import Select from 'react-select'
import axios from 'axios'
import config from '../../utils/config'

import {
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Input,
  Media,
  Badge,
  Table,
  CardBody,
  CardLink,
  CardSubtitle
} from 'reactstrap'

import { SchedulesContext } from '../../context/SchedulesContext'
import Layout from '../layout/Dashboard.layout'

class ReservationsDetails extends Component {
  static contextType = SchedulesContext
  state = {
    data: {},
    isLoading: true
  }

  loadData = id => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('token_user')}`
    axios
      .get(config.DATA_URL.concat(`reservations/${this.props.match.params.id}`))
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

  render() {
    const { data } = this.state
    return (
      <>
        <Layout>
          <Container fluid={true}>
            <Row>
              <Col sm="12" className="mb-2 mt-2">
                <Card body>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                </Card>
              </Col>
              <Col sm="12">
                <Card body>
                  <CardTitle></CardTitle>
                  <ListGroupItem>
                    <ListGroupItemHeading>
                      Reservations ID : #{data.id_reservation}
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      <Media>
                        <Media left href="#"></Media>
                        <Media body>
                          <Row>
                            <Col md="12">
                              <CardBody>
                                <CardTitle className="text-bold">
                                  Booking Code
                                </CardTitle>
                                <CardSubtitle>
                                  <Badge
                                    color={
                                      data.check_in ? 'success' : 'warning'
                                    }>
                                    <h5>#{data.booking_code}</h5>
                                  </Badge>
                                </CardSubtitle>
                              </CardBody>
                              <CardBody>
                                <CardText>
                                  <Col md="8">
                                    <h5>Routes Informations</h5>
                                    <Table borderless>
                                      <thead>
                                        <tr>
                                          <th>Origin</th>
                                          <th>Destination</th>
                                          <th>Time</th>
                                          <th>Date</th>
                                          <th>Bus ID</th>
                                          <th>Schedule ID</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <th>{data.origin}</th>
                                          <td>{data.destination}</td>
                                          <td>{data.time}</td>
                                          <td>{data.date}</td>
                                          <td>{data.bus_id}</td>
                                          <td>{data.schedule_id}</td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </Col>
                                  <Col md="10" className="mt-5">
                                    <h5>Passenger Informations</h5>
                                    <Table borderless>
                                      <thead>
                                        <tr>
                                          <th>Passenger Name</th>
                                          <th>Passenger ID Number</th>
                                          <th>Passenger ID type</th>
                                          <th>Gender</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>{data.fullName}</td>
                                          <td>{data.passenger_id_number}</td>
                                          <td>{data.passenger_id_type}</td>
                                          <td>{data.gender}</td>
                                          <td>
                                            {data.check_in ? (
                                              <Badge color="success">
                                                {'Completed'}
                                              </Badge>
                                            ) : (
                                              <Badge color="warning">
                                                {'Wait for Check-In'}
                                              </Badge>
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </Col>
                                </CardText>
                                <CardLink href="#">Card Link</CardLink>
                                <CardLink href="#">Another Link</CardLink>
                              </CardBody>
                            </Col>
                          </Row>
                        </Media>
                      </Media>
                    </ListGroupItemText>
                  </ListGroupItem>
                </Card>
              </Col>
            </Row>
          </Container>
        </Layout>
      </>
    )
  }
}

export default ReservationsDetails
