import React from 'react'
import styles from '../css/RestaurantsSearchResult.module.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';


export default function Categories(props) {
  const result = useParams()
  const obj = props.restaurants.find(item => item.idCategory === result.idCategory);
  if(obj == null) {
    return <div>No matching restaurant</div>
  }
  
  
    return(
          <div>
            
            <div className={styles.restaurant}>
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
             </div> 
                
              
            </div> 
    )
}

