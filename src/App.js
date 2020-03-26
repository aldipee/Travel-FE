import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from '../src/pages/Login'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/admin/Dashboard'
import AgentsPage from './pages/admin/Agents'
import RoutesPage from './pages/admin/Routes'
import EditRoutes from './pages/admin/EditRoute'

//Auth Provider
import AuthProvider from '../src/context/Auth'
import RoutesProvider from '../src/context/RouteContext'

const App = () => {
  return (
    <AuthProvider>
      <RoutesProvider>
        <Router>
          <Switch></Switch>
          <PrivateRoute component={Dashboard} path="/" exact />
          <PrivateRoute component={AgentsPage} path="/agents" exact />
          <PrivateRoute component={RoutesPage} path="/routes" exact />
          <PrivateRoute component={EditRoutes} path="/routes/edit/:id" exact />
          <Route exact path="/auth/login" render={props => <Login {...props} />} />
        </Router>
      </RoutesProvider>
    </AuthProvider>
  )
}
export default App
