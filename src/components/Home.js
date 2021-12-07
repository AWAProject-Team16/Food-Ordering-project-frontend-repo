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
  static contextType = TypeContext
  /*componentDidMount(){
    axios.get('http://localhost:3000/food_types')
    .then((response)=> {
      this.setState({foodTypes: response.data.food_types});
    })
    .catch(err=> console.log(err))
  }*/
  
  
  render()
  {
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
     {/* <TypeContext.Consumer>
            {typeContextValue => (<div>{typeContextValue == 2 
            ? ""/*<>
            <div>
            <Link to ="/managers/orders"> Check orders</Link>
            </div>
            <div>
            <Link to ="/managers/restaurants/create"> Create restaurant </Link>
            </div>
            <div>
            <Link to ="managers/products/create"> Create product </Link>
            </div>
           </>
            :  <>
           
                
            </div> </> }</div>)}        
            </TypeContext.Consumer> */}

    </div>
    </div>
    
  )
}
}

export default Home;