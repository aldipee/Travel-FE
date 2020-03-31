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

  const item = (
    <>
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
      <tbody>
        {userData.data &&
          userData.data.map((data, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>
                <Link to={`${props.match.path}/profile/${data && data.id}`}>
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
          ))}
      </tbody>
    </>
  )

  const placeholderItems = Array.from(Array(5).keys())
  const placeholder = (
    <>
      <thead>
        <tr>
          <th width="7%">
            <div className="placeholder"></div>
          </th>
          <th width="12%">
            <div className="placeholder"></div>
          </th>
          <th width="18%">
            <div className="placeholder"></div>
          </th>
          <th width="15%">
            <div className="placeholder"></div>
          </th>
          <th width="10%">
            <div className="placeholder"></div>
          </th>
          <th width="15%">
            <div className="placeholder"></div>
          </th>
          <th width="10%">
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {placeholderItems &&
          placeholderItems.map((data, index) => (
            <tr>
              <th scope="row">
                <div className="placeholder"></div>
              </th>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  )

  return (
    <>
      <Container fluid={true}>
        <Row>
          <Col sm="12" className="mt-4">
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
              <Table>{userData.isLoading ? placeholder : item}</Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Users
