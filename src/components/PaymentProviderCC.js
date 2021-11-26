import React from 'react'
import styles from './../css/PaymentView/PaymentProviderCC.module.css'

const PaymentProviderCC = (props) => {
  return (
    <div className={styles.ExpandedView}>
      <div>
        name of the card
      </div>
      <div>
        Insert card number here
      </div>
      <form>
        <input type="text" value="XXXXXXXXXXXXX"/>
      </form>
      <div className={styles.SmallInfo}>
        <div className={styles.CVV}>
          <div>
            CVV
          </div>
          <form>
            <input type="text" value=""/>
          </form>
        </div>
        <div className={styles.ExpirationDate}>
          <div>
            Expiration date (MM/YR)
          </div>
          <form>
            <input type="text" value=""/>
          </form>
        </div>
      </div>
      <button>
        Confirm Payment
      </button>
    </div>
  )
}

export default PaymentProviderCC
