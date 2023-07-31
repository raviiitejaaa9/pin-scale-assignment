import {Component} from 'react'

class AllTransactions extends Component {
  state = {
    transactionsList: [],
  }

  render() {
    const {transactionsList} = this.state
    return (
      <div className="all-transactions-sec">
        <h1> All Transactions </h1>
        <ul className="transactions-list-container">
          <li> each Transactiom </li>
        </ul>
      </div>
    )
  }
}

export default AllTransactions
