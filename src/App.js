import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import DashBoard from './components/Dashboard'
import AllTransactions from './components/AllTransactions'
import Profile from './components/Profile'
import NotFound from './components/NotFound'

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
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
