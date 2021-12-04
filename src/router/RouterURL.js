import React, {Component,} from 'react';
import {Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import Restaurants from '../components/Restaurants';
import Restaurant from '../components/Restaurant';
import ShoppingCart from '../components/ShoppingCart';
import PaymentPage from '../components/PaymentPage';
import Data from '../data.json';
import DevThucTestingArea from '../components/DevThucTestingArea';
import Categories from '../components/Categories'
import OrderHistoryManger from '../components/OrderHistory/manager/OrderHistoryManger';
import OrderHistoryCustomer from '../components/OrderHistory/customer/OrderHistoryCustomer';
import Register from '../components/Register';
import RestaurantCreateNew from '../components/RestaurantCreateNew';
import ProductCreateNew from '../components/ProductCreateNew';
import ProductModify from '../components/ProductModify';
import Login from '../components/Login';
import CategoryCreateNew from '../components/CategoryCreateNew';
import CategoryModify from '../components/CategoryModify';

export default class RouterURL extends Component {
  constructor(props){
    super(props)
   this.state = {
    
   }
  }
  
  render() {
    let authRoutes = 
    <>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Register /> } />
    </>
  
    if(this.props.userLoggedIn != null) {
      authRoutes = <Route path="/paymentpage" element={ <PaymentPage /> }/> 
    }

    return (
      <Routes>
        <Route path="/" element={<Home userLoggedIn={this.props.userLoggedIn != null}  />} />
          {
            authRoutes
          }
        <Route path="*" element= {<Home userLoggedIn={this.props.userLoggedIn != null}/>} /> 
            
        {/* Typessä oli kaksoispisteet*/}
        <Route path="/foodType/:foodtype" element={<Categories restaurants={Data.restaurants} />} />
        <Route path="/foodType/:foodtype/:idOfRestaurant" element={<Restaurant restaurants={ Data.restaurants } categories={ Data.categories } products={ Data.products } /> } />
        
        <Route path="/restaurants" element={<Restaurants restaurants={ this.props.restaurants } key={ Math.random() } />}>
          {/* <Route path="/:idOfRestaurant" element={<RestaurantDetailView restaurants={ Data.restaurants } menus={ Data.menus } products={ Data.products } /> } /> */}
        </Route>
        <Route path="/restaurants/:idOfRestaurant" element={<Restaurant />} />
        <Route path="/search" element={<Restaurants restaurants={ this.props.restaurants } />} />
        
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        

        <Route path="/register" element={<Register />} />

        <Route path="/managers/orders" element={<OrderHistoryManger />} />
        <Route path="/managers/restaurants/create" element={<RestaurantCreateNew />} />
        <Route path="/managers/products/create" element={<ProductCreateNew />} />
        <Route path="/managers/products/modify/:idproducts" element={<ProductModify />} />

        <Route path="/managers/categories/create" element={<CategoryCreateNew />} />
        <Route path="/managers/categories/modify/:idcategories" element={<CategoryModify />} />
        
        <Route path="/customers/orders" element={<OrderHistoryCustomer />} />
        <Route path="/devthuc" element={<DevThucTestingArea />} />
      </Routes>
    )
  }
}
