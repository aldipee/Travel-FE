import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Col, Row, Card, CardTitle, Table, FormGroup, Input } from 'reactstrap'
import { converDate } from '../../utils/conver'
import { getReservations, getAllPassengers } from '../../redux/actions/ReservationsActions'

function Reservations(props) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    props.getAllPassengers()
  }, [])

  const searchData = e => {
    setSearch(e.currentTarget.value)
    props.history.push({
      search: `?search[key]=fullName&search[value]=${e.currentTarget.value}`
    })
    props.getAllPassengers(props.history.location.search)
  }

  const headerTable = [
    '#',
    'ID Res',
    'Status',
    'Passenger Name',
    'Boarding Time',
    'Data',
    'Gender',
    'Routes'
  ]
  const item = (
    <>
      <thead>
        <tr>
          {headerTable.map((data, i) => (
            <th>{data}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.reservations.data &&
          props.reservations.data.map((data, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>
                <Link to={`${props.match.path}/details/${data && data.id_reservation}`}>
                  {data && `#${data.id_reservation}`}{' '}
                </Link>
              </td>
              <td>{data && `${data.check_in ? 'Completed' : 'Waiting Check-in'}`}</td>
              <td>{data && data.fullName}</td>
              <td> {data && data.time}</td>
              <td>{data && data.date && converDate(data.date)}</td>
              <td>{data && data.gender}</td>
              <td>{data && `${data.origin} - ${data.destination}`}</td>
            </tr>
          ))}
      </tbody>
    </>
  )

  const placeholderItems = Array.from(Array(4).keys())
  const placeholder = (
    <>
      <thead>
        <tr>
          <th width="7%">
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {placeholderItems &&
          placeholderItems.map((data, index) => (
            <tr>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
              <td width="10%">
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  )

  return (
    <Container fluid={true}>
      <Row>
        <Col sm="12" className="mt-3">
          <Card body>
            <CardTitle>
              <Row>
                <Col sm="6">All Routes</Col>
                <Col sm="6" className="text-right"></Col>
              </Row>
              <Row>
                <Col sm="3">
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      value={search}
                      onChange={searchData}
                      placeholder="Search by name.."
                    />
                  </FormGroup>
                </Col>
                <Col sm="6"></Col>
              </Row>
            </CardTitle>
            <Table>{props.reservations.isLoading ? placeholder : item}</Table>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
const mapStateToProps = state => {
  return {
    reservations: state.dataReservations
  }
}
const mapDispatchToProps = { getReservations, getAllPassengers }
export default connect(mapStateToProps, mapDispatchToProps)(Reservations)
