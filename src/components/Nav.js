import styles from './../css/Nav.module.css'
import React, { Component, useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import Register from './Register'
import Modal from 'react-modal'
import SearchView from './SearchView';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      sign:false, 
      login: false,
      items: props.restaurants,  // Xóa props ở routerURL sau !!!
      searchString: '',
      appear: 'none',
    }
    
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
  
  onSearchFieldChange = (e) => {
    if(e.target.value) {
      this.setState({ 
        searchString: e.target.value,
        appear: 'block'      
      });
    }
    else {
      this.setState({ 
        searchString: e.target.value,
        appear: 'none'
      });
    }
  }

  changePage = () => {
    this.setState({
      searchString: '',
      appear: 'none'
    })
  }

  onCloseEvent = () => {
    this.setState({
      searchString: '',
      appear: 'none'
    })
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      console.log('Enterd')
      // window.location='/restaurants';
    }
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
        <div style={{ position: 'relative' }}>
          <div className={styles.wholeSearchBar}>
            <input className={styles.searchbar} type="text" placeholder="Search.."
              type="text" onChange={ this.onSearchFieldChange } onKeyPress={this.handleKeyPress}
              value={ this.state.searchString } placeholder="Find restaurant">
            </input>
            <button className={styles.button} onClick={this.onCloseEvent}>X</button>
          </div>
          <div className={ styles.popupSearch} style={{ display: `${this.state.appear}` }}>
            <SearchView
              items={ this.state.items.filter(item => item.name.toLowerCase().includes(this.state.searchString.toLowerCase())) }
              onChangePage= { this.changePage }
            />
          </div>
        </div>
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

