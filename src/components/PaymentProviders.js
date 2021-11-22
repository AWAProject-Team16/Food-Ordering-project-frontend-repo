import React from 'react'
import PaymentProvider from './PaymentProvider'
import styles from './../css/PaymentProviders.module.css'

const PaymentProviders = (props) => {
    return (
        <div className={styles.ProviderItem}>
            {
                props.providers.map(i => <PaymentProvider {...i}
                                        SelectProvider = {props.SelectProvider}
                                        key={ i.id }
                                        />)
            }
        </div>
    )
}

export default PaymentProviders
