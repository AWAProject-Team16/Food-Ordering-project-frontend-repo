import styles from './../css/Nav.module.css'
import React, { Component } from 'react'
import { Link, NavLink } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <div className={ styles.nav }>
        <ul>
          <li>
            <NavLink to="/" activeClassName="selected">Home</NavLink>
          </li>
          <li>
            <NavLink to="/restaurant" activeClassName="selected">Restaurant</NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

// import React from 'react'

// export default function Nav() {
//     return (
//         <div>
            
//         </div>
//     )
// }

