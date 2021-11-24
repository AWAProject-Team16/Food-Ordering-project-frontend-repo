import React, {Component} from 'react';
import {Routes, Route} from "react-router-dom";
import Home from '../components/Home';
import Restaurants from '../components/Restaurants';
import Restaurant from '../components/Restaurant';
import ShoppingCart from '../components/ShoppingCart';
import Data from '../data.json';
import RestaurantCreateNew from '../components/RestaurantCreateNew';
import Register from '../components/Register';
import Categories from '../components/Categories'

export default class RouterURL extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home foodTypes={Data.food_types}/>} />
        <Route path="/:type" element={<Categories restaurants={Data.restaurants} />} />
        <Route path="/:type/:idOfRestaurant" element={<Restaurant restaurants={ Data.restaurants } categories={ Data.categories } products={ Data.products } /> } />
        <Route path="/restaurants" element={<Restaurants restaurants={ Data.restaurants } />}>
          {/* <Route path="/:idOfRestaurant" element={<RestaurantDetailView restaurants={ Data.restaurants } menus={ Data.menus } products={ Data.products } /> } /> */}
        </Route>
        <Route path="/restaurants/:idOfRestaurant" element={<Restaurant restaurants={ Data.restaurants } categories={ Data.categories } products={ Data.products } /> } />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/devthuc" element={<RestaurantCreateNew />} />
      </Routes>
    )
  }
}
