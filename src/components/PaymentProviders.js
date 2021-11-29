import React from 'react'
import PaymentProvider from './PaymentProvider'
import styles from './../css/PaymentView/PaymentProviders.module.css'

const PaymentProviders = (props) => {
  return (
    <div className={styles.ProviderItem}>
      {
        props.providers.map(i => <PaymentProvider {...i}
          SelectProvider={props.SelectProvider}
          AddOrder={props.AddOrder}
          key={i.id}
        />)
      }
    </div>
  )
}

export default PaymentProviders
