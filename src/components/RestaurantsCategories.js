import React from "react";
import styles from "../css/RestaurantsSearchResult.module.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Restaurants from "./Restaurants";

export default function RestaurantsCategories(props) {
  // This is a set of restaurants of the same food type (aka restaurant type)

  const result = useParams();
  //const obj = props.restaurants.find(item => item.type === types.name);
  //const foodType = props.foodTypes;
  //console.log("category prop "+props.foodTypes)
  console.log(result.foodtype);
  console.log(props.restaurants);
  if (result == null) {
    return <div>No restaurants</div>;
  }

  // const handleTypeSubmit = async (event) => {
  //   try {
  //     const result = await axios.post(
  //       "http://localhost:5000/restaurants/type/",
  //       {
  //         result
  //       }

  //     )
  //     console.log(result)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  let typefilter = MakeFilter();

  function MakeFilter() {
    if (result.foodtype === "Fast-food") {
      return "fast food";
    } else if (result.foodtype === "Buffet") {
      return "buffet";
    } else if (result.foodtype === "Fast-casual") {
      return "fast casual";
    } else if (result.foodtype === "Casual-dining") {
      return "casual dining";
    } else if (result.foodtype === "Fine-dining") {
      return "fine dining";
    }
  }

  const filteredRestaurants = FilterRestaurants(props.restaurants, typefilter);

  function FilterRestaurants(arr, foodtype) {
    return arr.filter(function (item) {
      console.log("foodtype", foodtype);
      return (
        item.restaurant_type
          .toLowerCase()
          .indexOf(foodtype.toString().toLowerCase()) !== -1
      );
    });
  }

  console.log("filtered are:", filteredRestaurants);

  return (
    <div>
      <div>
        <Restaurants restaurants={filteredRestaurants} />
      </div>
      {/*<div className={styles.restaurant}>
              <Link to={obj.idRestaurant}>
              <div>
              <img src={`/images/${obj.image}`}/>
              </div>

             <div className={styles.name}>
               {obj.name}
               </div>

               <div className={styles.description}>
                 {obj.description}
               </div>

               <div className={ styles.more }>
              <div className={ styles.time }>15-25 min</div>
              </div>
             <div>{obj.type}</div>
             </Link>
    </div> */}
    </div>
  );
}
