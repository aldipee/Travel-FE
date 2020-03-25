import React from 'react'
import Style from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import DashboardContent from '../../components/DashboardContent'
import DashboardNavbar from '../../components/DashboardNavbar'
import SidebarMenu from '../../components/DashboardSidebar'

import DashboardPage from '../../components/DashboardContent'
import AgentsPage from './Agents'
import RoutesPage from './Routes'

const PageContentWrapper = Style('div')``
const DashboardWrapper = Style('div')``
const SidebarHeading = Style('div')`
padding: 0.875rem 1.25rem;
font-size: 1.2rem;
`

const routes = [
  { path: '/dashboard', exact: true, main: () => <DashboardPage /> },
  { path: '/agents', main: () => <AgentsPage /> },
  { path: '/routes', main: () => <RoutesPage /> }
]

const Dashboard = () => {
  return (
    <Router>
      <DashboardWrapper className="d-flex">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <SidebarHeading>LOGGGGGO</SidebarHeading>
          <SidebarMenu />
        </div>

        <PageContentWrapper>
          <DashboardNavbar />
          {routes.map(route => (
            <Route key={route.path} path={route.path} exact={route.exact} component={route.main} />
          ))}
          {/* <DashboardContent /> */}
        </PageContentWrapper>
      </DashboardWrapper>
    </Router>
  )
}

export default Dashboard
