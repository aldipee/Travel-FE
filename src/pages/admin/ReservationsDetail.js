import React, { Component } from 'react'
import { converDate } from '../../utils/conver'
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
  CardSubtitle
} from 'reactstrap'
import { connect } from 'react-redux'
import { getReservationById } from '../../redux/actions/ReservationsActions'

class ReservationsDetails extends Component {
  componentDidMount() {
    this.props.getReservationById(this.props.match.params.id)
  }

  render() {
    const { data } = this.props
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
                  <ListGroupItemHeading>
                    Reservations ID : #{data && data.id_reservation}
                  </ListGroupItemHeading>
                  <ListGroupItemText>
                    <Media>
                      <Media left href="#"></Media>
                      <Media body>
                        <Row>
                          <Col md="12">
                            <CardBody>
                              <CardTitle className="text-bold">Booking Code</CardTitle>
                              <CardSubtitle>
                                <Badge color={data && data.check_in ? 'success' : 'warning'}>
                                  <h5>#{data && data.booking_code}</h5>
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
                                        <th>{data && data.origin}</th>
                                        <td>{data && data.destination}</td>
                                        <td>{data && data.time}</td>
                                        <td>{data && data.date && converDate(data.date)}</td>
                                        <td>{data && data.bus_id}</td>
                                        <td>{data && data.schedule_id}</td>
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
                                        <td>{data && data.fullName}</td>
                                        <td>{data && data.passenger_id_number}</td>
                                        <td>{data && data.passenger_id_type}</td>
                                        <td>{data && data.gender}</td>
                                        <td>
                                          {data && data.check_in ? (
                                            <Badge color="success">{'Completed'}</Badge>
                                          ) : (
                                            <Badge color="warning">{'Wait for Check-In'}</Badge>
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
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.dataReservations.singleData
  }
}

const mapDispatchToProps = { getReservationById }
export default connect(mapStateToProps, mapDispatchToProps)(ReservationsDetails)
