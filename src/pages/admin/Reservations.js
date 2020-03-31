import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  Table,
  FormGroup,
  Input
} from 'reactstrap'

import { ReservationsContext } from '../../context/ReservationsContext'
import { converDate } from '../../utils/conver'
function Reservations(props) {
  const reservationsData = useContext(ReservationsContext)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    reservationsData.actions.loadData()
  }, [])

  const searchData = e => {
    setSearch(e.currentTarget.value)
    props.history.push({
      search: `?search[key]=fullName&search[value]=${e.currentTarget.value}`
    })
    reservationsData.actions.loadData(props.history.location.search)
  }

  const item = (
    <>
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
        {reservationsData.data &&
          reservationsData.data.map((data, index) => (
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
            <Table>{reservationsData.isLoading ? placeholder : item}</Table>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
export default Reservations
