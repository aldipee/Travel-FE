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
const SidebarWrapper = Style('div')`
  background : #fff !important;
  border : none !important;
  z-index : 99;
  box-shadow: 2px 3px 7px rgba(66, 66, 66, 0.1) !important;
`
const Content = Style(Container)`
  background : #fcfcfc;

`
const DashboardLayout = props => {
  return (
    <div>
      <DashboardWrapper className="d-flex">
        <SidebarWrapper className="bg-light border-right" id="sidebar-wrapper">
          <SidebarHeading>Logo Here</SidebarHeading>
          <SidebarMenu isSuperAdmin={props.isAdmin} />
        </SidebarWrapper>
        <Content fluid={true} style={{ padding: 0 }}>
          <DashboardNavbar />
          {props.children}
          {/* <DashboardContent /> */}
        </Content>
      </DashboardWrapper>
    </div>
  )
}

export default DashboardLayout
