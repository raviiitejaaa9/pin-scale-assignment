import {Component} from 'react'
import Cookie from 'js-cookie'
import {GrFormClose} from 'react-icons/gr'

class AddTransactionForm extends Component {
  state = {
    transactionName: '',
    transactionType: '',
    category: '',
    amount: '',
    date: '',
  }

  onChangeTransactionName = event => {
    this.setState({transactionName: event.target.value})
  }

  onChangeTransactionType = event => {
    this.setState({transactionType: event.target.value})
  }

  onChangeCategory = event => {
    this.setState({category: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeDate = event => {
    const date = event.target.value
    const formattedDate = new Date(date).toISOString()
    this.setState({date: formattedDate})
  }

  onAddSuccess = () => {
    console.log('success')
  }

  onAddFailure = () => {
    console.log('failure')
  }

  onAddTransaction = async event => {
    const {
      transactionName,
      transactionType,
      category,
      amount,
      date,
    } = this.state
    const {close} = this.props
    event.preventDefault()

    const addApiUrl =
      'https://bursting-gelding-24.hasura.app/api/rest/add-transaction'
    const jwtToken = Cookie.get('jwt_token')
    let currentUser
    if (jwtToken === 3) {
      currentUser = 'admin'
    } else {
      currentUser = 'user'
    }

    const postBody = {
      name: transactionName,
      type: transactionType,
      category,
      amount,
      date,
      user_id: jwtToken,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': currentUser,
        'x-hasura-user-id': jwtToken,
      },
      body: JSON.stringify(postBody),
    }

    const response = await fetch(addApiUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.onAddSuccess()
    } else {
      this.onAddFailure()
    }
    close()
    window.location.reload()
  }

  render() {
    const {
      transactionName,
      transactionType,
      category,
      amount,
      date,
    } = this.state
    const {close} = this.props
    return (
      <form onSubmit={this.onAddTransaction} className="add-transaction-form">
        <div className="transaction-head-sec">
          <h1> Add Transaction </h1>
          <GrFormClose onClick={() => close()} />
        </div>
        <p> You can add your Transactions here </p>
        <div className="input-sec">
          <label htmlFor="transactionName" className="label-el">
            {' '}
            Transaction Name{' '}
          </label>
          <input
            type="input"
            className="input-el"
            placeholder="Enter Name"
            value={transactionName}
            id="transactionName"
            onChange={this.onChangeTransactionName}
          />
        </div>
        <div className="input-sec">
          <label htmlFor="transactionType"> Transaction Type </label>
          <select
            name="type"
            value={transactionType}
            required
            className="input-el select-el"
            onChange={this.onChangeTransactionType}
            id="transactionType"
          >
            <option value="" hidden disabled>
              Select transaction type
            </option>
            <option value="debit"> Debit </option>
            <option value="credit"> Credit </option>
          </select>
        </div>
        <div className="input-sec">
          <label htmlFor="category"> Category </label>
          <select
            name="type"
            value={category}
            required
            className="input-el select-el"
            id="category"
            onChange={this.onChangeCategory}
          >
            <option value="" hidden disabled>
              Select
            </option>
            <option value="" hidden disabled>
              Select category
            </option>
            <option value="entertainment">Entertainment</option>
            <option value="food">Food</option>
            <option value="shopping">Shopping</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>
        <div className="input-sec">
          <label htmlFor="amount" className="label-el">
            {' '}
            Amount{' '}
          </label>
          <input
            type="input"
            className="input-el"
            placeholder="Enter Amount"
            value={amount}
            id="amount"
            onChange={this.onChangeAmount}
          />
        </div>
        <div className="input-sec">
          <label htmlFor="date" className="label-el">
            {' '}
            Date{' '}
          </label>
          <input
            type="datetime-local"
            className="input-el"
            value={date}
            id="date"
            onChange={this.onChangeDate}
          />
        </div>
        <button className="add-transaction" type="submit">
          {' '}
          Add Transaction{' '}
        </button>
      </form>
    )
  }
}

export default AddTransactionForm
