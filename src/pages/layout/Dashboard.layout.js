import React, { useContext } from 'react'
import Style from 'styled-components'
import { Container } from 'reactstrap'

// Dashboard Components
import SidebarMenu from '../../components/DashboardSidebar'
import DashboardNavbar from '../../components/DashboardNavbar'

// Pages

const DashboardWrapper = Style('div')``
const SidebarHeading = Style('div')`
padding: 0.875rem 1.25rem;
font-size: 1.2rem;
`

const DashboardLayout = props => {
  return (
    <div>
      <DashboardWrapper className="d-flex">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <SidebarHeading>Logo Here</SidebarHeading>
          <SidebarMenu isSuperAdmin={props.isAdmin} />
        </div>
        <Container fluid={true} style={{ padding: 0 }}>
          <DashboardNavbar />
          {props.children}
          {/* <DashboardContent /> */}
        </Container>
      </DashboardWrapper>
    </div>
  )
}

export default DashboardLayout
