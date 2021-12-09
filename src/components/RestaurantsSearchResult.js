import React from "react";
import styles from "../css/RestaurantsSearchResult.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";

export default function RestaurantsSearchResult(props) {
  const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;
  const token = window.localStorage.getItem('appAuthData')
  let accountType = 1;
  if (token) {
    accountType = jwt.decode(token).account_type;
  }
  
  return (
    <Col lg={4}>
      <Link to={`/../${accountType == 2 ? 'managers/' : ''}restaurants/${props.idrestaurants.toString()}`}>
        <div className={styles.restaurant}>
          <div>
            <img alt="true" src={`${API_ADDRESS}/images/${props.image}`} />
          </div>

          <div className={styles.name}>{props.name}</div>

          <div className={styles.description}>
            {props.restaurant_description}
          </div>

          <hr />
          <div className={styles.more}>
            <div className={styles.price}>{props.price_level} $</div>
            <div className={styles.time}>15-25 min</div>
          </div>
        </div>
      </Link>
    </Col>
  );
}
