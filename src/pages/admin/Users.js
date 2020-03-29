import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import FormSerialize from 'form-serialize'

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
  Form,
  Input
} from 'reactstrap'

import { UsersContext } from '../../context/UsersContext'
import Layout from '../layout/Dashboard.layout'
import TableLoading from '../../components/TableLoading'
import { converDate } from '../../utils/conver'

function Users(props) {
  const userData = useContext(UsersContext)
  const submitSearch = e => {
    e.preventDefault()
    const data = FormSerialize(e.target, { hash: true })
    console.log(data)
    props.history.push({
      search: `?search[key]=${data.searchBy}&search[value]=${
        data.value ? data.value : ''
      }`
    })
    userData.actions.searchData(props.history.location.search)
  }
  useEffect(() => {
    userData.actions.searchData()
  }, [])
  return (
    <>
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
                    <Col sm="6"> </Col>
                  </Row>

                  <Row>
                    <Form inline onSubmit={submitSearch}>
                      <FormGroup className="mr-4">
                        <Input
                          type="text"
                          name="value"
                          placeholder="Search by name.."
                        />
                      </FormGroup>

                      <FormGroup className="mr-4">
                        <Input type="select" name="searchBy">
                          <option value="fullName">Name</option>
                          <option value="username">Username</option>
                          <option value="phoneNumber">Phone Number</option>
                        </Input>
                      </FormGroup>

                      <FormGroup className="mr-4">
                        <Input type="select" name="limit">
                          <option value="5">Show 5 data</option>
                          <option value="25">Show 25 data</option>
                          <option value="50">Show 50 data</option>
                        </Input>
                      </FormGroup>

                      <Button>Go!</Button>
                    </Form>
                  </Row>
                </CardTitle>
                <Table>
                  {userData.isLoading ? (
                    <TableLoading tableHead={8} />
                  ) : (
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Balance</th>
                        <th>Phone Number</th>
                      </tr>
                    </thead>
                  )}
                  {userData.isLoading ? (
                    <TableLoading rows={5} cols={8} />
                  ) : (
                    userData.data &&
                    userData.data.map((data, index) => (
                      <tbody>
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <Link
                              to={`${props.match.path}/profile/${data &&
                                data.id}`}>
                              {data && data.username}
                            </Link>
                          </td>
                          <td>{data && data.email}</td>
                          <td> {data && data.fullName}</td>
                          <td>{data && data.gender}</td>
                          <td>{data && data.bod && converDate(data.bod)}</td>
                          <td>{data && data.balance}</td>
                          <td>{data && data.phoneNumber}</td>
                        </tr>
                      </tbody>
                    ))
                  )}
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

export default Users
