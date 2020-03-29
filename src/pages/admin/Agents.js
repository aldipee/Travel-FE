import React, { Component } from 'react'

// Data fethching
import axios from 'axios'
import config from '../../utils/config'

import { Button, Container, Col, Row, Card, CardTitle, CardText, Table } from 'reactstrap'
import Layout from '../layout/Dashboard.layout'

class Agents extends Component {
  state = {
    data: [],
    isLoading: true
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
    axios.get(config.DATA_URL.concat('agents')).then(data => {
      console.table(data.data.data)
      this.setState({
        data: data.data.data,
        isLoading: false
      })
    })
  }

  render() {
    const { data } = this.state
    return (
      <Layout>
        <Container fluid={true}>


          <Row>
            <Col sm="12" className='mt-3 mb-2'>
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              </Card>
            </Col>
            <Col sm="12">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <Table borderless>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Travel ID</th>
                      <th>Travel Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>User ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length &&
                      data.map((data, index) => (
                        <tr>
                          <th scope="row">{data && index + 1}</th>
                          <td>{data && data.agent_id}</td>
                          <td>{data && data.agent_name}</td>
                          <td>{data && data.username}</td>
                          <td>{data && data.email}</td>
                          <td>{data && data.user_id}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout >
    )
  }
}

export default Agents
