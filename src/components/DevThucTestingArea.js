import React from 'react'
import Register from '../components/Register';
import RestaurantCreateNew from '../components/RestaurantCreateNew';
import OrderHistory from '../components/OrderHistory/OrderHistory';

export default function DevThucTestingArea() {
  return (
    <div>
      <OrderHistory />
      <RestaurantCreateNew />
      <Register />
    </div>
  )
}
