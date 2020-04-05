/*eslint-disable*/

import React, { useEffect, useState } from 'react'
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
import InsertModal from '../../components/route/ModalRoutes'
import Pagination from '../../components/Pagination'
import TableInfo from '../../components/TableInfo'
import TableSearch from '../../components/TableSearch'

function Routes(props) {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(!showModal)
  const search = (e) => {
    e.preventDefault()
    const data = formSerizalize(e.target, { hash: true })
    const query = `?${data.searchValue ? `search[value]=${data.searchValue}&` : ''}limit=${data.limit}`
    props.history.push({ search: query })
    props.getAllRoutes(props.history.location.search)
  }
  const addNewData = (e) => {
    props.addRoutes(e)
    setShowModal(false)
  }
  useEffect(() => {
    props.getAllRoutes()
  }, [])

  const movePage = (page) => {
    const query = `${
      props.history.location.search ? `${props.history.location.search}&page=${page}` : `?page=${page}`
    } `
    props.getAllRoutes(query)
  }

  const onPageChanged = (data) => {
    const { currentPage } = data
    movePage(currentPage)
  }
  const { data, pageInfo } = props
  return (
    <>
      <InsertModal showModal={showModal} openModal={openModal} addNewData={addNewData} />
      <Container fluid={true}>
        <Row>
          <Col sm='12' className='mt-4'>
            <Card body>
              <CardTitle>
                <Row>
                  {props.pageInfo && (
                    <TableInfo
                      totalData={props.pageInfo.totalData}
                      page={props.pageInfo.page}
                      totalPage={props.pageInfo.totalPage}
                      title='Routes'
                    />
                  )}
                  <Col sm='6' className='text-right'>
                    <Button onClick={openModal}>Add Routes</Button>
                  </Col>
                </Row>
                <TableSearch onSubmit={search} />
                {/* <Row className='mt-3 mb-1'>
                  <Form inline onSubmit={search}>
                    <Col sm={4}>
                      <FormGroup className='mr-4'>
                        <Input type='text' name='searchValue' placeholder='Search by name..' />
                      </FormGroup>
                    </Col>
                    <Col sm={4} className='ml-4'>
                      <FormGroup className='mr-4'>
                        <Input type='select' name='limit'>
                          <option value='5'>Show 5 data</option>
                          <option value='10'>Show 10 data</option>
                          <option value='20'>Show 20 data</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col sm={2}>
                      <Button>
                        <span>
                          <IoIosSearch size={30} />
                        </span>
                      </Button>
                    </Col>
                  </Form>
                </Row> */}
              </CardTitle>

              <Table>
                <thead>
                  <tr>
                    <th name='no'>
                      # <Icon path={mdiSort} size={1} color='#8d9498' />
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
                        <th scope='row'>{index}</th>
                        <td>
                          {data && data.origin} ({data && data.origin_code})
                        </td>
                        <td>
                          {data && data.destination} ({data && data.destination_code})
                        </td>
                        <td> {data && data.distance}</td>

                        <td>
                          <Link to={`${props.match.path}/edit/${data && data.id}`}>
                            <Icon id='EditData' path={mdiFileEditOutline} size={1} color='#8d9498' />
                            <UncontrolledTooltip placement='right' target='EditData'>
                              Edit Data
                            </UncontrolledTooltip>
                          </Link>
                          <Button close>
                            <Icon id='DeleteData' path={mdiDeleteOutline} size={1} color='#8d9498' />
                            <UncontrolledTooltip placement='right' target='DeleteData'>
                              Delete Data
                            </UncontrolledTooltip>
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Row>
                <Col md={6} className='text-center'>
                  {pageInfo && pageInfo.totalPage && (
                    <div className='d-flex flex-row py-4 align-items-center'>
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

const mapStateToProps = (state) => ({
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
