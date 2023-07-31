import {Link} from 'react-router-dom'
import {AiFillHome, AiFillDollarCircle} from 'react-icons/ai'
import {BsFillPersonFill} from 'react-icons/bs'

import LogoutPopup from '../LogoutPopup'
import './index.css'

const Navbar = props => {
  const {onChangeNavItem} = props

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
              <div className="nav-icon-el-container">
                <AiFillHome className="nav-icons" />
                <p> Dashboard </p>
              </div>
            </li>
          </Link>
          <Link to="all-transactions" className="link-el">
            <li className="list-items" onClick={onClickTransactions}>
              <div className="nav-icon-el-container">
                <AiFillDollarCircle className="nav-icons" />
                <p> All Transactions </p>
              </div>
            </li>
          </Link>
          <Link to="/profile" className="link-el">
            <li className="list-items" onClick={onClickProfile}>
              <div className="nav-icon-el-container">
                <BsFillPersonFill className="nav-icons" />
                <p> Profile </p>
              </div>
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
