import styles from './../css/Nav.module.css'
import React, { Component, useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import Register from './Register'
import Modal from 'react-modal'
import Login from './Login'

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = { sign: false, login: false, CartItems: 0, userJwt:null }

  }

  onOpenRegister = () => {
    this.setState({ sign: true });
  };

  onOpenLogin = () => {
    this.setState({ login: true })
  }

  onCloseRegister = () => {
    this.setState({ sign: false })
  }

  onCloseLogin = () => {
    this.setState({ login: false })
  }
  logOut = () => {
    this.setState({userJwt:null})
    this.props.nav(this.state.userJwt)
    window.localStorage.removeItem('appAuthData')
  }
  passToken = () => {

    this.props.nav(this.state.userJwt)
  }

  render() {
    const { login, sign } = this.state;
    return (
      <div className={styles.nav}>
        <ul>
          <li>
            <Link to="/" className={styles.logo}>Slurps</Link>
          </li>
        </ul>
        <input className={styles.searchbar} type="text" placeholder="Search.."></input>
        
        
        <Modal isOpen={sign} >
          <button onClick={this.onCloseRegister}>Close</button>
          <Register />
        </Modal>
        <Modal isOpen={login}>
        
          <button onClick={this.onCloseLogin}>Close</button>

        <Login login ={ (newJwt => {
          this.setState({userJwt: newJwt})
          window.localStorage.setItem('appAuthData', this.state.userJwt)
          this.passToken()
          this.onCloseLogin()
        })}/>
        </Modal>

         <div>
          {this.props.userLoggedIn 
          ? <button className={styles.button2} onClick = {this.logOut}  > Log out </button>
          :
          <div>
          <button className={styles.button} onClick={this.onOpenLogin}>Log in</button>  
          <button className={styles.button2}onClick={this.onOpenRegister}>Register</button>
          </div>
          }
          </div>

        <ul>
          <li>
            <Link to="/restaurants">Restaurants</Link>
          </li>
          <li>
            <Link to="/shoppingcart">ShoppingCart [{this.props.CartQty}]</Link>
            {/* <NavLink to="/shoppingcart" activeClassName="selected">ShoppingCart</NavLink> */}
          </li>
        </ul>
      </div>
    )

  }
}

