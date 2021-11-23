import RestaurantsSearchView from './RestaurantsSearchView';
import styles from '../css/Restaurants.module.css';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

import React, { Component } from 'react';
export default class Restaurants extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      // items: props.restaurants,  // Xóa props ở routerURL sau !!!
      items: [],
      searchString: "",
    }
  }

  componentDidMount() {
    console.log("DidMount")
    axios.get('http://localhost:5000/restaurants')
    .then((res) => {
      // console.log(res.data.Restaurants)
      this.setState({ items: res.data.Restaurants})
    })
    .catch(err => console.log(err))
  }

  onSearchFieldChange = (event) => {
    console.log('Keyboard event');
    console.log(event.target.value);
    this.setState({ searchString: event.target.value });
  }

  render() {
    return (
      <div className={ styles.presentationModeGrid }>
        <div className={ styles.title }>
          <div className={ styles.name }><p>RESTAURANTS</p></div>
          <div className={ styles.search }>
            <input className={ styles.searchInput } type="text" onChange={ this.onSearchFieldChange } 
              value={ this.state.searchString } placeholder="Find restaurant"/>
            <div className={ styles.icon }>
              <FaSearch />
            </div>
          </div>
        </div>
        <Container>
          {
            // this.state.items.map(item => <RestaurantSearchResult key={item.idRestaurant} {...item} />)
            <RestaurantsSearchView
              items={ this.state.items.filter(item => item.name.toLowerCase().includes(this.state.searchString.toLowerCase())) }
            />
            // this.state.items.filter(item => 
            //   item.name.toLowerCase().includes(this.state.searchString.toLowerCase())).map((item => 
            //     <RestaurantSearchResult key={item.idRestaurant} {...item} />))          
          }
        </Container>
      </div>
    )
  }
}

// import React from 'react';
// export default function Restaurants(props) {
//   return (
//     <div className={ styles.presentationModeGrid }>
//       <div><p>RESTAURANTS</p></div>
//       <Container>
//         <Row>
//           {
//             props.restaurants.map(item => <RestaurantDetail key={item.idRestaurant} {...item} />)
//           }
//         </Row>
//       </Container>
//     </div>
//   )
// }