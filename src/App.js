import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from '../src/pages/Login'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/admin/Dashboard'
import AgentsPage from './pages/admin/Agents'
import RoutesPage from './pages/admin/Routes'
import EditRoutes from './pages/admin/EditRoute'
import SchedulesPage from './pages/admin/Schedules'

//Auth Provider
import AuthProvider from '../src/context/Auth'
import RoutesProvider from '../src/context/RouteContext'
import SchedulesProvider from '../src/context/SchedulesContext'

const App = () => {
  return (
    <AuthProvider>
      <RoutesProvider>
        <SchedulesProvider>
          <Router>
            <Switch></Switch>
            <PrivateRoute component={Dashboard} path="/" exact />
            <PrivateRoute component={AgentsPage} path="/agents" exact />
            <PrivateRoute component={RoutesPage} path="/routes" exact />
            <PrivateRoute component={SchedulesPage} path="/schedules" exact />
            <PrivateRoute component={EditRoutes} path="/routes/edit/:id" exact />
            <Route exact path="/auth/login" render={props => <Login {...props} />} />
          </Router>
        </SchedulesProvider>
      </RoutesProvider>
    </AuthProvider>
  )
}
export default App
