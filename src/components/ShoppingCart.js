import React from 'react'
import ShoppingCartProduct from './ShoppingCartProduct'
import styles from './../css/ShoppingCart.module.css'

const ShoppingCart = props => {
    return <div className={styles.ShoppingCart}>
        <div className={styles.ShoppingCartTitle}>
            All products
        </div>
        {
            props.items.map(i => <ShoppingCartProduct {...i} key={ i.id }/>)
        }
    </div>
}

export default ShoppingCart