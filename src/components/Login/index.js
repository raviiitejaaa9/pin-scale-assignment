import {Component} from 'react'
import Cookie from 'js-cookie'
import {Link} from 'react-router-dom'
// import axios from 'axios'

import './index.css'

const userDetails = [
  {
    email: 'admin@gmail.com',
    password: 'Admin@123',
    userId: 3,
  },
  {
    email: 'jane.doe@gmail.com',
    password: 'janedoe@123',
    userId: 1,
  },
  {
    email: 'samsmith@gmail.com',
    password: 'samsmith@123',
    userId: 2,
  },
  {
    email: 'rahul@gmail.com',
    password: 'rahul@123',
    userId: 4,
  },
  {
    email: 'teja@gmail.com',
    password: 'teja@123',
    userId: 5,
  },
  {
    email: 'loki@gmail.com',
    password: 'loki@123',
    userId: 6,
  },
  {
    email: 'ramesh@gmail.com',
    password: 'ramesh@123',
    userId: 7,
  },
  {
    email: 'suresh@gmail.com',
    password: 'suresh@123',
    userId: 8,
  },
  {
    email: 'prem@gmail.com',
    password: 'prem@123',
    userId: 9,
  },
  {
    email: 'piyush@gmail.com',
    password: 'piyush@123',
    userId: 10,
  },
  {
    email: 'isha@gmail.com',
    password: 'isha@123',
    userId: 12,
  },
  {
    email: 'seema@gmail.com',
    password: 'seema@123',
    userId: 14,
  },
  {
    email: 'seema@123',
    password: 'arjun@123',
    userId: 15,
  },
  {
    email: 'radha@gmail.com',
    password: 'radha@123',
    userId: 16,
  },
  {
    email: 'phani@gmail.com',
    password: 'phani@123',
    userId: 17,
  },
]

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitFailure = msg => {
    this.setState({errorMsg: msg})
  }

  onSubmitSuccess = user => {
    const {history} = this.props
    this.setState({errorMsg: 'log in successful'})
    // console.log(user)
    Cookie.set('jwt_token', user.userId, {sameSite: 'none', secure: true})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    console.log('submit triggered')
    const {username, password} = this.state
    // console.log(username)
    // const user = {username, password}
    const apiUrl = 'https://bursting-gelding-24.hasura.app/api/rest/get-user-id'

    const userInfo = {
      email: username,
      password,
    }

    const headers = {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret':
        'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
      'x-hasura-role': 'user',
    }

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
      },
    }

    console.log(userInfo)

    const response = await fetch(apiUrl, options)
    console.log(response)

    const reqUser = userDetails.filter(eachUser => eachUser.email === username)
    if (reqUser.length === 0) {
      const msg = 'username is wrong'
      this.onSubmitFailure(msg)
    } else {
      const user = reqUser[0]
      if (user.password !== password) {
        const msg = 'password is wrong'
        this.onSubmitFailure(msg)
      } else {
        this.onSubmitSuccess(user)
      }
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state

    return (
      <div className="login-page">
        <img
          src="https://res.cloudinary.com/dyukfze9f/image/upload/v1690628975/Money_Matters_hgn180.png"
          alt="logo"
          className="logo-image"
        />
        <form onSubmit={this.onSubmitForm} className="login-form">
          <div className="input-el-container">
            <label htmlFor="user" className="label-el">
              {' '}
              Username{' '}
            </label>
            <input
              value={username}
              type="input"
              placeholder="Username"
              id="user"
              onChange={this.onChangeUsername}
              className="input-el"
            />
          </div>
          <div className="input-el-container">
            <label htmlFor="password" className="label-el">
              {' '}
              Password{' '}
            </label>
            <input
              value={password}
              type="password"
              placeholder="Password"
              id="password"
              onChange={this.onChangePassword}
              className="input-el"
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="login-btn">
              {' '}
              Sign in{' '}
            </button>
          </div>
          <p className="error-msg"> {errorMsg} </p>
        </form>
      </div>
    )
  }
}

export default Login
