import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from '../src/pages/Login'
import Home from '../src/pages/Home'
import Dashboard from './pages/admin/Dashboard'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/auth/login" render={props => <Login {...props} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}
