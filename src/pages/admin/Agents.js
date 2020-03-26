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
          <h1 className="mt-4">Hello Agents Page in here</h1>
          <p>
            The starting state of the menu will appear collapsed on smaller screens, and will appear
            non-collapsed on larger screens. When toggled using the Button below, the menu will change.
          </p>
          <p>
            Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar
            is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code>{' '}
            ID which will toggle the menu when clicked.
          </p>
          <Row>
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
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="4">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="4">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default Agents
