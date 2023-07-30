import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import 'regenerator-runtime/runtime'

import './index.css'

class Dashboard extends Component {
  state = {
    creditBalance: 0,
    debitBalance: 0,
    lastThreeeTransactions: [],
  }

  async componentDidMount() {
    const apiUrl =
      'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals'
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

    const response = await fetch(apiUrl, options)
    // console.log(response)

    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const modifiedData = {
        creditDebitTransactions: data.totals_credit_debit_transactions,
      }
      // console.log(modifiedData)
      const {creditDebitTransactions} = modifiedData
      // console.log(creditDebitTransactions)
      this.onSuccess(creditDebitTransactions)
    } else {
      this.onFailure()
    }

    const threeTransactionsUrl =
      'https://bursting-gelding-24.hasura.app/api/rest/all-transactions'
    const limit = 3
    const offset = 0
    const url = `${apiUrl}?limit=${limit}&offset=${offset}`
    console.log(url)
    const transactionsResponse = await fetch(url)
    console.log(transactionsResponse)
  }

  onSuccess = data => {
    // console.log('success')
    // console.log(data)
    let debitAmount = 0
    let creditAmount = 0
    const eachList = data.map(each => {
      if (each.type === 'debit') {
        debitAmount += each.sum
      } else {
        creditAmount += each.sum
      }
      return null
    })
    this.setState({
      debitBalance: debitAmount,
      creditBalance: creditAmount,
    })
  }

  onFailure = () => {
    console.log('failure')
  }

  render() {
    const {creditBalance, debitBalance} = this.state

    return (
      <div className="dashboard-container">
        <div className="debit-credit-sec">
          <div className="debit-credit-card">
            <div className="amount-sec">
              <h1> ${creditBalance} </h1>
              <p> Credit </p>
            </div>
            <img alt="credit-pic" className="money-img" src="" />
          </div>
          <div className="debit-credit-card">
            <div className="amount-sec">
              <h1> ${debitBalance} </h1>
              <p> Debit </p>
            </div>
            <img alt="debit-pic" className="money-img" src="" />
          </div>
        </div>
        <div className="last-transactions-sec">
          <h1> </h1>
        </div>
      </div>
    )
  }
}

export default Dashboard
