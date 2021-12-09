import React, { useEffect, useState } from "react";
import Restaurants from "./Restaurants";
import axios from "axios";

export default function ManagerRestaurants() {
  const [restaurants, setRestaurants] = useState([]);

  const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;
  const token = window.localStorage.getItem("appAuthData");

  useEffect(() => {
    axios
      .get(`${API_ADDRESS}/restaurants/ownRestaurants2`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.Own_Restaurants);
        setRestaurants(res.data.Own_Restaurants);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <div style={{ display: "none" }}>{JSON.stringify(restaurants)}</div>
      <Restaurants restaurants={restaurants} />
    </div>
  );
}
