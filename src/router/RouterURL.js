import React, {Component,} from 'react';
import {Routes, Route, BrowserRouter, } from "react-router-dom";
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
import Login from '../components/Login';
import { TypeContext } from '../context/Contexts';
import ManagerView from '../components/ManagerView';


export default class RouterURL extends Component {
  constructor(props){
    super(props)
   this.state = {
    
    
   }
  }
  static contextType = TypeContext

 
  render() {
    let typeValue = this.context 

    let authRoutes = <>
   
    <Route path="/" element={ <Login /> } />
    
    <Route path="/" element={ <Register /> } />
  </>
  
  //if(this.props.userLoggedIn != null) {
  //  authRoutes = <Route path="/paymentpage" element={ <PaymentPage /> }/> 
    
 // }
   if(typeValue != null) {
    authRoutes = <Route path="/manager" element={ <ManagerView />} />
    console.log("type  "+ typeValue)
  }
  
    return (
      <>
            
          <Routes>
          <Route path="/" element={<Home userLoggedIn={this.props.userLoggedIn != null}  />} />
              
                  {
                    authRoutes    
                  }     
              
            <Route path="*" element= {<Home userLoggedIn={this.props.userLoggedIn != null}/>} /> 
          
                
        {/* Typessä oli kaksoispisteet*/}
        <Route path="/foodType/:foodtype" element={<Categories restaurants={Data.restaurants} />} />
        <Route path="/foodType/:foodtype/:idOfRestaurant" element={<Restaurant restaurants={ Data.restaurants } categories={ Data.categories } products={ Data.products } /> } />
        <Route path="/restaurants" element={<Restaurants restaurants={ Data.restaurants } />}>
          {/* <Route path="/:idOfRestaurant" element={<RestaurantDetailView restaurants={ Data.restaurants } menus={ Data.menus } products={ Data.products } /> } /> */}
        </Route>
        <Route path="/restaurants/:idOfRestaurant" element={<Restaurant restaurants={ Data.restaurants } categories={ Data.categories } products={ Data.products } /> } />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        

        <Route path="/register" element={<Register />} />

        <Route path="/managers/orders" element={<OrderHistoryManger />} />
        <Route path="/managers/restaurants/create" element={<RestaurantCreateNew />} />
        <Route path="/managers/products/create" element={<ProductCreateNew />} />   
        <Route path="/customers/orders" element={<OrderHistoryCustomer />} />
        <Route path="/devthuc" element={<DevThucTestingArea />} />
        </Routes>
          
     
        </>
      
    )
  }
}
