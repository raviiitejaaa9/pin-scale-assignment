import Cookie from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {Redirect, Link} from 'react-router-dom'

import LogoutPopup from '../LogoutPopup'
import './index.css'

const Navbar = props => {
  const {isSelected, onChangeNavItem} = props

  // console.log(isSelected)
  // const dashboard = 'dashboard'

  const onClickDashboard = () => {
    //  console.log(dashboard)
    onChangeNavItem('dashboard')
  }

  const onClickTransactions = () => {
    onChangeNavItem('allTransactions')
  }

  const onClickProfile = () => {
    onChangeNavItem('profile')
  }

  return (
    <nav className="vertical-navbar">
      <div className="nav-logo-list-sec">
        <img
          src="https://sawn.org.uk/wp-content/uploads/2020/03/Money-Matters-Full-Colour-Logo.png"
          className="app-logo"
          alt="app-logo"
        />
        <ul className="navbar-items">
          <Link to="/" className="link-el">
            <li className="list-items" onClick={onClickDashboard}>
              Dashboard
            </li>
          </Link>
          <Link to="all-transactions" className="link-el">
            <li className="list-items" onClick={onClickTransactions}>
              All Transactions
            </li>
          </Link>
          <Link to="/profile" className="link-el">
            <li className="list-items" onClick={onClickProfile}>
              Profile
            </li>
          </Link>
        </ul>
      </div>
      <div className="nav-profile-sec">
        <img
          className="profile-img"
          alt="profile-img"
          src="https://thumbs.dreamstime.com/b/businesswoman-profile-icon-female-portrait-flat-design-vector-illustration-47075260.jpg"
        />
        <div className="name-email-container">
          <div className="name-logout-btn-container">
            <p> username </p>
            <LogoutPopup />
          </div>
          <p> email@gmail.com </p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
