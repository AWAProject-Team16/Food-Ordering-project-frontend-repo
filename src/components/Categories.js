import React, {useState, useEffect} from 'react'
import styles from '../css/RestaurantsSearchResult.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function Categories(props) {

  const result = useParams()
  console.log(result)
  console.log(result.foodtype)
  //const obj = props.restaurants.find(item => item.type === types.name);
  //const foodType = props.foodTypes;
  //console.log("category prop "+props.foodTypes)
  const foodType = result.foodtype
  console.log("foodtype category " + foodType)
  const [restaurants, setRestaurants] = useState()

  if(result == null) {
    return <div>No restaurants</div>
  }
 

     const getRestaurants = () => {
     axios.post('http://localhost:5000/food_types',foodType)
     .then((res) => {
     console.log(res.data.Restaurants)
     setRestaurants({ restaurants: res.data.Restaurants})
     })
    .catch(err => console.log(err))
     }
  
    

    return(
          <div>
            <div foodType> testi</div>
           {/* <div className={styles.restaurant}>
              <Link to={restaurants}>
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
    </div> 
    */}
              
            </div> 
    )
}

