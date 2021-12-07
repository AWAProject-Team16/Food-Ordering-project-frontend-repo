import React from 'react';
import styles from '../css/SearchResult.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export default function SearchResult(props) {
  var API_ADDRESS = process.env.REACT_APP_API_ADDRESS
  return (
    <Link to={ 'restaurants/' + props.idrestaurants.toString()}
      onClick={ props.onChangePage }>
      <div className={ styles.restaurant }>
        <div className={ styles.left }>
          <img className={ styles.imgSearchResult } alt="true" src={`${API_ADDRESS}/images/${props.image}`} />
        </div>
        <div className={ styles.right }>
          <div className={ styles.name }>
            { props.name }
          </div>
          <div className={ styles.description}>
            { props.restaurant_description }
          </div>
        </div>
      </div>
    </Link>
  )
}
