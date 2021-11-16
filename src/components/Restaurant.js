import React from 'react'
import styles from '../css/Restaurant.module.css';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import RestaurantDetail from './RestaurantDetail';

export default function Restaurant(props) {
  // const result = window.location.pathname.split('/')[2]
  const result = useParams()
  const obj = props.restaurants.find(item => item.idRestaurant === result.idOfRestaurant);
  if(obj == null) {
    return <div>No matching restaurant</div>
  }
  
  // console.log(props.categories)
  // const objCategories = props.categories.find(item => item.idRestaurant === obj.idRestaurant);
  const objCategories = props.categories.filter(item => item.idRestaurant === obj.idRestaurant)
  // console.log(objCategories)
  
  const objProducts = props.products.filter(item => item.idRestaurant === obj.idRestaurant)
  
  return (
    <div>
      <div className= {styles.header}>
        <img alt="true" className= {styles.image} src={`/images/event.png`} />
      </div>
      <div className= {styles.container}>
        <div className= {styles.categories}>
          {
            objCategories.map(item =>
              // <Link to={ item.idCategory } key={item.idCategory}>
              //   <div className={ styles.categoryListElement }> { item.name } </div>
              // </Link>
              <div className={ styles.categoryListElement } key={item.idCategory}> 
                <a href={ '#' + item.idCategory }>{ item.name }</a>
              </div>
          )}
        </div>
        <div className= {styles.products}>
          {/* {
            objProducts.map(item =>
              <div className={ styles.productListElement } key={ item.idProduct }> { item.name } </div>)
          } */}
          {
            objCategories.map(item =>
              <RestaurantDetail
                key={ item.idCategory }
                idRestaurant={ result.idOfRestaurant }
                categories ={ objCategories }
                category={ item }
                products={ objProducts }/>)
          }
        </div>
        <div className= {styles.info}>
          <h4>Restaurant information</h4>
          <h5>Address</h5>
          <div>{ obj.address }</div>
          <h5>Phone no.</h5>
          <div>{ obj.phone }</div>
          <h5>Opening times</h5>
          <div>{ obj.operating_hour }</div>
          <h5>About restaurant</h5>
          <div>{ obj.description }</div>
        </div>
      </div>
    </div>
  )
}
