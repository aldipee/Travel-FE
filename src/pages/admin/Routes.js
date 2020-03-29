import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import formSerizalize from 'form-serialize'

import { Button, Container, Col, Row, Card, CardTitle, CardText, Table, UncontrolledTooltip, FormGroup, Form, Input } from 'reactstrap'
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
  search = (e) => {
    e.preventDefault()
    const data = formSerizalize(e.target, { hash: true })
    console.log(data)
    const query = `?${data.searchValue ? `search[value]=${data.searchValue}&` : ''}limit=${data.limit}`

    this.props.history.push({ search: query })
    this.context.loadData(this.props.history.location.search)
  }

  render() {
    return (
      <>
        <InsertModal showModal={this.context.showModal} />

        <Layout>
          <Container fluid={true}>

            <Row>
              <Col sm="6" className='my-3'>
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
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
                    <Row className='mt-3 mb-1'>
                      <Col sm='12'>
                        <Form inline onSubmit={this.search}>
                          <FormGroup className="mr-4">
                            <Input
                              type="text"
                              name="searchValue"

                              placeholder="Search by name.."
                            />
                          </FormGroup>
                          <Col>
                            <FormGroup className="mr-4">
                              <Input type="select" name="limit" onChange={this.selectHandlers}>
                                <option value="5">Show 5 data</option>
                                <option value="25">Show 25 data</option>
                                <option value="50">Show 50 data</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Button>Go!</Button>
                        </Form>
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
