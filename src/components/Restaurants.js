import React from 'react';
import RestaurantDetail from './RestaurantDetail';
import styles from '../css/Restaurants.module.css';
import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Restaurants(props) {
  return (
    <div className={ styles.presentationModeGrid }>
      <div><p>RESTAURANTS</p></div>
      <Container>
        <Row>
          {
            props.restaurants.map(item => <RestaurantDetail key={item.idRestaurant} {...item} />)
          }
        </Row>
      </Container>
    </div>
  )
}