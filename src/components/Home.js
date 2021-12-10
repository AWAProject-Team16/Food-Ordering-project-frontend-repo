import styles from "./../css/Home.module.css";
import React from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import { TypeContext } from "../context/Contexts";
import RestaurantsCategories from "./RestaurantsCategories";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Temporarily added by Thuc. For better performance, use RouterURL
    /*  const jwt = require('jsonwebtoken');
    const token = window.localStorage.getItem('appAuthData');
    if (token) {
      const payload = jwt.decode(token);
      if(payload.account_type===2) window.location.href = '/managers/';
    } */

    const foodTypes = [
      {
        name: "Fast-food",
        image: "category-hamburger.jpg",
      },
      {
        name: "Buffet",
        image: "category-pizza.jpg",
      },
      {
        name: "Fast-casual",
        image: "category-kebab.jpg",
      },
      {
        name: "Casual-dining",
        image: "category-mexican.jpg",
      },
      {
        name: "Fine-dining",
        image: "category-sushi.jpg",
      },
    ];

    return (
      <div>
        <h3 className={styles.header}>Food types</h3>
        <div className={styles.categoryGrid}>
          {foodTypes.map((types, index) => (
            <div className={styles.box} key={index}>
              <Link to={`/foodType/${types.name}`}>
                {types.name}
                <img src={`/images/${types.image}`} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
