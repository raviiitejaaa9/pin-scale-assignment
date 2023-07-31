import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import DashBoard from './components/Dashboard'
import AllTransactions from './components/AllTransactions'
import Profile from './components/Profile'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={DashBoard} />
    <ProtectedRoute
      exact
      path="/all-transactions"
      component={AllTransactions}
    />
    <ProtectedRoute exact path="/profile" component={Profile} />
  </Switch>
)

export default App
