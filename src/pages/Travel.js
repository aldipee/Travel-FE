import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
//Page Components

import Dashboard from '../pages/admin/Dashboard'
import Buses from '../pages/agent/Buses'
import EditBus from '../pages/agent/BusEdit'
import DetailsBus from '../pages/agent/BusDetails'
import Schedules from '../pages/agent/Schedules'
import AddSchedules from '../pages/agent/AddSchedules'
import EditSchedules from '../pages/agent/EditSchedules'
import Reservations from '../pages/agent/Reservations'
import ReservationDetails from '../pages/admin/ReservationsDetail'
import Profile from '../pages/agent/Profile'
//
import Layout from '../pages/layout/Dashboard.layout'
import Logout from '../components/Logout'
import notFound from '../pages/NotFound'
const Travel = props => {
  return (
    <>
      <Layout isAdmin={false}>
        <Switch>
          <PrivateRoute component={Dashboard} path="/" exact />
          <PrivateRoute component={Profile} path="/profile" exact />
          <PrivateRoute component={Reservations} path="/reservations" exact />
          <PrivateRoute component={ReservationDetails} path="/reservations/details/:id" exact />
          <PrivateRoute component={Reservations} path="/reservations" exact />
          <PrivateRoute component={Schedules} path="/schedules" exact />
          <PrivateRoute component={AddSchedules} path="/schedules/add" exact />
          <PrivateRoute component={EditSchedules} path="/schedules/edit/:id" exact />
          <PrivateRoute component={Buses} path="/buses" exact />
          <PrivateRoute component={Buses} path="/buses" exact />
          <PrivateRoute component={EditBus} path="/buses/edit/:id" exact />
          <PrivateRoute component={DetailsBus} path="/buses/details/:id" exact />
          <Logout exact path="/logout" />
          <Route component={notFound} />
        </Switch>
      </Layout>
    </>
  )
}

export default Travel
