import React from 'react'
import styles from '../css/RestaurantsSearchResult.module.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function Categories(props) {

  const result = useParams()
  //const obj = props.restaurants.find(item => item.type === types.name);
  //const foodType = props.foodTypes;
  //console.log("category prop "+props.foodTypes)
  console.log(result)
  if(result == null) {
    return <div>No restaurants</div>
  }

  const handleTypeSubmit = async (event) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/food_types",
        {
          result
        }
        
        )
        console.log(result)
      }catch (error){
        console.log(error)
      }
    }
  
    

    return(
          <div>
            <div foodType> testi</div>
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
    )
}

