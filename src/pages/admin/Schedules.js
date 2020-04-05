import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import {
  Button,
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  CardFooter,
  Input,
  Form,
  ListGroup
} from 'reactstrap'
import { connect } from 'react-redux'
import { getSchedules, loadRoutes } from '../../redux/actions/SchedulesActions'
import Pagination from '../../components/Pagination'
import ScheduleList from '../../components/schedules/SchedulesItem'

function Schedules(props) {
  const [date, setDate] = useState(new Date())
  const [selectedRoute, setSelectedRoute] = useState('')
  const dateChange = (e) => setDate(e.currentTarget.value)
  const selectDest = (e) => {
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
  const onPageChanged = (data) => {
    const { currentPage, totalPages, pageLimit } = data
    const query = `${
      props.history.location.search
        ? `${props.history.location.search}&page=${currentPage}`
        : `?page=${currentPage}`
    } `
    console.log(query)
    props.getSchedules(query)
  }

  useEffect(() => {
    props.loadRoutes()
  }, [])

  const newTable = (
    <ListGroup>
      {props.schedules.dataSchedules &&
        props.schedules.dataSchedules.map((data) => (
          <ScheduleList
            totalSeats={data && data.seatsAvaiable && data.seatsAvaiable.length}
            name={data && data.bus_name}
            price={data && data.price}
            time={data && data.time}
            agent={data && data.agent}
            logo={data && data.logo}
          />
        ))}
    </ListGroup>
  )

  // const items = (
  //   <Table>
  //     <thead>
  //       <tr>
  //         <th>#</th>
  //         <th>Agent</th>
  //         <th>Bus Name</th>
  //         <th>Price</th>
  //         <th>Date</th>
  //         <th>Time</th>
  //         <th>Seats avaiable</th>
  //         <th>Bus Capacity</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {props.schedules.dataSchedules &&
  //         props.schedules.dataSchedules.map((data, index) => (
  //           <tr>
  //             <th scope="row">{index + 1}</th>
  //             <td>{data && data.agent}</td>
  //             <td>{data && data.bus_name}</td>
  //             <td> {data && data.price}</td>
  //             <td>{data && data.date}</td>
  //             <td>{data && data.time}</td>
  //             <td>{data && data.seatsAvaiable && data.seatsAvaiable.length}</td>
  //             <td>{data && data.total_seat}</td>
  //           </tr>
  //         ))}
  //     </tbody>
  //   </Table>
  // )

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
          </Card>
        </Col>
      </Row>
      <Row className="mx-2 my-2">
        <Col md={12}>
          <CardTitle></CardTitle>
          <Card body>{newTable}</Card>
          <CardFooter>
            <Row>
              <Col sm={6}></Col>
              <Col sm={2}>
                {props.pageInfo && (
                  <Pagination
                    totalRecords={props.pageInfo && props.pageInfo.totalData}
                    pageLimit={props.pageInfo && props.pageInfo.limit}
                    pageNeighbours={0}
                    onPageChanged={onPageChanged}
                  />
                )}
              </Col>
            </Row>
          </CardFooter>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    schedules: state.schedules,
    pageInfo: state.schedules.pageInfo
  }
}
const mapDispatchToProps = { getSchedules, loadRoutes }
export default connect(mapStateToProps, mapDispatchToProps)(Schedules)
