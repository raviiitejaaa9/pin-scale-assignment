import {BiDownArrowCircle, BiUpArrowCircle} from 'react-icons/bi'

import UpdatePopup from '../UpdatePopup'
import DeletePopup from '../DeletePopup'
import './index.css'

const TransactionItem = props => {
  const {eachTransaction} = props
  const {id, transactionName, type, amount, category, date} = eachTransaction
  let amountEl
  let iconEl
  if (type === 'debit') {
    amountEl = <p className="para-el debit-transaction  "> -{amount} </p>
    iconEl = <BiDownArrowCircle className="debit-transaction icons" />
  } else {
    amountEl = <p className="para-el credit-transaction"> +{amount}</p>
    iconEl = <BiUpArrowCircle className="credit-transaction icons" />
  }

  const selectedDate = new Date(date)

  const options = {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const formattedDate = selectedDate.toLocaleString('en-US', options)

  return (
    <>
      <li className="dash-list-item">
        <div className="transaction-name-sec transaction-name">
          {iconEl}
          <p className="para-el  "> {transactionName} </p>
        </div>
        <p className="para-el transaction-para "> {category} </p>
        <p className="para-el transaction-para "> {formattedDate} </p>
        <div className="amount">
          {amountEl}
          <div className="icons-container">
            <UpdatePopup id={id} />
            <DeletePopup id={id} />
          </div>
        </div>
      </li>
      <hr className="hr-el" />
    </>
  )
}

export default TransactionItem
