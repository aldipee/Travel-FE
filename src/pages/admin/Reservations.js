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
import Layout from '../layout/Dashboard.layout'

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

  return (
    <Layout>
      <Container fluid={true}>
        <Row>
          <Col sm="6">
            <Card body>
              <CardTitle>All Users</CardTitle>
              <CardText>
                With supporting text below as a natural lead-in to additional
                content.
              </CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
          <Col sm="12">
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
                  {reservationsData.data &&
                    reservationsData.data.map((data, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <Link
                            to={`${props.match.path}/details/${data &&
                              data.id_reservation}`}>
                            {data && `#${data.id_reservation}`}{' '}
                          </Link>
                        </td>
                        <td>
                          {data &&
                            `${
                              data.check_in ? 'Completed' : 'Waiting Check-in'
                            }`}
                        </td>
                        <td>{data && data.fullName}</td>
                        <td> {data && data.time}</td>
                        <td>{data && data.date}</td>
                        <td>{data && data.gender}</td>
                        <td>
                          {data && `${data.origin} - ${data.destination}`}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
export default Reservations
