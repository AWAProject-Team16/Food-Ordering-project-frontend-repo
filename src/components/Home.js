import styles from './../css/Home.module.css'
import React from 'react'
import {Link,Route} from 'react-router-dom'
import axios from 'axios';
import { TypeContext } from '../context/Contexts';
import Categories from './Categories';





class Home extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
    }
  }

  
  
  render()
  {
    // Temporarily added by Thuc. For better performance, use RouterURL
  /*  const jwt = require('jsonwebtoken');
    const token = window.localStorage.getItem('appAuthData');
    if (token) {
      const payload = jwt.decode(token);
      if(payload.account_type===2) window.location.href = '/managers/';
    } */

    const foodTypes = 
    [
      {
      name:"Fast-food",
      image: "category-hamburger.jpg"
      },
      {
        name:"Buffet",
        image: "category-pizza.jpg"
      },
      {
        name:"Fast-casual",
        image: "category-kebab.jpg"
      },
      {
        name:"Casual-dining",
        image: "category-mexican.jpg"
      },
      {
        name:"Fine-dining",
        image: "category-sushi.jpg"
      },

    ]
     
    
  return (
    <div>
      <div>
        User login status:{this.props.userLoggedIn ? "is logged in" : "not logged in"  }  
      </div>
      <h3 className={styles.header}>Food types</h3>
            <div className={styles.categoryGrid}>
              
              {foodTypes.map(types =>
                <div className={styles.box}>
                <Link to={`/foodType/${types.name}`}  >
                  {types.name}
                 <img src={`/images/${types.image}`}/></Link>
                </div>
                )}

    </div>
    </div>
    
  )
}
}

export default Home;