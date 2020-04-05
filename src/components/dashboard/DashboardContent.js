import React from 'react'

import { Button, Container, Col, Row, Card, CardTitle, CardText } from 'reactstrap'

const DashboardContent = () => {
  return (
    <Container fluid={true}>
      <h1 className="mt-4">Simple Sidebar</h1>
      <p>
        The starting state of the menu will appear collapsed on smaller screens, and will appear
        non-collapsed on larger screens. When toggled using the Button below, the menu will change.
      </p>
      <p>
        Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top
        navbar is optional, and just for demonstration. Just create an element with the{' '}
        <code>#menu-toggle</code> ID which will toggle the menu when clicked.
      </p>
      <Row>
        <Col sm="4">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional content.
            </CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
        <Col sm="4">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional content.
            </CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
        <Col sm="4">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional content.
            </CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardContent
