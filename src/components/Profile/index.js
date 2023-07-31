import {Component} from 'react'
import Cookie from 'js-cookie'
import Navbar from '../Navbar'
import Header from '../Header'

import './index.css'

const apiConstants = {
  dashboard: 'DASHBOARD',
  allTransactions: 'ALL TRANSACTIONS',
  profile: 'PROFILE',
}

class Profile extends Component {
  state = {
    userDetails: {},
    selected: apiConstants.dashboard,
  }

  async componentDidMount() {
    const profileUrl = 'https://bursting-gelding-24.hasura.app/api/rest/profile'
    const jwtToken = Cookie.get('jwt_token')
    let currentUser
    if (jwtToken === 3) {
      currentUser = 'admin'
    } else {
      currentUser = 'user'
    }

    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': currentUser,
        'x-hasura-user-id': jwtToken,
      },
    }
    const response = await fetch(profileUrl, options)

    if (response.ok) {
      const data = await response.json()

      const {users} = data
      const reqUserData = users[0]
      const modifiedUserDetails = {
        city: reqUserData.city,
        country: reqUserData.country,
        dateOfBirth: reqUserData.date_of_birth,
        email: reqUserData.email,
        id: reqUserData.id,
        name: reqUserData.name,
        permanentAddress: reqUserData.permanent_address,
        postalCode: reqUserData.postal_code,
        presentAddress: reqUserData.present_address,
      }

      this.onApiSuccess(modifiedUserDetails)
    } else {
      this.onApiFailure()
    }
  }

  onApiSuccess = data => {
    this.setState({userDetails: {...data}})
  }

  onApiFailure = () => {
    console.log('failure')
  }

  onChangeNavItem = reqId => {
    this.setState({selected: apiConstants[reqId]})
  }

  render() {
    const {userDetails, selected} = this.state
    const {
      city,
      country,
      dateOfBirth,
      email,
      name,
      permanentAddress,
      postalCode,
      presentAddress,
    } = userDetails

    return (
      <div className="app-container">
        <Navbar isSelected={selected} onChangeNavItem={this.onChangeNavItem} />
        <div className="app-sec">
          <Header headerName="Profile" />
          <div className="profile-container">
            <div className="profile-sec">
              <div className="profile-img-sec">
                <img
                  src="https://thumbs.dreamstime.com/b/businesswoman-profile-icon-female-portrait-flat-design-vector-illustration-47075260.jpg"
                  alt="display-pic"
                  className="display-pic"
                />
              </div>
              <div className="profile-input-el-sec">
                <div className="input-sec">
                  <label htmlFor="name" className="label-el">
                    {' '}
                    Name{' '}
                  </label>
                  <input
                    type="input"
                    className="input-el"
                    placeholder="name"
                    value={name}
                    id="name"
                  />
                </div>
                <div className="input-sec">
                  <label htmlFor="email" className="label-el">
                    {' '}
                    Email{' '}
                  </label>
                  <input
                    type="input"
                    className="input-el"
                    placeholder="Email"
                    value={email}
                    id="email"
                  />
                </div>
                <div className="input-sec">
                  <label htmlFor="dob" className="label-el">
                    {' '}
                    Date of Birth{' '}
                  </label>
                  <input
                    type="date"
                    className="input-el"
                    value={dateOfBirth}
                    id="dob"
                  />
                </div>
                <div className="input-sec">
                  <label htmlFor="address" className="label-el">
                    {' '}
                    Permanent Address{' '}
                  </label>
                  <input
                    type="input"
                    className="input-el"
                    placeholder="Permanent Address"
                    value={permanentAddress}
                    id="address"
                  />
                </div>
                <div className="input-sec">
                  <label htmlFor="pincode" className="label-el">
                    {' '}
                    Postal Code{' '}
                  </label>
                  <input
                    type="input"
                    className="input-el"
                    placeholder="Postal code"
                    value={postalCode}
                    id="pincode"
                  />
                </div>
              </div>

              <div className="profile-input-el-sec">
                <div className="input-sec">
                  <label htmlFor="username" className="label-el">
                    {' '}
                    Username{' '}
                  </label>
                  <input
                    type="input"
                    className="input-el"
                    placeholder="username"
                    value={name}
                    id="user"
                  />
                </div>
                <div className="input-sec">
                  <label htmlFor="password" className="label-el">
                    {' '}
                    Password{' '}
                  </label>
                  <input
                    type="password"
                    className="input-el"
                    placeholder="Password"
                    value="********"
                    id="password"
                  />
                </div>
                <div className="input-sec">
                  <label htmlFor="presentAddress" className="label-el">
                    {' '}
                    Present Address{' '}
                  </label>
                  <input
                    type="input"
                    className="input-el"
                    placeholder=" Present Address"
                    value={presentAddress}
                    id="presentAddress"
                  />
                </div>
                <div className="input-sec">
                  <label htmlFor="city" className="label-el">
                    {' '}
                    City{' '}
                  </label>
                  <input
                    type="input"
                    className="input-el"
                    placeholder="City"
                    value={city}
                    id="city"
                  />
                </div>
                <div className="input-sec">
                  <label htmlFor="country" className="label-el">
                    {' '}
                    Country{' '}
                  </label>
                  <input
                    type="input"
                    className="input-el"
                    placeholder="Country"
                    value={country}
                    id="country"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
