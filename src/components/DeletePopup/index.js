import Popup from 'reactjs-popup'
import {GrFormClose} from 'react-icons/gr'
import {RiDeleteBinLine} from 'react-icons/ri'
import Cookie from 'js-cookie'
import {BiError} from 'react-icons/bi'

const DeletePopup = prop => {
  const {id} = prop
  const onDelete = async () => {
    const jwtToken = Cookie.get('jwt_token')
    let currentUser
    if (jwtToken === 3) {
      currentUser = 'admin'
    } else {
      currentUser = 'user'
    }
    const bodyId = {id}

    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/delete-transaction'
    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': currentUser,
        'x-hasura-user-id': jwtToken,
      },
      body: JSON.stringify(bodyId),
    }
    const response = await fetch(url, options)
    console.log(response)
    window.location.reload()
  }
  return (
    <Popup
      modal
      trigger={<RiDeleteBinLine className="icons debit-transaction" />}
    >
      {close => (
        <div className="logout-popup">
          <BiError className="logout-icon" />
          <div className="logout-data">
            <h1> Are you Sure you want to logout </h1>
            <p> click yes to logout </p>
            <div className="logout-btns-container">
              <button
                type="button"
                className="logout-sec-btns yes-btn"
                onClick={onDelete}
              >
                {' '}
                Yes, Delete{' '}
              </button>
              <button
                type="button"
                className="logout-sec-btns cancel-btn"
                onClick={() => close()}
              >
                {' '}
                Cancel{' '}
              </button>
            </div>
          </div>
          <GrFormClose onClick={() => close()} className="cancel-icon" />
        </div>
      )}
    </Popup>
  )
}

export default DeletePopup
