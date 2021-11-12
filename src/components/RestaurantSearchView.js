import React from 'react'
import styles from '../css/RestaurantSearchView.module.css';
import RestaurantSearchResult from './RestaurantSearchResult';
import { Row } from 'react-bootstrap';

export default function RestaurantSearchView(props) {
  return (
    <Row>
        {
          props.items.map(item => <RestaurantSearchResult key={item.idRestaurant} {...item} />)
        }
    </Row>
  )
}
