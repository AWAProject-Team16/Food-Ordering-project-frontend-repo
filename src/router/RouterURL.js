import React, {Component} from 'react';
import {Routes, Route} from "react-router-dom";
import Home from '../components/Home';
import Restaurant from '../components/Restaurant';
import RestaurantDetailView from '../components/RestaurantDetailView';
import ShoppingCart from '../components/ShoppingCart';
import Data from '../data.json';
import RestaurantCreateNew from '../components/RestaurantCreateNew';
import Register from '../components/Register';
import OrderHistory from '../components/OrderHistory';

export default class RouterURL extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurant restaurants={Data.restaurants} />}>
          {/* <Route path="/:idOfRestaurant" element={<RestaurantDetailView restaurants={ Data.restaurants } menus={ Data.menus } products={ Data.products } /> } /> */}
        </Route>
        <Route path="/restaurants/:idOfRestaurant" element={<RestaurantDetailView restaurants={Data.restaurants} menus={Data.menus} products={Data.products} />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/devthuc" element={<OrderHistory />} />
      </Routes>
    )
  }
}
