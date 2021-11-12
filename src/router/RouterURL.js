import React, {Component} from 'react';
import {Routes, Route} from "react-router-dom";
import Home from '../components/Home';
import Restaurant from '../components/Restaurant';
import RestaurantCreateNew from '../components/RestaurantCreateNew';
import Register from '../components/Register';
import ShoppingCart from '../components/ShoppingCart';

export default class RouterURL extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/devthuc" element={<RestaurantCreateNew />} />
      </Routes>
    )
  }
}
