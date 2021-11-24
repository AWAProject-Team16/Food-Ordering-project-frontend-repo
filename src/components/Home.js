import styles from './../css/Home.module.css'
import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

class Home extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      restaurants:[],
    }
  }
  componentDidMount(){
    axios.get('http://localhost:3000/food_types')
    .then((response)=> {
      this.setState({foodTypes: response.data.food_types});
    })
    .catch(err=> console.log(err))
  }

  render()
  {
  return (
    <div>
      <h3 className={styles.header}>Food types</h3>
    <div className={styles.categoryGrid}>
      {this.props.foodTypes.map(types =>
        <div className={styles.box}>
        <Link to= {types.type}>
          {types.type}
         <img src={`/images/${types.image}`}/></Link>
        </div>
        )}
        
    </div>
    </div>
    
  )
}
}

export default Home;