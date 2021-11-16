import React from 'react'
import styles from '../css/RestaurantDetail.module.css';

export default function RestaurantDetail(props) {
  const objProducts = props.products.filter(item => item.idCategory === props.category.idCategory)
  return (
    <div>
      <h3 id={props.category.idCategory} className={ styles.category }> { props.category.name } </h3>
      {
        objProducts.map(item =>
          <div className={ styles.product } key={ item.idProduct }>
            <div className={ styles.productLeft }>
              <div className={ styles.name }> { item.name } </div>
              <div className={ styles.description }> { item.description } </div>
              <div className={ styles.price }> { '$ ' + item.price } </div>
            </div>
            <div className={ styles.productRight }>
              <img alt="true" className={styles.imageM} src={`/images/${item.image}`} />
            </div>
          </div>
      )}
    </div>
  )
}