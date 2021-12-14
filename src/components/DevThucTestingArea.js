import React from "react";
import Register from "../components/Register";
import RestaurantCreateNew from "../components/RestaurantCreateNew";
import OrderHistoryManger from "./OrderHistory/manager/OrderHistoryManger";
import OrderHistoryCustomer from "../components/OrderHistory/customer/OrderHistoryCustomer";
import ProductCreateNew from "../components/ProductCreateNew";

export default function DevThucTestingArea() {
  return (
    <div>
      <ProductCreateNew />
      <OrderHistoryCustomer />
      <OrderHistoryManger />
      <RestaurantCreateNew />
      <Register />
    </div>
  );
}
