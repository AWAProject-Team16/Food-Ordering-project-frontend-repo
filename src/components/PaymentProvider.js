import React from 'react'
import styles from './../css/PaymentProvider.module.css'

const PaymentProvider = (props) => {
    if(props.expanded === true && props.type === 'bank') {
        return (
            <div>
                <div className={styles.ProviderBox} onClick = { () => props.SelectProvider(props.id)}>
                    {props.name}
                </div>
                <div>
                    This is a expanded view for a bank
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
                    This is a expanded view for a credit card
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
