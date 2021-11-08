import React from 'react'
import styles from './../css/ShoppingCartProduct.module.css'

const ShoppingCartProduct = props => {
    return <div className = {styles.ShoppingCartProduct}>
        <button className={styles.Productqty} onClick={ () => props.IncreaseAmount(props.id, props.cost)}>
            +
        </button>
        <div className={styles.Productqty}>
            { props.qty }x
        </div>
        <button className={styles.Qtybutton} onClick={ () => props.DecreaseAmount(props.id, props.cost)}>
            -
        </button>
        <div className= {styles.ProductName}>
            { props.value }
        </div>
        <div className= {styles.ProductCost}>
            { props.cost } €
        </div>
        <button className={styles.Removebutton} onClick={ () => props.DeleteProduct(props.id, props.qty, props.cost)}>
            X
        </button>
    </div>
}

export default ShoppingCartProduct
