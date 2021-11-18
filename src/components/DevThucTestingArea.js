import React from 'react'
import Register from '../components/Register';
import RestaurantCreateNew from '../components/RestaurantCreateNew';
import OrderHistory from '../components/OrderHistory/OrderHistory';
import OrderHistoryDetailView from '../components/OrderHistory/OrderHistoryDetailView';

export default function DevThucTestingArea() {
  return (
    <div>
      {/* <Register /> */}
      <OrderHistory />
      <RestaurantCreateNew />
      <Register />
    </div>
  )
}
