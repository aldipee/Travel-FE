/*eslint-disable*/

import React, { Component } from 'react'
import axios from 'axios'

import config from '../../utils/config'
import { convertToRupiah, converDate } from '../../utils/conver'

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
  Media,
  Badge,
  Table,
  CardBody,
  CardLink,
  CardSubtitle,
  Label
} from 'reactstrap'

import { SchedulesContext } from '../../context/SchedulesContext'

class UserDetails extends Component {
  static contextType = SchedulesContext
  state = {
    profileData: {},
    reservationsData: [],
    isLoading: true
  }

  loadData = id => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
    axios
      .get(config.DATA_URL.concat(`users/profile/${this.props.match.params.id}`))
      .then(data => {
        this.setState({
          profileData: data.data.profileData,
          reservationsData: data.data.reservationsData,
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
    const { profileData, reservationsData } = this.state
    return (
      <>
        <Container fluid={true}>
          <Row>
            <Col sm="12" className="mb-2 mt-2">
              <Card body>
                <CardText>
                  With supporting text below as a natural lead-in to additional content.
                </CardText>
              </Card>
            </Col>
            <Col sm="12">
              <Card body>
                <CardTitle></CardTitle>
                <ListGroupItem>
                  <ListGroupItemHeading>User's Profile</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Media>
                      <Media
                        object
                        className="img-user img-fluid img-thumbnail"
                        src={`http://${profileData && profileData.avatar}`}
                        alt="Generic placeholder image"
                      />

                      <Media body>
                        <Row>
                          <Col md="12">
                            <CardBody>
                              <CardTitle className="text-bold">User ID</CardTitle>
                              <CardSubtitle>
                                <Badge color="success">
                                  <h5># {profileData && profileData.id}</h5>
                                </Badge>
                              </CardSubtitle>
                            </CardBody>
                            <CardBody>
                              <CardText>
                                <Row>
                                  <Col md="3">
                                    <Label>Full Name</Label>
                                  </Col>
                                  <Col md="9">
                                    <span>{profileData && profileData.fullName}</span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="3">
                                    <Label>Birth of Date</Label>
                                  </Col>
                                  <Col md="9">
                                    <span>
                                      {profileData &&
                                        profileData.bod &&
                                        converDate(profileData.bod)}
                                    </span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="3">
                                    <Label>Gender</Label>
                                  </Col>
                                  <Col md="9">
                                    <span>{profileData && profileData.gender}</span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="3">
                                    <Label>Phone Number</Label>
                                  </Col>
                                  <Col md="9">
                                    <span>{profileData && profileData.phoneNumber}</span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="3">
                                    <Label>Full Address</Label>
                                  </Col>
                                  <Col md="9">
                                    <span>{profileData && profileData.fullAddress}</span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="3">
                                    <Label>User's Balance</Label>
                                  </Col>
                                  <Col md="9">
                                    <span>
                                      {profileData &&
                                        profileData.balance &&
                                        convertToRupiah(profileData.balance)}
                                    </span>
                                  </Col>
                                </Row>

                                {/* <Table borderless>
                                      <thead>
                                        <tr>
                                          <th>Full Name</th>
                                          <th>Balance</th>
                                          <th>Birth of Date</th>
                                          <th>Gender</th>
                                          <th>Phone Number</th>
                                          <th>Full Address</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <th>{profileData && profileData.fullName}</th>
                                          <td>
                                            {profileData && profileData.balance && convertToRupiah(profileData.balance)}
                                          </td>
                                          <td>{profileData && profileData.bod && converDate(profileData.bod)}</td>
                                          <td>{profileData && profileData.gender}</td>
                                          <td>{profileData && profileData.phoneNumber}</td>
                                          <td>{profileData && profileData.fullAddress}</td>
                                        </tr>
                                      </tbody>
                                    </Table> */}
                              </CardText>
                              <CardLink href="#">Card Link</CardLink>
                              <CardLink href="#">Another Link</CardLink>
                            </CardBody>
                          </Col>
                        </Row>
                      </Media>
                    </Media>
                    <Col md="12" className="mt-5">
                      <h5>Reservations History</h5>
                      <Table borderless>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>ID Res</th>
                            <th>Booked By</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Route</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.reservationsData &&
                            this.state.reservationsData.map((data, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{data && data.reservation_id}</td>
                                <td>{data && data.booked_by_name}</td>
                                <td>
                                  {data && data.schedule_date && converDate(data.schedule_date)}
                                </td>
                                <td>{data && data.schedule_time}</td>
                                <td>{data && `${data.check_in ? 'Completed' : 'Waiting'}`}</td>
                                <td>{data && `${data.origin}-${data.destination}`}</td>
                                <td>
                                  {data && data.totalPrice && convertToRupiah(data.totalPrice)}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Col>
                  </ListGroupItemText>
                </ListGroupItem>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default UserDetails
