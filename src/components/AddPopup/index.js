import Popup from 'reactjs-popup'
import AddTransactionForm from '../AddTransactionForm'

const AddPopup = () => (
  <div className="popup-container">
    <Popup
      modal
      trigger={
        <button className="add-transaction-btn" type="button">
          + Add Transaction
        </button>
      }
    >
      {close => <AddTransactionForm close={close} />}
    </Popup>
  </div>
)

export default AddPopup
