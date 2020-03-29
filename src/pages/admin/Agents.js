import React, { useContext, useEffect } from 'react'

//Context
import { AgentContext } from '../../context/AgentContext'

import {
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  Table
} from 'reactstrap'
import Layout from '../layout/Dashboard.layout'

function Agents() {
  useEffect(() => {
    data.actions.loadData()
  }, [])

  const data = useContext(AgentContext)

  return (
    <Layout>
      <Container fluid={true}>
        <Row>
          <Col sm="12" className="mt-3 mb-2">
            <Card body>
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>
                With supporting text below as a natural lead-in to additional
                content.
              </CardText>
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
                  {data.data.length &&
                    data.data.map((data, index) => (
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
    </Layout>
  )
}

export default Agents
