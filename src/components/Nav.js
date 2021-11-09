import styles from './../css/Nav.module.css'
import React, { Component } from 'react'
import { Link, NavLink } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <div className={ styles.nav }>
        <ul>
        <li>
            <Link to="/" className={styles.logo}>Slurps</Link>
       </li>
       </ul>
        <input className={styles.searchbar}type="text" placeholder="Search.."></input>
        <button className={styles.button}>Log in</button>
        <button className={styles.button2}>Register</button>
        <ul>
          <li>
            <Link to="/restaurant">Restaurant</Link>
          </li>
          <li>
            <Link to="/shoppingcart">ShoppingCart</Link>
            {/* <NavLink to="/shoppingcart" activeClassName="selected">ShoppingCart</NavLink> */}
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

