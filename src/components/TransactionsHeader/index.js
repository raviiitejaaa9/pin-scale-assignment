import Cookie from 'js-cookie'
import AddPopup from '../AddPopup'

import './index.css'

const TransactionsHeader = props => {
  const {headerName, changeList} = props

  const jwtToken = Cookie.get('jwt_token')
  let currentUser
  if (jwtToken === '3') {
    currentUser = 'admin'
  } else {
    currentUser = 'user'
  }

  const onClickAllTransactions = () => {
    changeList('allTransactions')
  }

  const onClickDebit = () => {
    changeList('debit')
  }

  const onClickCredit = () => {
    changeList('credit')
  }

  let popupEl
  let ulElement
  let styleEl
  if (currentUser === 'user') {
    popupEl = <AddPopup />
    ulElement = null
    styleEl = 'app-header'
  } else {
    popupEl = null
    ulElement = (
      <ul className="transactions-view">
        <li className="view-list-item" onClick={onClickAllTransactions}>
          {' '}
          All Transactions{' '}
        </li>
        <li className="view-list-item" onClick={onClickDebit}>
          {' '}
          Debit{' '}
        </li>
        <li className="view-list-item" onClick={onClickCredit}>
          {' '}
          Credit{' '}
        </li>
      </ul>
    )
    styleEl = 'app-header  admin-app-header'
  }

  return (
    <div className={styleEl}>
      <h1 className="app-head"> {headerName} </h1>
      {popupEl}
      {ulElement}
    </div>
  )
}

export default TransactionsHeader
