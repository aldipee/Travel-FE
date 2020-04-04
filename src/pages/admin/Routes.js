/*eslint-disable*/

import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import formSerizalize from 'form-serialize'

import {
  Button,
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  Table,
  UncontrolledTooltip,
  FormGroup,
  Form,
  Input
} from 'reactstrap'
import Icon from '@mdi/react'
import { mdiFileEditOutline, mdiDeleteOutline, mdiSort } from '@mdi/js'
import { IoIosSearch } from 'react-icons/io'
import { connect } from 'react-redux'
import { getAllRoutes, addRoutes } from '../../redux/actions/RoutesActions'
import { RoutesContext } from '../../context/RouteContext'
import InsertModal from '../../components/ModalRoutes'

import Pagination from '../../components/Pagination'

function Routes(props) {
  const routesData = useContext(RoutesContext)
  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(!showModal)
  const search = e => {
    e.preventDefault()
    const data = formSerizalize(e.target, { hash: true })
    const query = `?${data.searchValue ? `search[value]=${data.searchValue}&` : ''}limit=${
      data.limit
    }`
    props.history.push({ search: query })
    props.getAllRoutes(props.history.location.search)
  }
  const addNewData = e => {
    props.addRoutes(e)
    setShowModal(false)
  }
  useEffect(() => {
    props.getAllRoutes()
  }, [])

  const movePage = page => {
    const query = `${
      props.history.location.search
        ? `${props.history.location.search}&page=${page}`
        : `?page=${page}`
    } `
    console.log(query)
    props.getAllRoutes(query)
  }

  const onPageChanged = data => {
    const { currentPage, totalPages, pageLimit } = data
    movePage(currentPage)
  }
  const { data, pageInfo } = props
  console.log(pageInfo)
  return (
    <>
      <InsertModal showModal={showModal} openModal={openModal} addNewData={addNewData} />
      <Container fluid={true}>
        <Row>
          <Col sm="6" className="my-3">
            <Card body>
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>
                With supporting text below as a natural lead-in to additional content.
              </CardText>
            </Card>
          </Col>
          <Col sm="12">
            <Card body>
              <CardTitle>
                <Row>
                  <Col sm={2}>
                    <h4 className="border-gray border-right" style={{ fontSize: '20px' }}>
                      <strong className="text-secondary" style={{ fontSize: '19px' }}>
                        {props.pageInfo && props.pageInfo.totalData}
                      </strong>{' '}
                      Routes
                    </h4>
                  </Col>
                  <Col sm={2}>
                    {props.pageInfo && props.pageInfo.page && (
                      <span
                        className="current-page d-inline-block h-100 pl-4 text-secondary"
                        style={{ fontSize: '16px' }}>
                        Page{' '}
                        <span style={{ fontSize: '16px' }} className="font-weight-bold">
                          {props.pageInfo.page}
                        </span>{' '}
                        /{' '}
                        <span style={{ fontSize: '17px' }} className="font-weight-bold">
                          {props.pageInfo.totalPage}
                        </span>
                      </span>
                    )}
                  </Col>

                  <Col sm="6" className="text-right">
                    <Button onClick={openModal}>Add Routes</Button>
                  </Col>
                </Row>
                <Row className="mt-3 mb-1">
                  <Form inline onSubmit={search}>
                    <Col sm={4}>
                      <FormGroup className="mr-4">
                        <Input type="text" name="searchValue" placeholder="Search by name.." />
                      </FormGroup>
                    </Col>
                    <Col sm={4} className="ml-4">
                      <FormGroup className="mr-4">
                        <Input type="select" name="limit">
                          <option value="5">Show 5 data</option>
                          <option value="10">Show 10 data</option>
                          <option value="20">Show 20 data</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col sm={2}>
                      <Button>
                        <IoIosSearch size={30} />
                        Go!
                      </Button>
                    </Col>
                  </Form>

                  <Col>
                    {/* <Paginations
                      currentPage={pageInfo && pageInfo.page}
                      totalPages={pageInfo && pageInfo.totalPage}
                      movePage={movePage}
                    /> */}
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
                  {data &&
                    data.map((data, index) => (
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
                            <Icon
                              id="EditData"
                              path={mdiFileEditOutline}
                              size={1}
                              color="#8d9498"
                            />
                            <UncontrolledTooltip placement="right" target="EditData">
                              Edit Data
                            </UncontrolledTooltip>
                          </Link>
                          <Button close>
                            <Icon
                              id="DeleteData"
                              path={mdiDeleteOutline}
                              size={1}
                              color="#8d9498"
                            />
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
                  {pageInfo && pageInfo.totalPage && (
                    <div className="d-flex flex-row py-4 align-items-center">
                      <Pagination
                        totalRecords={pageInfo && pageInfo.totalData}
                        pageLimit={pageInfo && pageInfo.limit}
                        pageNeighbours={0}
                        onPageChanged={onPageChanged}
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

const mapStateToProps = state => ({
  data: state.routesData.data,
  pageInfo: state.routesData.pageInfo,
  isLoading: state.routesData.isLoading,
  showModal: state.routesData.showModal
})

const mapDispatchToProps = {
  getAllRoutes,
  addRoutes
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
