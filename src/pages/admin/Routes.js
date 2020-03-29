import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import formSerizalize from 'form-serialize'

import { Button, Container, Col, Row, Card, CardTitle, CardText, Table, UncontrolledTooltip, FormGroup, Form, Input } from 'reactstrap'
import Icon from '@mdi/react'
import { mdiFileEditOutline, mdiDeleteOutline, mdiSort } from '@mdi/js'

import { RoutesContext } from '../../context/RouteContext'
import Layout from '../layout/Dashboard.layout'
import InsertModal from '../../components/ModalRoutes'

function Routes(props) {
  const routesData = useContext(RoutesContext)
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    routesData.loadData()
  }, [])
  const openModal = () => setShowModal(!showModal)
  const search = e => {
    e.preventDefault()
    const data = formSerizalize(e.target, { hash: true })
    const query = `?${data.searchValue ? `search[value]=${data.searchValue}&` : ''}limit=${data.limit}`
    props.history.push({ search: query })
    routesData.loadData(props.history.location.search)
  }
  return (
    <>
      <InsertModal showModal={showModal} openModal={openModal} />
      <Layout>
        <Container fluid={true}>
          <Row>
            <Col sm="6" className="my-3">
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
                      <Button onClick={openModal}>Add Routes</Button>
                    </Col>
                  </Row>
                  <Row className="mt-3 mb-1">
                    <Col sm="12">
                      <Form inline onSubmit={search}>
                        <FormGroup className="mr-4">
                          <Input type="text" name="searchValue" placeholder="Search by name.." />
                        </FormGroup>
                        <Col>
                          <FormGroup className="mr-4">
                            <Input type="select" name="limit">
                              <option value="5">Show 5 data</option>
                              <option value="10">Show 10 data</option>
                              <option value="20">Show 20 data</option>
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
                      <th name="no">
                        # <Icon path={mdiSort} size={1} color="#8d9498" />
                      </th>
                      <th>Depature</th>
                      <th>Destionation</th>
                      <th>Distance (KM)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routesData.data &&
                      routesData.data.map((data, index) => (
                        <tr>
                          <th scope="row">{routesData.startPageFrom + index}</th>
                          <td>
                            {data && data.origin} ({data && data.origin_code})
                          </td>
                          <td>
                            {data && data.destination} ({data && data.destination_code})
                          </td>
                          <td> {data && data.distance}</td>

                          <td>
                            <Link to={`${props.match.path}/edit/${data && data.id}`}>
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
                <Row>
                  <Col md={6} className="text-center">
                    <Button disabled={routesData.pageInfo.prevLink ? false : true} onClick={routesData.prevData} color="primary">
                      Prev
                    </Button>
                  </Col>
                  <Col md={6} className="text-center">
                    <Button disabled={routesData.pageInfo.nextLink ? false : true} onClick={routesData.nextData} color="primary">
                      Next
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  )
}

export default Routes
