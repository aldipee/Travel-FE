import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'

import { AuthContext } from './context/Auth'
// Provider
import RoutesProvider from '../src/context/RouteContext'
import SchedulesProvider from '../src/context/SchedulesContext'
import AgentProvider from '../src/context/AgentContext'
import BusProvider from '../src/context/BusContext'
import ReservationsProvider from '../src/context/ReservationsContext'
import UsersProvider from '../src/context/UsersContext'
import Home from './pages/Home'
import Travel from './pages/Travel'
import Login from './pages/Login'
import notFound from './pages/NotFound'

const App = () => {
  const Auth = useContext(AuthContext)
  console.log('INI ROLE', Auth.role)
  return (
    <RoutesProvider>
      <SchedulesProvider>
        <AgentProvider>
          <BusProvider>
            <ReservationsProvider>
              <UsersProvider>
                <Router>
                  <Switch>
                    <Route
                      exact
                      path="/auth/login"
                      render={props => <Login {...props} />}
                    />
                    <PrivateRoute
                      component={Auth.role === 1 ? Home : Travel}
                      path="/"
                    />
                    <Route component={notFound} />
                  </Switch>
                </Router>
              </UsersProvider>
            </ReservationsProvider>
          </BusProvider>
        </AgentProvider>
      </SchedulesProvider>
    </RoutesProvider>
  )
}
export default App
