import React from 'react'
import styles from './../css/ShoppingCartProduct.module.css'

const ShoppingCartProduct = props => {
  const cost = props.cost;
  const qty = props.qty;
  let CombinedCost = cost * qty;
  CombinedCost = parseFloat(CombinedCost.toFixed(2));
  return <div className={styles.ShoppingCartProduct}>
    <button className={styles.PlusButton} onClick={() => props.IncreaseAmount(props.id, props.cost)}>
      +
    </button>
    <div className={styles.Productqty}>
      {props.qty}x
    </div>
    <button className={styles.MinusButton} onClick={() => props.DecreaseAmount(props.id, props.cost)}>
      -
    </button>
    <div className={styles.ProductName}>
      {props.value}
    </div>
    <div className={styles.ProductCost}>
      {CombinedCost} €
    </div>
    <button className={styles.Removebutton} onClick={() => props.DeleteProduct(props.id, props.qty, props.cost)}>
      X
    </button>
  </div>
}

export default ShoppingCartProduct
