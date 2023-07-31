import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import 'regenerator-runtime/runtime'

import Barchart from '../Barchart'

import './index.css'

class Dashboard extends Component {
  state = {
    creditBalance: 0,
    debitBalance: 0,
    lastThreeeTransactions: [],
    barDataList: [],
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
    // console.log(url)
    const transactionsResponse = await fetch(url)
    // console.log(transactionsResponse)

    const barDataUrl =
      'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days'
    const barOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': userRole,
        'x-hasura-user-id': jwtToken,
      },
    }
    const barResponse = await fetch(barDataUrl, barOptions)
    // console.log(barResponse)

    if (barResponse.ok) {
      const barData = await barResponse.json()
      // console.log(barData)
      const modifiedBarData = {
        last7Transactions: barData.last_7_days_transactions_credit_debit_totals,
      }
      // console.log(modifiedBarData)
      const {last7Transactions} = modifiedBarData
      this.onBarApiSuccess(last7Transactions)
    } else {
      this.onBarApiFailure()
    }
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

  onBarApiSuccess = data => {
    // console.log('barApiSuccess')
    // console.log(data)
    this.setState({barDataList: [...data]})
  }

  onBarApiFailure = () => {
    console.log('barApiFailure')
  }

  render() {
    const {creditBalance, debitBalance, barDataList} = this.state

    return (
      <div className="dashboard-container">
        <div className="debit-credit-sec">
          <div className="debit-credit-card">
            <div className="amount-sec">
              <h1> ${creditBalance} </h1>
              <p> Credit </p>
            </div>
            <img
              alt="credit-pic"
              className="money-img"
              src="https://img.freepik.com/free-vector/salary-difference-society-structure-hierarchy_107791-14023.jpg?w=1480&t=st=1690775866~exp=1690776466~hmac=2c773a3864bcb02e59ddf9c15da0cb3ec5471182f9c26aff9497233154fc9fb8"
            />
          </div>
          <div className="debit-credit-card">
            <div className="amount-sec">
              <h1> ${debitBalance} </h1>
              <p> Debit </p>
            </div>
            <img
              alt="debit-pic"
              className="money-img"
              src="https://img.freepik.com/free-vector/business-people-competitors-celebrating-success_3446-701.jpg?w=826&t=st=1690775874~exp=1690776474~hmac=8913163d7c65984bc5a1b75d0889fa724aba42b1a3e503eeef9aa47a015bca1c"
            />
          </div>
        </div>
        <div className="last-transactions-sec">
          <h1> Last Transactions </h1>
        </div>

        <div className="barchart-sec">
          <h1> Debit & Credit Overview </h1>
          <Barchart barDataList={barDataList} />
        </div>
      </div>
    )
  }
}

export default Dashboard
