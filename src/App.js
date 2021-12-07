import { BrowserRouter } from "react-router-dom";
import Nav from './components/Nav';
import Footer from './components/Footer';
import RouterURL from './router/RouterURL';
import Data from './data.json';
import jwt from 'jsonwebtoken'
import styles from './App.module.css'
import React, { Component } from 'react'
import { CartContext } from "./context/Contexts";
import { TypeContext } from "./context/Contexts";


const jwtFromStorage = window.localStorage.getItem('appAuthData')
const typeFromStorage = window.localStorage.getItem('typeData')

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CartQty: 0,
      isUserLoggedIn: jwtFromStorage,
      typeValue: typeFromStorage,
     // typeContextValue: null
    };
  };

  componentDidMount() {
    this.CartCounter();
    //this.CheckAccountType();
  }
  
  /*CheckAccountType = () => {
    let typeContextValue = null
    if(this.state.isUserLoggedIn != null) {
    console.log("tokeni apissa: " + jwtFromStorage)
    const decodedToken = jwt.decode(jwtFromStorage);
    //typeContextValue = decodedToken
    //this.setState({typeContextValue: typeContextValue})
    console.log("app puolella type " + decodedToken.user.account_type)
    typeContextValue = decodedToken.user.account_type
    console.log("typecontextvalue apissa" + typeContextValue)
    this.setState({typeContextValue: typeContextValue  })
    }
    else{
      console.log("Ei ole kirjautunut sisään")
    }
  }*/

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
         {/* <TypeContext.Provider value = {this.state.typeContextValue}> */}
          <Nav CartQty={this.state.CartQty} restaurants={ Data.restaurants } nav = {(newJwt => {
            this.setState({isUserLoggedIn:newJwt})
          }
            )} userLoggedIn={this.state.isUserLoggedIn} navType = {(newTypeJwt => {this.setState({typeValue: newTypeJwt})})} />
            
          <CartContext.Provider value={{CartCounter: this.CartCounter}} >
            <RouterURL userLoggedIn={this.state.isUserLoggedIn} typeValue = {this.state.typeValue} />
          </CartContext.Provider>
         {/* </TypeContext.Provider> */}
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}