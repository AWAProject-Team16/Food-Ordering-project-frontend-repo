import React, { useState, useEffect } from "react";
import OrderHistoryPerRestaurant from "../manager/OrderHistoryPerRestaurant";
import axios from "axios";
import jwt from "jsonwebtoken";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;
const token = window.localStorage.getItem("appAuthData");

export default function OrderHistoryCustomer() {
  const [data, setData] = useState([]);

  useEffect(() => {
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

  function getUniqueRestaurantData() {
    const _restaurantData = data.map((item) => {
      return {
        idrestaurants: item.restaurants_idrestaurants,
        name: item.restaurant_name,
      };
    });

    const restaurantData = _restaurantData.filter((item, index) => {
      return (
        _restaurantData.findIndex((element) => {
          return element.idrestaurants == item.idrestaurants;
        }) == index
      );
    });

    return restaurantData;
  }

  function getName() {
    if (!token) console.error("App auth data not found");
    else return jwt.decode(token).name;
  }

  return (
    <div>
      <h2>Order History</h2>
      <OrderHistoryPerRestaurant
        name={getName()}
        orderData={data} // it's okay to receive more than needed
        restaurantData={getUniqueRestaurantData()}
        orderStatusData={["Received", "Preparing", "Ready for delivery", "Delivering", "Delivered", "Closed"]}
        isManagerView={false}
      />
    </div>
  );
}
