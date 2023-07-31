import Popup from 'reactjs-popup'
import Cookie from 'js-cookie'
import {GrFormClose} from 'react-icons/gr'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const LogoutPopup = () => {
  const onLogout = () => {
    Cookie.remove('jwt_token')
    window.location.reload()
  }

  return (
    <div>
      <Popup
        modal
        trigger={<FiLogOut className="react-icon" onClick={onLogout} />}
      >
        {close => (
          <div className="logout-popup">
            <FiLogOut className="logout-icon" />
            <div className="logout-data">
              <h1> Are you Sure you want to logout </h1>
              <p> click yes to logout </p>
              <div className="logout-btns-container">
                <button
                  type="button"
                  className="logout-sec-btns yes-btn"
                  onClick={onLogout}
                >
                  {' '}
                  Yes, Logout{' '}
                </button>
                <button
                  type="button"
                  className="logout-sec-btns cancel-btn"
                  onClick={() => close()}
                >
                  {' '}
                  Cancel{' '}
                </button>
              </div>
            </div>
            <GrFormClose onClick={() => close()} className="cancel-icon" />
          </div>
        )}
      </Popup>
    </div>
  )
}

export default LogoutPopup
