import { BrowserRouter } from "react-router-dom";
import Nav from './components/Nav';
import Footer from './components/Footer';
import RouterURL from './router/RouterURL';

import styles from './App.module.css'
import React, { Component } from 'react'
import { CartContext } from "./context/Contexts";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CartQty: 0
    };
  };

  componentDidMount() {
    this.CartCounter();
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


  render() {
    return (
      <BrowserRouter>
        <div className={styles.App}>
          <Nav CartQty={this.state.CartQty} />
          <CartContext.Provider value={{CartCounter: this.CartCounter}} >
            <RouterURL />
          </CartContext.Provider>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}