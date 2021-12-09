import React, { useState } from "react";
import RestaurantsSearchView from "./RestaurantsSearchView";
import styles from "../css/Restaurants.module.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";

export default function Restaurants(props) {
  const [searchString, setSearchString] = useState(
    localStorage.getItem("valueOfInput") || ""
  );

  const onSearchFieldChange = (event) => {
    console.log("Keyboard event");
    console.log(event.target.value);
    setSearchString(event.target.value);
  };

  if (localStorage.getItem("valueOfInput")) {
    localStorage.removeItem("valueOfInput");
  }
  return (
    <div className={styles.presentationModeGrid}>
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
            items={props.restaurants.filter((item) =>
              item.name.toLowerCase().includes(searchString.toLowerCase())
            )}
          />
        }
      </Container>
    </div>
  );
}
