import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import Restaurant from '../components/Restaurant';
import ShoppingCart from '../components/ShoppingCart';

export default class RouterURL extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
      </Routes>
    )
  }
}
