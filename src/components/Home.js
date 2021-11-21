import styles from './../css/Home.module.css'
import React from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import axios from 'axios';
import categoryData from '../data.json'

class Home extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      categories:[],
    }
  }
  componentDidMount(){
    axios.get('http://localhost:3000/categories')
    .then((response)=> {
      this.setState({categories: response.data.categories});
    })
    .catch(err=> console.log(err))
  }

  render()
  {
  return (
    <div>
      <h3 className={styles.header}>Categories</h3>
    <div className={styles.categoryGrid}>
      {this.props.categories.map(category =>
        <div className={styles.box}>
        <Link to= {category.idCategory}>{category.idCategory} {category.name} <img src={`/images/${category.image}`}/></Link>
        </div>
        )}
        
    <div className={styles.box}>   
    </div>
    <div className={styles.box}>
    <Link to="/category" ><img className={styles.image} src="images/category-pizza.jpg"/> Pizza</Link>
    </div>
    <div className={styles.box}>
    <Link to="/category-fastCasual" ><img className={styles.image} src="images/category-kebab.jpg"/>Kebab</Link>
    </div>
    <div className={styles.box}>
    <Link to="/category-casualDining" ><img className={styles.image} src="images/category-chinese.png"/>Chinese</Link>
    </div>
    <div className={styles.box}>
    <Link to="/category-fineDining" ><img className={styles.image} src="images/category-mexican.jpg"/>Mexican</Link>
    </div>
    <div className={styles.box}>
    <Link to="/category-sushi" ><img className={styles.image} src="images/category-sushi.jpg"/>Sushi</Link>
    </div>
    </div>
    </div>
    
  )
}
}

export default Home;