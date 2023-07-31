import Cookie from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {Redirect} from 'react-router-dom'

import './index.css'

const Navbar = props => {
  const {isSelected, onChangeNavItem} = props

  // console.log(isSelected)
  // const dashboard = 'dashboard'
  const onLogout = () => {
    const {history} = props
    console.log(props)
    console.log(history)
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

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
      <ul className="navbar-items">
        <li className="list-items">
          <img
            src="https://sawn.org.uk/wp-content/uploads/2020/03/Money-Matters-Full-Colour-Logo.png"
            className="app-logo"
            alt="app-logo"
          />
        </li>
        <li className="list-items" onClick={onClickDashboard}>
          Dashboard
        </li>
        <li className="list-items" onClick={onClickTransactions}>
          All Transactions
        </li>
        <li className="list-items" onClick={onClickProfile}>
          Profile
        </li>
      </ul>
      <div className="nav-profile-sec">
        <img
          className="profile-img"
          alt="profile-img"
          src="https://thumbs.dreamstime.com/b/businesswoman-profile-icon-female-portrait-flat-design-vector-illustration-47075260.jpg"
        />
        <div className="name-email-container">
          <div className="name-logout-btn-container">
            <p> username </p>
            <FiLogOut className="react-icon" onClick={onLogout} />
          </div>
          <p> email@gmail.com </p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
