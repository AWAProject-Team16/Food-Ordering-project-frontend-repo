import React from 'react';
import styles from '../css/RestaurantSearchResult.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function RestaurantSearchResult(props) {
  return (
    <Col lg={4}>
      <Link to={ props.idRestaurant }>
      {/* <Link to={ `/restaurant/${props.idRestaurant}` }> */}
        <div className={ styles.restaurant }>
          <div>
            <img alt="true" src={`/images/${props.image}`} />
          </div>

          <div className={ styles.name }>
            { props.name }
          </div>

          {/* !!! description */}
          <div className={ styles.description}>
            { props.description }
          </div>

          <hr />

          <div className={ styles.more }>
              <div className={ styles.time }>15-25 min</div>
          </div>
        </div>
      </Link>
    </Col>
  )
}
