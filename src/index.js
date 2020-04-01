import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import AuthProvider from '../src/context/Auth'

//Redux
import { store, pesistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={pesistor}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// if (module.hot) {
//   module.hot.accept()
// }
// serviceWorker.unregister()
