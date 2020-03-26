import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Button, Container, Col, Row, Card, CardTitle, CardText, Table, UncontrolledTooltip } from 'reactstrap'
import Icon from '@mdi/react'
import { mdiFileEditOutline, mdiDeleteOutline } from '@mdi/js'

import { RoutesContext } from '../../context/RouteContext'
import Layout from '../layout/Dashboard.layout'
import InsertModal from '../../components/ModalRoutes'

class Routes extends Component {
  static contextType = RoutesContext

  componentDidMount() {
    this.context.loadData()
  }

  render() {
    return (
      <>
        <InsertModal showModal={this.context.showModal} />

        <Layout>
          <Container fluid={true}>
            <p>
              The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on
              larger screens. When toggled using the Button below, the menu will change.
            </p>
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="12">
                <Card body>
                  <CardTitle>
                    <Row>
                      <Col sm="6">All Routes</Col>
                      <Col sm="6" className="text-right">
                        <Button onClick={this.context.openModal}>Add Routes</Button>
                      </Col>
                    </Row>
                  </CardTitle>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Depature</th>
                        <th>Destionation</th>
                        <th>Distance (KM)</th>
                        <th>Total Schedules</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.context.data &&
                        this.context.data.map((data, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>
                              {data && data.origin} ({data && data.origin_code})
                            </td>
                            <td>
                              {data && data.destination} ({data && data.destination_code})
                            </td>
                            <td> {data && data.distance}</td>
                            <td>Dom</td>
                            <td>
                              <Link to={`${this.props.match.path}/edit/${data && data.id}`}>
                                <Icon id="EditData" path={mdiFileEditOutline} size={1} color="#8d9498" />
                                <UncontrolledTooltip placement="right" target="EditData">
                                  Edit Data
                                </UncontrolledTooltip>
                              </Link>
                              <Button close>
                                <Icon id="DeleteData" path={mdiDeleteOutline} size={1} color="#8d9498" />
                                <UncontrolledTooltip placement="right" target="DeleteData">
                                  Delete Data
                                </UncontrolledTooltip>
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>

                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </Container>
        </Layout>
      </>
    )
  }
}

export default Routes
