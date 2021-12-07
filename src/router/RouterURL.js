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
import { TypeContext } from '../context/Contexts';

import CategoryCreateNew from '../components/CategoryCreateNew';
import CategoryModify from '../components/CategoryModify';
import ManagerDashboard from '../components/ManagerDashboard';

export default class RouterURL extends Component {
  constructor(props){
    super(props)
   this.state = {
    
   }
  }
  static contextType = TypeContext

 
  render() {
    //let typeValue = this.context 
    //console.log("type routerissa " + this.props.typeContextValue)
    let authRoutes = <>
  
  </>
  
  if(this.props.userLoggedIn != null) {
   authRoutes = 
   <>
   <Route path="/paymentpage" element={ <PaymentPage /> }/>
   <Route path="/customers/orders" element={<OrderHistoryCustomer />} /> 
   </>
  }
  let managerRoutes = <>
   
  </>
  if(this.props.typeValue == 2) {
    managerRoutes = 
    <>
       <Route path="/managers/categories/create" element={<CategoryCreateNew />} />
        <Route path="/managers/categories/modify/:idcategories" element={<CategoryModify />} />

        <Route path="/managers/orders" element={<OrderHistoryManger />} />
        <Route path="/managers/restaurants/create" element={<RestaurantCreateNew />} />

        <Route path="/managers/products/create" element={<ProductCreateNew />} />  
        <Route path="/managers/products/modify/:idproducts" element={<ProductModify />} /> 
        <Route path="/managers/" element={<ManagerDashboard />} />
        <Route path="*" element= {<ManagerDashboard />} /> 
    </>
  }
  let hideRoutesFromManager = <>

  </>
  if(this.props.typeValue != 2) {
    hideRoutesFromManager=
    <>
        <Route path="/foodType/:foodtype" element={<Categories restaurants={Data.restaurants} />} />
        <Route path="/foodType/:foodtype/:idOfRestaurant" element={<Restaurant restaurants={ Data.restaurants } categories={ Data.categories } products={ Data.products } /> } />
        
        <Route path="/restaurants" element={<Restaurants restaurants={ this.props.restaurants } key={ Math.random() } />}>
          {/* <Route path="/:idOfRestaurant" element={<RestaurantDetailView restaurants={ Data.restaurants } menus={ Data.menus } products={ Data.products } /> } /> */}
        </Route>
        <Route path="/restaurants/:idOfRestaurant" element={<Restaurant />} />
        <Route path="/search" element={<Restaurants restaurants={ this.props.restaurants } />} />
        
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="*" element= {<Home userLoggedIn={this.props.userLoggedIn != null}/>} />
        <Route path="/" element={<Home userLoggedIn={this.props.userLoggedIn != null}  />} />
         
    </>
  }
  
    return (
      <>
            
          <Routes>
                  {authRoutes} 
                  {managerRoutes}  
                  {hideRoutesFromManager}  
         </Routes>
          
     
        </>
      
    )
  }
}
