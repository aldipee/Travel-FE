import React, { useContext, useState, useEffect } from 'react'
import Select from 'react-select'

import {
  Button,
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  Table,
  Input,
  Form
} from 'reactstrap'

import { SchedulesContext } from '../../context/SchedulesContext'

function Schedules(props) {
  const schedulesData = useContext(SchedulesContext)
  const [date, setDate] = useState(new Date())
  const [selectedRoute, setSelectedRoute] = useState('')
  const dateChange = e => setDate(e.currentTarget.value)
  const selectDest = e => {
    const value = e.value.split(/\s*\-\s*/g)
    const data = {
      origin: value[0],
      destination: value[1]
    }
    setSelectedRoute(data)
  }
  const searchdata = () => {
    props.history.push({
      search: `?origin=${selectedRoute.origin}&destination=${selectedRoute.destination}&date=${date}`
    })
    schedulesData.actions.loadSchedules(props.history.location.search)
  }
  useEffect(() => {
    schedulesData.actions.loadRoutes()
  }, [])

  return (
    <Container fluid={true}>
      <Row className="mx-2 my-2">
        <Col sm="6">
          <Card body>
            <CardTitle>All Schedules</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional content.
            </CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
        <Col sm="12" className="mt-3">
          <Card body>
            <CardTitle>
              <Row>
                <Col sm="6">All Routes</Col>
                <Col sm="6" className="text-right"></Col>
              </Row>
              <Row>
                <Col sm="12">
                  <Form inline>
                    <Col sm="6">
                      <Select
                        required
                        onChange={selectDest}
                        name="origDest"
                        options={schedulesData.routes}
                        isSearchable={true}
                        isClearable={true}
                      />
                    </Col>
                    <Col sm="4">
                      <Input
                        type="date"
                        name="date"
                        id="exampleDatetime"
                        required
                        placeholder="datetime placeholder"
                        onChange={dateChange}
                      />
                    </Col>
                    <Col sm="2" className="text-left">
                      <Button onClick={searchdata}>Search</Button>
                    </Col>
                  </Form>
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
                {schedulesData.dataSchedules &&
                  schedulesData.dataSchedules.map((data, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{data && data.agent}</td>
                      <td>{data && data.bus_name}</td>
                      <td> {data && data.price}</td>
                      <td>{data && data.date}</td>
                      <td>{data && data.time}</td>
                      <td>{data && data.seatsAvaiable && data.seatsAvaiable.length}</td>
                      <td>{data && data.total_seat}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Schedules
