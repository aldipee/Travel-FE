import React, { useContext, useEffect } from 'react'
import Select from 'react-select'
import { Button, Container, Col, Row, Card, CardTitle, CardText, Table } from 'reactstrap'

// Local NModules
import { BusContext } from '../../context/BusContext'

function Buses() {
  const Bus = useContext(BusContext)
  useEffect(() => {
    Bus.actions.loadAgents()
  }, [])
  console.log(Bus)
  return (
    <>
      <Container fluid={true}>
        <Row className="mt-4">
          <Col sm="12">
            <Card body>
              <CardTitle>
                <Row>
                  <Col sm="6">All Routes</Col>
                  <Col sm="6" className="text-right"></Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <Select
                      onChange={Bus.actions.selectAgent}
                      name="agent"
                      options={Bus.agents}
                      isSearchable={true}
                      isClearable={true}
                    />
                  </Col>
                  <Col sm="6"></Col>
                </Row>
              </CardTitle>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Bus Name</th>
                    <th>Total Seat</th>
                  </tr>
                </thead>
                <tbody>
                  {Bus.data &&
                    Bus.data.map((data, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{data && data.name}</td>
                        <td> {data && data.total_seat}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Buses
