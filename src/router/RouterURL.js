import React, {Component} from 'react';
import {Routes, Route} from "react-router-dom";
import Home from '../components/Home';
import Restaurants from '../components/Restaurants';
import Restaurant from '../components/Restaurant';
import ShoppingCart from '../components/ShoppingCart';
import PaymentPage from '../components/PaymentPage';
import Data from '../data.json';
import DevThucTestingArea from '../components/DevThucTestingArea';

export default class RouterURL extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants restaurants={ Data.restaurants } />}>
          {/* <Route path="/:idOfRestaurant" element={<RestaurantDetailView restaurants={ Data.restaurants } menus={ Data.menus } products={ Data.products } /> } /> */}
        </Route>
        <Route path="/restaurants/:idOfRestaurant" element={<Restaurant restaurants={ Data.restaurants } categories={ Data.categories } products={ Data.products } /> } />
        <Route path="/shoppingcart" element={<ShoppingCart CartCounter={this.props.CartCounter}/>} />
        <Route path="/paymentpage" element={<PaymentPage />} />
        <Route path="/devthuc" element={<DevThucTestingArea />} />
      </Routes>
    )
  }
}
