import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const Auth = useContext(AuthContext)
  localStorage.removeItem('token_user')
  localStorage.removeItem('role')
  Auth.Logout()
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props => <Redirect to={{ pathname: '/auth/login' }} />}
    />
  )
}
export default PrivateRoute
