import React, { useState } from "react";
import RestaurantsSearchView from "./RestaurantsSearchView";
import styles from "../css/Restaurants.module.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import jwt from "jsonwebtoken";

export default function Restaurants(props) {
  const [searchString, setSearchString] = useState(localStorage.getItem("valueOfInput") || "");

  const onSearchFieldChange = (event) => {
    console.log("Keyboard event");
    console.log(event.target.value);
    setSearchString(event.target.value);
  };

  if (localStorage.getItem("valueOfInput")) {
    localStorage.removeItem("valueOfInput");
  }

  function getIsManager() {
    const token = window.localStorage.getItem("appAuthData");
    if (!token) console.error("No app auth data");
    return jwt.decode(token).account_type == 2;
  }

  return (
    <div className={styles.presentationModeGrid}>
      {getIsManager() && (
        <div
          className={styles.floatingBigPlus}
          title="Add a New Restaurant"
          onClick={() => (window.location.href = "/managers/restaurants/create")}
        >
          <BsPlusLg size="3em" />
        </div>
      )}

      <div className={styles.header}>
        <img className={styles.image} src={`/images/event.png`} />
      </div>
      <div className={styles.title}>
        <div className={styles.name}>
          <p>RESTAURANTS</p>
        </div>
        <div className={styles.search}>
          <input
            className={styles.searchInput}
            type="text"
            onChange={onSearchFieldChange}
            value={searchString}
            placeholder="Find restaurant"
          />
          <div className={styles.icon}>
            <FaSearch />
          </div>
        </div>
      </div>
      <Container>
        {
          <RestaurantsSearchView
            items={props.restaurants.filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase()))}
          />
        }
      </Container>
    </div>
  );
}
