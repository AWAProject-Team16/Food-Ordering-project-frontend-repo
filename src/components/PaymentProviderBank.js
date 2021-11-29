import React from 'react'
import styles from './../css/PaymentView/PaymentProviderBank.module.css'
import { Link } from 'react-router-dom'

const PaymentProviderBank = (props) => {
  return (
    <div>
      <Link to="/customers/orders" >
        <button className={styles.ConfirmButton} onClick={() => props.AddOrder()} >
          <span className={styles.ConfirmLink}>Proceed to bank website to authorize payment</span>
        </button>
      </Link>
    </div>
  )
}

export default PaymentProviderBank
