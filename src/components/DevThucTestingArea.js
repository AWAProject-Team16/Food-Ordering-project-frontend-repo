import React from 'react'
import Register from '../components/Register';
import RestaurantCreateNew from '../components/RestaurantCreateNew';
import OrderHistory from '../components/OrderHistory';

export default function DevThucTestingArea() {
  return (
    <div>
      <div>
        <h1>Register</h1>
        <Register />
      </div>

      <div>
        <h1>RestaurantCreateNew</h1>
        <RestaurantCreateNew />
      </div>

      <div>
        <h1>OrderHistory</h1>
        <OrderHistory />
      </div>
    </div>
  )
}
