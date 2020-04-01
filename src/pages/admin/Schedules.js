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
import { connect } from 'react-redux'
import { getSchedules, loadRoutes } from '../../redux/actions/SchedulesActions'

function Schedules(props) {
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
    props.getSchedules(props.history.location.search)
  }
  useEffect(() => {
    props.loadRoutes()
  }, [])

  return (
    <Container fluid={true}>
      <Row className="mx-2 my-2">
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
                        onChange={selectDest}
                        name="origDest"
                        options={props.schedules.routes}
                        isSearchable={true}
                        isClearable={true}
                      />
                    </Col>
                    <Col sm="4">
                      <Input
                        type="date"
                        name="date"
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
                {props.schedules.dataSchedules &&
                  props.schedules.dataSchedules.map((data, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{data && data.agent}</td>
                      <td>{data && data.bus_name}</td>
                      <td> {data && data.price}</td>
                      <td>{data && data.date}</td>
                      <td>{data && data.time}</td>
                      <td>
                        {data &&
                          data.seatsAvaiable &&
                          data.seatsAvaiable.length}
                      </td>
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

const mapStateToProps = state => {
  return {
    schedules: state.schedules
  }
}
const mapDispatchToProps = { getSchedules, loadRoutes }
export default connect(mapStateToProps, mapDispatchToProps)(Schedules)
