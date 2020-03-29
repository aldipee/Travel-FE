import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from '../src/pages/Login'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/admin/Dashboard'
import AgentsPage from './pages/admin/Agents'
import RoutesPage from './pages/admin/Routes'
import EditRoutes from './pages/admin/EditRoute'
import SchedulesPage from './pages/admin/Schedules'
import ProfilePage from './pages/admin/AdminProfile'
import BusSchedulesPage from './pages/admin/Buses'
import UsersPage from './pages/admin/Users'
import UserDetails from './pages/admin/UserDetails'
import ReservationsPage from './pages/admin/Reservations'
import ReservationsDetails from './pages/admin/ReservationsDetail'

//Auth Provider
import AuthProvider from '../src/context/Auth'
import RoutesProvider from '../src/context/RouteContext'
import SchedulesProvider from '../src/context/SchedulesContext'
import AgentProvider from '../src/context/AgentContext'
import BusProvider from '../src/context/BusContext'
import ReservationsProvider from '../src/context/ReservationsContext'

const App = () => {
  return (
    <AuthProvider>
      <RoutesProvider>
        <SchedulesProvider>
          <AgentProvider>
            <BusProvider>
              <ReservationsProvider>
                <Router>
                  <Switch>
                    <PrivateRoute component={Dashboard} path="/" exact />
                    <PrivateRoute component={AgentsPage} path="/agents" exact />
                    <PrivateRoute component={ProfilePage} path="/profile" exact />
                    <PrivateRoute component={ReservationsPage} path="/reservations" exact />
                    <PrivateRoute component={ReservationsDetails} path="/reservations/details/:id" exact />
                    <PrivateRoute component={RoutesPage} path="/routes" exact />
                    <PrivateRoute component={UsersPage} path="/users" exact />
                    <PrivateRoute component={UserDetails} path="/users/profile/:id" exact />
                    <PrivateRoute component={BusSchedulesPage} path="/buses" exact />
                    <PrivateRoute component={SchedulesPage} path="/schedules" exact />
                    <PrivateRoute component={EditRoutes} path="/routes/edit/:id" exact />
                    <Route exact path="/auth/login" render={props => <Login {...props} />} />
                  </Switch>
                </Router>
              </ReservationsProvider>
            </BusProvider>
          </AgentProvider>
        </SchedulesProvider>
      </RoutesProvider>
    </AuthProvider>
  )
}
export default App
