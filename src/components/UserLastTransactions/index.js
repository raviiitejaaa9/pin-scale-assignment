import {Component} from 'react'
import Cookie from 'js-cookie'
import DashTransactionItem from '../DashTransactionItem'

import './index.css'
import LoadingPage from '../LoadingPage'
import ErrorPage from '../ErrorPage'

const apiConstants = {
  dashboard: 'DASHBOARD',
  allTransactions: 'ALL TRANSACTIONS',
  profile: 'PROFILE',
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class UserLastTransactions extends Component {
  state = {
    last3Transactions: [],
    last3TransactionsStatus: apiConstants.initial,
  }

  async componentDidMount() {
    const jwtToken = Cookie.get('jwt_token')
    let userRole
    if (jwtToken === 3) {
      userRole = 'admin'
    } else {
      userRole = 'user'
    }

    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&offset=0'
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
    this.setState({
      last3TransactionsStatus: apiConstants.loading,
    })
    const response = await fetch(url, options)

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
    this.setState({
      last3Transactions: [...modifiedList],
      last3TransactionsStatus: apiConstants.success,
    })
  }

  onApiCallFailure = () => {
    console.log('failure')
    this.setState({
      last3TransactionsStatus: apiConstants.failure,
    })
  }

  renderSuccessView = () => {
    const {last3Transactions} = this.state
    return (
      <div className="dash-transactions-sec">
        <h1> Last Transaction </h1>
        <ul className="dash-transaction-list">
          {last3Transactions.map(eachItem => (
            <DashTransactionItem key={eachItem.id} eachTransaction={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderView = () => {
    const {last3TransactionsStatus} = this.state
    switch (last3TransactionsStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.loading:
        return <LoadingPage />
      case apiConstants.failure:
        return <ErrorPage />
      default:
        return null
    }
  }

  render() {
    return this.renderView()
  }
}

export default UserLastTransactions
