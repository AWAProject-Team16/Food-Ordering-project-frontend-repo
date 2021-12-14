import styles from "./../css/Home.module.css";
import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
