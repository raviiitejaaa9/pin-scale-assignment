import Popup from 'reactjs-popup'
import {BsPencil} from 'react-icons/bs'
import UpdateTransactionForm from '../UpdateTransactionForm'

const UpdatePopup = props => {
  const {id} = props
  return (
    <div className="popup-container">
      <Popup modal trigger={<BsPencil className="icons pencil-icon " />}>
        {close => <UpdateTransactionForm close={close} id={id} />}
      </Popup>
    </div>
  )
}

export default UpdatePopup
