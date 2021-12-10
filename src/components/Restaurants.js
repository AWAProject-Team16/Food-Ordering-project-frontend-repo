import React, { Component } from "react";
import RestaurantsSearchView from "./RestaurantsSearchView";
import styles from "../css/Restaurants.module.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import jwt from "jsonwebtoken";

export default class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.restaurants,
      searchString: localStorage.getItem("valueOfInput") || "",
    };
  }

  onSearchFieldChange = (event) => {
    console.log("Keyboard event");
    console.log(event.target.value);
    this.setState({ searchString: event.target.value });
  };

  getIsManager() {
    const token = window.localStorage.getItem("appAuthData");
    if (!token) {
      console.error("No app auth data");
      return;
    }

    return jwt.decode(token).account_type == 2;
  }

  render() {
    if (localStorage.getItem("valueOfInput")) {
      localStorage.removeItem("valueOfInput");
    }
    return (
      <div className={styles.presentationModeGrid}>
        {this.getIsManager() && (
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
              onChange={this.onSearchFieldChange}
              value={this.state.searchString}
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
              items={this.props.restaurants.filter((item) => item.name.toLowerCase().includes(this.state.searchString.toLowerCase()))}
            />
          }
        </Container>
      </div>
    );
  }
}
