import styles from './../css/Nav.module.css'
import React, { Component, useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import Register from './Register'
import Modal from 'react-modal'

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = { sign:false, login: false}
    
  }
  onOpenRegister = () => {
    this.setState({sign: true});
  };

  onOpenLogin = () => {
    this.setState({login:true})
  }

  onCloseRegister = () => {
    this.setState({sign:false})
  }

  onCloseLogin = () => {
    this.setState({login:false})
  }

  render() {
    const { login, sign } = this.state;
    return (
      <div className={ styles.nav }>
        <ul>
        <li>
            <Link to="/" className={styles.logo}>Slurps</Link>
       </li>
       </ul>
        <input className={styles.searchbar}type="text" placeholder="Search.."></input>
        <button className={styles.button} onClick={this.onOpenLogin}>Log in</button>
        <button className={styles.button2}onClick={this.onOpenRegister}>Register</button>
        <Modal isOpen={sign}>
          <h3>THis is modal</h3>
        </Modal>
        <ul>
          <li>
            <Link to="/restaurants">Restaurants</Link>
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

