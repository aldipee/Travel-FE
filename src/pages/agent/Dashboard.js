import React from 'react'

import {
  Button,
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  CardText
} from 'reactstrap'
import Layout from '../layout/Dashboard.layout'

const DashboardContent = () => {
  return (
    <Container fluid={true}>
      <h1 className="mt-4">Simple Sidebar</h1>

      <Row>
        <Col sm="4">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
        <Col sm="4">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
        <Col sm="4">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardContent
