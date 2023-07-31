import {Component} from 'react'
import Cookie from 'js-cookie'

import Navbar from '../Navbar'
import MobileNavbar from '../MobileNavbar'
import TransactionsHeader from '../TransactionsHeader'
import TransactionItem from '../TransactionItem'
import DashTransactionItem from '../DashTransactionItem'

import './index.css'

const apiConstants = {
  dashboard: 'DASHBOARD',
  allTransactions: 'all transactions',
  profile: 'PROFILE',
  debit: 'debit',
  credit: 'credit',
}

class AllTransactions extends Component {
  state = {
    transactionsList: [],
    selected: apiConstants.dashboard,
    currentUser: '',
    selectedView: apiConstants.allTransactions,
  }

  async componentDidMount() {
    const jwtToken = Cookie.get('jwt_token')
    let userRole
    if (jwtToken === '3') {
      userRole = 'admin'
    } else {
      userRole = 'user'
    }

    this.setState({currentUser: userRole})

    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0'

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

  onChangeNavItem = reqId => {
    this.setState({selected: apiConstants[reqId]})
  }

  changeList = value => {
    this.setState({selectedView: apiConstants[value]})
  }

  renderUserView = () => {
    const {transactionsList} = this.state
    return (
      <div className="all-transactions-sec">
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

  filteredList = () => {
    const {transactionsList, selectedView} = this.state
    const filteredList = transactionsList.filter(
      each => each.type === selectedView,
    )
    return filteredList
  }

  renderAdminView = () => {
    const {transactionsList, selectedView} = this.state
    let reqList = []
    if (selectedView !== 'all transactions') {
      reqList = this.filteredList()
    } else {
      reqList = transactionsList
    }
    return (
      <div className="all-transactions-sec">
        <ul className="admin-transactions-list-container">
          <li className="dash-list-item">
            <p className="para-el admin-transaction-name ">
              {' '}
              Transaction Name{' '}
            </p>
            <p className="para-el admin-transaction-para "> Category </p>
            <p className="para-el admin-transaction-para "> Date </p>
            <p className="para-el admin-amount "> Amount </p>
          </li>
          <hr className="hr-el" />
          {reqList.map(eachItem => (
            <DashTransactionItem key={eachItem.id} eachTransaction={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {selected, currentUser} = this.state

    return (
      <div className="app-container">
        <Navbar isSelected={selected} onChangeNavItem={this.onChangeNavItem} />
        <div className="app-sec">
          <MobileNavbar
            isSelected={selected}
            onChangeNavItem={this.onChangeNavItem}
          />
          <TransactionsHeader
            headerName="All Transactions"
            changeList={this.changeList}
          />
          {currentUser === 'user'
            ? this.renderUserView()
            : this.renderAdminView()}
        </div>
      </div>
    )
  }
}

export default AllTransactions
