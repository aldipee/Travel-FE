import React from 'react'
import { Switch, Route } from 'react-router-dom'

import StrictRoute from '../components/StrictRoute'
//Page Components
import AgentsPage from '../pages/admin/Agents'
import RoutesPage from '../pages/admin/Routes'
import EditRoutes from '../pages/admin/route/EditRoute'
import SchedulesPage from '../pages/admin/Schedules'
import ProfilePage from '../pages/admin/AdminProfile'
import BusSchedulesPage from '../pages/admin/Buses'
import UsersPage from '../pages/admin/Users'
import UserDetails from '../pages/admin/UserDetails'
import ReservationsPage from '../pages/admin/Reservations'
import ReservationsDetails from './admin/reservations/ReservationsDetail'
import Dashboard from '../pages/admin/Dashboard'

//
import Layout from '../pages/layout/Dashboard.layout'
import Logout from '../components/Logout'
import notFound from '../pages/NotFound'
const Home = (props) => {
  return (
    <>
      <Layout isAdmin={true}>
        <Switch>
          <StrictRoute component={Dashboard} path='/' exact />
          <StrictRoute component={AgentsPage} path='/agents' exact />
          <StrictRoute component={ProfilePage} path='/profile' exact />
          <StrictRoute component={ReservationsPage} path='/reservations' exact />
          <StrictRoute component={ReservationsDetails} path='/reservations/details/:id' exact />
          <StrictRoute component={RoutesPage} path='/routes' exact />
          <StrictRoute component={UsersPage} path='/users' exact />
          <StrictRoute component={UserDetails} path='/users/profile/:id' exact />
          <StrictRoute component={BusSchedulesPage} path='/buses' exact />
          <StrictRoute component={SchedulesPage} path='/schedules' exact />
          <StrictRoute component={EditRoutes} path='/routes/edit/:id' exact />
          <Logout exact path='/logout' />
          <Route component={notFound} />
        </Switch>
      </Layout>
    </>
  )
}

export default Home
