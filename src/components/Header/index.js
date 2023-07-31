import {withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import AddPopup from '../AddPopup'

import './index.css'

const Header = props => {
  const {headerName} = props

  const jwtToken = Cookie.get('jwt_token')
  let currentUser
  if (jwtToken === '3') {
    currentUser = 'admin'
  } else {
    currentUser = 'user'
  }
  let popupEl
  if (currentUser === 'user') {
    popupEl = <AddPopup />
  } else {
    popupEl = null
  }

  return (
    <div className="app-header">
      <h1 className="app-head"> {headerName} </h1>
      {popupEl}
    </div>
  )
}

export default withRouter(Header)
