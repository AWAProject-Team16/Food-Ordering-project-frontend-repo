import React from 'react'
import styles from './../css/PaymentView/PaymentProvider.module.css'
import PaymentProviderBank from './PaymentProviderBank'
import PaymentProviderCC from './PaymentProviderCC'

const PaymentProvider = (props) => {
    if(props.expanded === true && props.type === 'bank') {
        return (
            <div>
                <div className={styles.ProviderBox} onClick = { () => props.SelectProvider(props.id)}>
                    {props.name}
                </div>
                <div>
                    <PaymentProviderBank />
                </div>
            </div>
        )
    } else if ( props.expanded === true && props.type === 'credit card') {
        return (
            <div>
                <div className={styles.ProviderBox} onClick = { () => props.SelectProvider(props.id)}>
                    {props.name}
                </div>
                <div>
                    <PaymentProviderCC />
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className={styles.ProviderBox} onClick = { () => props.SelectProvider(props.id)}>
                    {props.name}
                </div>
            </div>
        )

    }
}

export default PaymentProvider
