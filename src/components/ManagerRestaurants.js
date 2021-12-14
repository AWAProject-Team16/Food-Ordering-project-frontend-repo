import React, { useEffect, useState } from "react";
import Restaurants from "./Restaurants";
import axios from "axios";

export default function ManagerRestaurants() {
  const [restaurants, setRestaurants] = useState([]);

  const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

  useEffect(() => {
    const token = window.localStorage.getItem("appAuthData");
    if (!token) {
      console.error("No app auth data");
      return;
    }
    axios
      .get(`${API_ADDRESS}/restaurants/ownRestaurants2`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
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
