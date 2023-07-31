import {Component} from 'react'
import Cookie from 'js-cookie'

import Navbar from '../Navbar'
import MobileNavbar from '../MobileNavbar'
import Header from '../Header'
import UserLastTransactions from '../UserLastTransactions'
import Barchart from '../Barchart'
import ErrorPage from '../ErrorPage'
import LoadingPage from '../LoadingPage'

import './index.css'

const apiConstants = {
  dashboard: 'DASHBOARD',
  allTransactions: 'ALL TRANSACTIONS',
  profile: 'PROFILE',
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Dashboard extends Component {
  state = {
    creditBalance: 0,
    debitBalance: 0,
    barDataList: [],
    selected: apiConstants.dashboard,
    creditDebitTotalStatus: apiConstants.initial,

    barDataStatus: apiConstants.initial,
  }

  async componentDidMount() {
    const userUrl =
      'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals'
    const adminUrl =
      'https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin'
    const jwtToken = Cookie.get('jwt_token')
    let currentUser
    if (jwtToken === '3') {
      currentUser = 'admin'
    } else {
      currentUser = 'user'
    }

    const userOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': currentUser,
        'x-hasura-user-id': jwtToken,
      },
    }

    const adminOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': currentUser,
      },
    }

    let response = {}
    this.setState({
      creditDebitTotalStatus: apiConstants.loading,
      barDataStatus: apiConstants.loading,
    })

    if (currentUser === 'user') {
      response = await fetch(userUrl, userOptions)
    } else {
      response = await fetch(adminUrl, adminOptions)
    }
    this.setState({
      creditDebitTotalStatus: apiConstants.loading,
      barDataStatus: apiConstants.loading,
    })

    if (response.ok) {
      const data = await response.json()
      let modifiedData = {}
      if (currentUser === 'user') {
        modifiedData = {
          creditDebitTransactions: data.totals_credit_debit_transactions,
        }
      } else {
        modifiedData = {
          creditDebitTransactions: data.transaction_totals_admin,
        }
      }
      const {creditDebitTransactions} = modifiedData
      this.onSuccess(creditDebitTransactions)
    } else {
      this.onFailure()
    }

    const adminBarDataUrl =
      'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin'

    const userBarDataUrl =
      'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days'

    let barResponse = {}
    if (currentUser === 'user') {
      barResponse = await fetch(userBarDataUrl, userOptions)
    } else {
      barResponse = await fetch(adminBarDataUrl, adminOptions)
    }

    if (barResponse.ok) {
      const barData = await barResponse.json()
      let modifiedBarData = {}
      if (currentUser === 'user') {
        modifiedBarData = {
          last7Transactions:
            barData.last_7_days_transactions_credit_debit_totals,
        }
      } else {
        modifiedBarData = {
          last7Transactions: barData.last_7_days_transactions_totals_admin,
        }
      }
      const {last7Transactions} = modifiedBarData
      this.onBarApiSuccess(last7Transactions)
    } else {
      this.onBarApiFailure()
    }
  }

  onSuccess = data => {
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
    console.log(eachList)
    this.setState({
      debitBalance: debitAmount,
      creditBalance: creditAmount,
      creditDebitTotalStatus: apiConstants.success,
    })
  }

  onFailure = () => {
    console.log('failure')
    this.setState({
      creditDebitTotalStatus: apiConstants.failure,
    })
  }

  onBarApiSuccess = data => {
    this.setState({
      barDataList: [...data],
      barDataStatus: apiConstants.success,
    })
  }

  onBarApiFailure = () => {
    console.log('barApiFailure')
    this.setState({barDataStatus: apiConstants.failure})
  }

  onChangeNavItem = reqId => {
    this.setState({selected: apiConstants[reqId]})
  }

  barChartSuccessView = () => {
    const {barDataList} = this.state
    return (
      <div className="barchart-sec">
        <h1> Debit & Credit Overview </h1>
        <Barchart barDataList={barDataList} />
      </div>
    )
  }

  renderBarChartView = () => {
    const {barDataStatus} = this.state
    switch (barDataStatus) {
      case apiConstants.success:
        return this.barChartSuccessView()
      case apiConstants.loading:
        return <LoadingPage />
      case apiConstants.failure:
        return <ErrorPage />
      default:
        return null
    }
  }

  renderTotalAmountSuccessView = () => {
    const {creditBalance, debitBalance} = this.state
    return (
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
    )
  }

  renderTotalView = () => {
    const {creditDebitTotalStatus} = this.state
    switch (creditDebitTotalStatus) {
      case apiConstants.success:
        return this.renderTotalAmountSuccessView()
      case apiConstants.loading:
        return <LoadingPage />
      case apiConstants.failure:
        return <ErrorPage />
      default:
        return null
    }
  }

  render() {
    const {selected} = this.state

    return (
      <div className="app-container">
        <Navbar isSelected={selected} onChangeNavItem={this.onChangeNavItem} />

        <div className="app-sec">
          <MobileNavbar
            isSelected={selected}
            onChangeNavItem={this.onChangeNavItem}
          />
          <Header headerName="Accounts" />
          <div className="dashboard-container">
            {this.renderTotalView()}
            <UserLastTransactions />
            {this.renderBarChartView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
