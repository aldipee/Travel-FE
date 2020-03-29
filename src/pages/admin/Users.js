import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FormSerialize from 'form-serialize'
import axios from 'axios'
import config from '../../utils/config'

import { Button, Container, Col, Row, Card, CardTitle, CardText, Table, FormGroup, Form, Input } from 'reactstrap'

import { SchedulesContext } from '../../context/SchedulesContext'
import Layout from '../layout/Dashboard.layout'
import TableLoading from '../../components/TableLoading'
import { converDate } from '../../utils/conver'

class Users extends Component {
  static contextType = SchedulesContext
  state = {
    data: [],
    search: {
      searchBy: '',
      searchValue: ''
    },
    isLoading: true
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
    this.searchData()
  }

  submitSearch = e => {
    e.preventDefault()
    const data = FormSerialize(e.target, { hash: true })
    this.props.history.push({ search: `?search[key]=${data.searchBy}&search[value]=${data.value ? data.value : ''}` })
    this.searchData(this.props.history.location.search)
  }
  searchData = query => {
    query = (query && `users/${query}&lime=5`) || 'users?limit=5'
    axios
      .get(config.DATA_URL.concat(query))
      .then(data => {
        this.setState({
          data: data.data.data,
          isLoading: false
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <>
        <Layout>
          <Container fluid={true}>
            <p>
              The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on
              larger screens. When toggled using the Button below, the menu will change.
            </p>
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>All Users</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
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
                      <Form inline onSubmit={this.submitSearch}>
                        <FormGroup className="mr-4">
                          <Input
                            type="text"
                            name="value"
                            value={this.state.search.value}
                            placeholder="Search by name.."
                          />
                        </FormGroup>

                        <FormGroup className="mr-4">
                          <Input type="select" name="searchBy" onChange={this.selectHandlers}>
                            <option value="fullName">Name</option>
                            <option value="username">Username</option>
                            <option value="phoneNumber">Phone Number</option>
                          </Input>
                        </FormGroup>

                        <FormGroup className="mr-4">
                          <Input type="select" name="limit" onChange={this.selectHandlers}>
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
                    {this.state.isLoading ? (
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

                    {this.state.isLoading ? (
                      <TableLoading rows={5} cols={8} />
                    ) : (
                      this.state.data &&
                      this.state.data.map((data, index) => (
                        <tbody>
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <Link to={`${this.props.match.path}/profile/${data && data.id}`}>
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
}

export default Users
