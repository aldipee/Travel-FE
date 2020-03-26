import React from 'react'
import Style from 'styled-components'

// Dashboard Components
import SidebarMenu from '../../components/DashboardSidebar'
import DashboardNavbar from '../../components/DashboardNavbar'
// Pages

const PageContentWrapper = Style('div')``
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
          <SidebarHeading>LOGGGGGO</SidebarHeading>
          <SidebarMenu />
        </div>
        <PageContentWrapper>
          <DashboardNavbar />
          {props.children}
          {/* <DashboardContent /> */}
        </PageContentWrapper>
      </DashboardWrapper>
    </div>
  )
}

export default DashboardLayout
