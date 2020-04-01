import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import { getUserById } from '../../redux/actions/UsersActions'

class UserDetails extends Component {
  componentDidMount() {
    this.props.getUserById(this.props.match.params.id)
  }
  render() {
    const { profileData, reservationsData, isLoading } = this.props
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
                          {reservationsData &&
                            reservationsData.map((data, index) => (
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

const mapStateToProps = state => {
  return {
    profileData: state.usersData.singleData && state.usersData.singleData.userProfile,
    reservationsData: state.usersData.singleData && state.usersData.singleData.userReservations,
    isLoading: state.usersData.isLoading
  }
}

export default connect(mapStateToProps, { getUserById })(UserDetails)
