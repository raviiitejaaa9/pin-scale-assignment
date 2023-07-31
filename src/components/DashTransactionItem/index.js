import {BiDownArrowCircle, BiUpArrowCircle} from 'react-icons/bi'
import './index.css'

const DashTransactionItem = props => {
  const {eachTransaction} = props
  const {transactionName, type, amount, category, date} = eachTransaction
  let amountEl
  let iconEl
  if (type === 'debit') {
    amountEl = <p className="para-el debit-transaction"> -{amount} </p>
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
        {iconEl}
        <p className="para-el"> {transactionName} </p>
        <p className="para-el"> {category} </p>
        <p className="para-el"> {formattedDate} </p>
        {amountEl}
      </li>
      <hr className="hr-el" />
    </>
  )
}

export default DashTransactionItem
