import React, { Component } from 'react'
import { connect } from 'react-redux'
import { convertToRupiah, converDate } from '../../utils/conver'

import { Container, Col, Table } from 'reactstrap'
import { getUserById } from '../../redux/actions/UsersActions'
import UserProfile from '../../components/UserProfile'

class UserDetails extends Component {
  componentDidMount() {
    this.props.getUserById(this.props.match.params.id)
  }
  render() {
    const { profileData, reservationsData, isLoading } = this.props
    return (
      <>
        <UserProfile {...profileData} />
        <Container fluid={true}>
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
                      <td>{data && data.schedule_date && converDate(data.schedule_date)}</td>
                      <td>{data && data.schedule_time}</td>
                      <td>{data && `${data.check_in ? 'Completed' : 'Waiting'}`}</td>
                      <td>{data && `${data.origin}-${data.destination}`}</td>
                      <td>{data && data.totalPrice && convertToRupiah(data.totalPrice)}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profileData: state.usersData.singleData && state.usersData.singleData.userProfile,
    reservationsData: state.usersData.singleData && state.usersData.singleData.userReservations,
    isLoading: state.usersData.isLoading
  }
}

export default connect(mapStateToProps, { getUserById })(UserDetails)
