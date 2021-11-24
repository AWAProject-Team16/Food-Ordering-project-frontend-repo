import React from 'react'
import Register from '../components/Register';
import RestaurantCreateNew from '../components/RestaurantCreateNew';
import OrderHistory from '../components/OrderHistory/manager/OrderHistory';
import OrderHistoryCustomer from '../components/OrderHistory/customer/OrderHistoryCustomer';

export default function DevThucTestingArea() {
  return (
    <div>
      <OrderHistoryCustomer />
      <OrderHistory />
      <RestaurantCreateNew />
      <Register />
    </div>
  )
}
