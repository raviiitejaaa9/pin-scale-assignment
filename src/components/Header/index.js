import AddPopup from '../AddPopup'

const Header = props => {
  const {headerName} = props
  let head
  if (headerName === 'DASHBOARD') {
    head = 'Accounts'
  } else if (headerName === 'PROFILE') {
    head = 'Profile'
  } else {
    head = 'All Transactions'
  }

  return (
    <div className="app-header">
      <h1 className="app-head"> {headerName} </h1>
      <AddPopup />
    </div>
  )
}

export default Header
