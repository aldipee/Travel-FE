import React from 'react'
import { Container, Row, Col } from 'reactstrap'
// Components
import CardSummary from '../../components/dashboard/CardTotal'
import DashboardChart from '../../components/dashboard/DashboardChart'

const DashboardContent = (props) => {
  return (
    <Container fluid={true}>
      <h4 className='mt-3'>Simple Sidebar</h4>
      <p>The starting state of the menu will appear collapsed on smaller screens, and will appear</p>
      <Row>
        <CardSummary colSize={3} title='Total Reservations' total={302} backgroundColor={'0061f2'} />
        <CardSummary colSize={3} title='Total Routes' total={22} backgroundColor={'f4a100'} />
        <CardSummary colSize={3} title='Total Agents' total={9} backgroundColor={'e81500'} />
        <CardSummary colSize={3} title='Total Agents' total={9} backgroundColor={'e81500'} />
      </Row>
      <Row>
        <Col md={8} className='mt-4 mb-3'>
          <DashboardChart />
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  )
}

export default DashboardContent
