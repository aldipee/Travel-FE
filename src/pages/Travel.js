import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
//Page Components

import Dashboard from '../pages/admin/Dashboard'
import Buses from '../pages/agent/Buses'
import EditBus from '../pages/agent/BusEdit'
import DetailsBus from '../pages/agent/BusDetails'
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
          <PrivateRoute component={Buses} path="/buses" exact />
          <PrivateRoute component={EditBus} path="/buses/edit/:id" exact />
          <PrivateRoute
            component={DetailsBus}
            path="/buses/details/:id"
            exact
          />
          <Logout exact path="/logout" />
          <Route component={notFound} />
        </Switch>
      </Layout>
    </>
  )
}

export default Travel
