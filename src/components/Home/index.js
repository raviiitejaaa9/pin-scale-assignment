import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookie from 'js-cookie'

import Navbar from '../Navbar'
import Dashboard from '../Dashboard'
import AllTransactions from '../AllTransactions'
import Profile from '../Profile'
import AddPopup from '../AddPopup'

import './index.css'

const apiConstants = {
  dashboard: 'DASHBOARD',
  allTransactions: 'ALL TRANSACTIONS',
  profile: 'PROFILE',
}

class Home extends Component {
  state = {
    selected: apiConstants.dashboard,
  }

  onChangeNavItem = reqId => {
    // console.log(reqId)
    // console.log('triggered')
    this.setState({selected: apiConstants[reqId]})
  }

  displayComponent = () => {
    const {selected} = this.state
    switch (selected) {
      case apiConstants.dashboard:
        return <Dashboard />
      case apiConstants.allTransactions:
        return <AllTransactions />
      case apiConstants.profile:
        return <Profile />
      default:
        return null
    }
  }

  render() {
    const {selected} = this.state
    // console.log(transactionName, transactionType, category, amount, date)
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect path="/login" />
    }
    return (
      <div className="app-container">
        <Navbar isSelected={selected} onChangeNavItem={this.onChangeNavItem} />
        <div className="app-sec">
          <div className="app-header">
            <h1 className="app-head"> Accounts </h1>
            <AddPopup />
          </div>
          {this.displayComponent()}
        </div>
      </div>
    )
  }
}

export default Home
