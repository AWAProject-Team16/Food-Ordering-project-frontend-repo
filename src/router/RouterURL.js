import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import Restaurant from '../components/Restaurants';
import RestaurantDetailView from '../components/RestaurantDetailView';
import ShoppingCart from '../components/ShoppingCart';
import Data from '../data.json';

export default class RouterURL extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurant restaurants={ Data.restaurants } />}>
          <Route path=":restaurantId" element={ <RestaurantDetailView restaurants={ Data.restaurants } /> } />
        </Route>
        <Route path="/shoppingcart" element={<ShoppingCart />} />
      </Routes>
    )
  }
}
