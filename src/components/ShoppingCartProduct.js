import React from 'react'
import styles from './../css/ShoppingCartProduct.module.css'

const ShoppingCartProduct = props => {
    return <div className = {styles.ShoppingCartProduct}>
        <div className={styles.Productqty}>
            { props.qty }x
        </div>
        <div className= {styles.ProductName}>
            { props.value }
        </div>
        <div className= {styles.ProductCost}>
            { props.cost } €
        </div>
    </div>
}

export default ShoppingCartProduct
