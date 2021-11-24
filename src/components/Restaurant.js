import React, { useState, useEffect } from 'react'
import styles from '../css/Restaurant.module.css';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import RestaurantDetail from './RestaurantDetail';
import axios from 'axios';

export default function Restaurant(props) {
  // const result = window.location.pathname.split('/')[2]
  const result = useParams()

  const [obj, setObj] = useState({})
  useEffect(() => {
    axios.get(`http://localhost:5000/restaurants/id/${result.idOfRestaurant}`)
      .then((res) => {
        setObj(res.data[0])
      })
      .catch(err => console.log(err))
  }, [])

  // delete props from routerURL sau !!!
  // const obj = props.restaurants.find(item => item.idrestaurants === parseInt(result.idOfRestaurant));
  // if(obj == null) {
  if(obj.idrestaurants == null) {
    console.log('hehe')  // sao lại phải render 2 lần, dư thừa !
    return <div><h1 style={{textAlign: 'center'}}>No matching restaurant</h1></div>
  }
  
  // console.log(props.categories)
  // const objCategories = props.categories.find(item => item.idrestaurants === obj.idrestaurants);
  const objCategories = props.categories.filter(item => item.idrestaurants === obj.idrestaurants - 32)  // !!! tạm thời lấy jon nên có -13
  // console.log(objCategories)
  
  const objProducts = props.products.filter(item => item.idrestaurants === obj.idrestaurants - 32)
  
  return (
    <div>
      <div className= {styles.header}>
        <img alt="true" className= {styles.image} src={`/images/event.png`} />
      </div>
      <div className= {styles.container}>
        <div className= {styles.categories}>
          {
            objCategories.map(item =>
              // <Link to={ item.idcategories } key={item.idcategories}>
              //   <div className={ styles.categoryListElement }> { item.name } </div>
              // </Link>
              <div className={ styles.categoryListElement } key={item.idcategories}> 
                <a href={ '#' + item.idcategories }>{ item.category_name }</a>
              </div>
          )}
        </div>
        <div className= {styles.products}>
          {/* {
            objProducts.map(item =>
              <div className={ styles.productListElement } key={ item.idproducts }> { item.name } </div>)
          } */}
          {
            objCategories.map(item =>
              <RestaurantDetail
                key={ item.idcategories }
                idrestaurants={ parseInt(result.idOfRestaurant) }
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
          <div>{ obj.phonenumber }</div>
          <h5>Opening times</h5>
          <div>{ obj.operating_hours }</div>
          <h5>About restaurant</h5>
          <div>{ obj.restaurant_description }</div>
        </div>
      </div>
    </div>
  )
}
