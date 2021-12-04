import styles from './../css/Home.module.css'
import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Categories from './Categories';


class Home extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
    }
  }
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
        <Link to={`/foodType/${types.name}`} element={this.props.foodTypes}  >
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