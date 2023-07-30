import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
  </Switch>
)

export default App
