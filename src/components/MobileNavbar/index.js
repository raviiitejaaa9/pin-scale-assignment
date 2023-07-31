import {Link} from 'react-router-dom'
import {AiFillHome, AiFillDollarCircle} from 'react-icons/ai'
import {BsFillPersonFill} from 'react-icons/bs'
import LogoutPopup from '../LogoutPopup'
import './index.css'

const MobileNavbar = props => {
  const {onChangeNavItem} = props
  const onClickDashboard = () => {
    onChangeNavItem('dashboard')
  }

  const onClickTransactions = () => {
    onChangeNavItem('allTransactions')
  }

  const onClickProfile = () => {
    onChangeNavItem('profile')
  }

  return (
    <nav className="mobile-navbar">
      <div className="mobile-navbar-items">
        <Link to="/" className="link-el" onClick={onClickDashboard}>
          <AiFillHome className="nav-icons" />
        </Link>
        <Link
          to="all-transactions"
          className="link-el"
          onClick={onClickTransactions}
        >
          <AiFillDollarCircle className="nav-icons" />
        </Link>
        <Link to="/profile" className="link-el" onClick={onClickProfile}>
          <BsFillPersonFill className="nav-icons" />
        </Link>
        <LogoutPopup />
      </div>
    </nav>
  )
}

export default MobileNavbar
