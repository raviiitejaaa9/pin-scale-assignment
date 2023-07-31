import {Component} from 'react'
import Cookie from 'js-cookie'
import TransactionItem from '../TransactionItem'

import './index.css'

class AllTransactions extends Component {
  state = {
    transactionsList: [],
  }

  async componentDidMount() {
    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0'
    const jwtToken = Cookie.get('jwt_token')
    let userRole
    if (jwtToken === 3) {
      userRole = 'admin'
    } else {
      userRole = 'user'
    }
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': userRole,
        'x-hasura-user-id': jwtToken,
      },
    }
    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      const {transactions} = data
      this.onApiCallSuccess(transactions)
    } else {
      this.onApiCallFailure()
    }
  }

  onApiCallSuccess = data => {
    const modifiedList = data.map(each => ({
      id: each.id,
      amount: each.amount,
      category: each.category,
      date: each.date,
      userId: each.user_id,
      transactionName: each.transaction_name,
      type: each.type,
    }))
    this.setState({transactionsList: [...modifiedList]})
  }

  onApiCallFailure = () => {
    console.log('failure')
  }

  render() {
    const {transactionsList} = this.state
    console.log(transactionsList)
    return (
      <div className="all-transactions-sec">
        <h1> All Transactions </h1>
        <ul className="transactions-list-container">
          <li className="dash-list-item">
            <p className="para-el transaction-name "> Transaction Name </p>
            <p className="para-el transaction-para "> Category </p>
            <p className="para-el transaction-para "> Date </p>
            <p className="para-el amount "> Amount </p>
          </li>
          <hr className="hr-el" />
          {transactionsList.map(eachItem => (
            <TransactionItem key={eachItem.id} eachTransaction={eachItem} />
          ))}
        </ul>
      </div>
    )
  }
}

export default AllTransactions
