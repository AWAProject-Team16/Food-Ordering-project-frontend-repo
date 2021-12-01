import { BrowserRouter } from "react-router-dom";
import Nav from './components/Nav';
import Footer from './components/Footer';
import RouterURL from './router/RouterURL';
import RestaurantCreateNew from './components/RestaurantCreateNew';
import Register from './components/Register';
// import Data from './data.json';

import styles from './App.module.css'
import React, { Component } from 'react'
import { CartContext } from "./context/Contexts";
import axios from 'axios';

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS
const jwtFromStorage = window.localStorage.getItem('appAuthData')

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CartQty: 0,
      isUserLoggedIn: jwtFromStorage,
      items: [],  // Data.Restaurants
    };
  };

  componentDidMount() {
    this.CartCounter()
    this.getDataRestaurants()  // render CartCounter() and then render this: 2 time !!!
  }

  CartCounter = () => {
    let StorageCart = localStorage.getItem("ShoppingCart");
    StorageCart = JSON.parse(StorageCart);
    let CartQty = 0;
    if (Array.isArray(StorageCart)) {
      CartQty = StorageCart.reduce((Total, Current) => Total + Current.qty, 0);
    }
    // console.log(CartQty);
    this.setState({ CartQty: CartQty });
  }

  async getDataRestaurants() {
    await axios.get( API_ADDRESS + '/restaurants')
    .then((res) => {
      this.setState({ items: res.data.Restaurants})
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <BrowserRouter>
        <div className={styles.App}>
          <Nav CartQty={this.state.CartQty} restaurants={ this.state.items } nav = {(newJwt => {
          // <Nav CartQty={this.state.CartQty} restaurants={ Data.restaurants } nav = {(newJwt => {
            this.setState({isUserLoggedIn:newJwt})
          }
            )} userLoggedIn={this.state.isUserLoggedIn} />
          <CartContext.Provider value={{CartCounter: this.CartCounter}} >
            <RouterURL userLoggedIn={this.state.isUserLoggedIn} restaurants={ this.state.items }/>
          </CartContext.Provider>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}