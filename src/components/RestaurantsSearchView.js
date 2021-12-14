import React from "react";
import styles from "../css/RestaurantsSearchView.module.css";
import RestaurantsSearchResult from "./RestaurantsSearchResult";
import { Row } from "react-bootstrap";

export default function RestaurantsSearchView(props) {
  return (
    <Row className={styles.RestaurantsSearchView}>
      {props.items.map((item) => (
        <RestaurantsSearchResult key={item.idrestaurants} {...item} />
      ))}
    </Row>
  );
}
