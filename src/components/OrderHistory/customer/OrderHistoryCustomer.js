import React, { useState, useEffect } from "react";
import OrderHistoryPerRestaurant from "../manager/OrderHistoryPerRestaurant";
import axios from "axios";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

export default function OrderHistoryCustomer() {
  const [data, setData] = useState([
    {
      idorders: 0,
      restaurants_idrestaurants: 0,
      users_idusers: 0,
      order_date: "",
      order_delivery_location: "",
      order_status: "",
      order_status_extra_info: "",
      order_total_cost: 0,
      restaurant_name: "",
      customer_name: "",
    },
  ]);

  let name = "",
    orderData = [],
    restaurantData = [],
    orderStatusData = [],
    isManagerView = false;

  useEffect(() => {
    name = data[0].customer_name;
    orderData = data;

    const _restaurantData = data.map((item) => {
      return {
        idrestaurants: item.restaurants_idrestaurants,
        name: item.restaurant_name,
      };
    });

    restaurantData = [...new Set(_restaurantData)];

    orderStatusData = [
      "Received",
      "Preparing",
      "Ready for delivery",
      "Delivering",
      "Delivered",
      "Closed",
    ];

    isManagerView = false;

    const token = window.localStorage.getItem("appAuthData");

    async function fetchData() {
      try {
        const res = await axios.get(`${API_ADDRESS}/orders/myOrdersPlusNames`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {orderData.length === 0 && "(You have no orders)"}
      {orderData.length !== 0 && (
        <OrderHistoryPerRestaurant
          name={name}
          orderData={orderData}
          restaurantData={restaurantData}
          orderStatusData={orderStatusData}
          isManagerView={isManagerView}
        />
      )}
    </div>
  );
}
