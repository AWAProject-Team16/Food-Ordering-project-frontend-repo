import React, { useState, useEffect } from "react";
import OrderHistoryPerRestaurant from "../manager/OrderHistoryPerRestaurant";
import axios from "axios";
import jwt from "jsonwebtoken";
import styles from "../../../css/OrderHistory.module.css";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

export default function OrderHistoryCustomer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = window.localStorage.getItem("appAuthData");
      if (!token) {
        console.error("No app auth data");
        return;
      }
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

  function getUserName() {
    const token = window.localStorage.getItem("appAuthData");
    if (!token) return "";
    else return jwt.decode(token).name;
  }

  return (
    <div>
      {data.length <= 0 && <div>(You have no orders.)</div>}

      {data.length > 0 && (
        <div>
          <div className={styles.componentTitle}>Order History</div>
          <OrderHistoryPerRestaurant
            name={getUserName()}
            orderData={data} // it's okay to receive more than needed
            restaurantData={getUniqueRestaurantData()}
            orderStatusData={["Received", "Preparing", "Ready for delivery", "Delivering", "Delivered", "Closed"]}
            isManagerView={false}
          />
        </div>
      )}
    </div>
  );
}
