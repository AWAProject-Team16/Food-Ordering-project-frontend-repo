import styles from './../css/Nav.module.css';
import React from 'react';
import { Link } from "react-router-dom";
import Register from './Register';
import Modal from 'react-modal';
import Login from './Login';
import SearchView from './SearchView';
import { useNavigate } from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      sign:false, 
      login: false,
      userJwt:null,
      CartItems: 0,
      // items: props.restaurants,
      searchString: '',
      appear: 'none',
    }
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

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      localStorage.setItem('valueOfInput', e.target.value)
      // window.location='/restaurants';
      this.props.navigate('/search')
      this.setState({
        searchString: '',
        appear: 'none'
      })
    }
  }

  // Added by Thuc
  showOrderHistoryForCustomer = () => {
    const token = window.localStorage.getItem('appAuthData');
    if (!token) return <></>;
    const jwt = require('jsonwebtoken');
    const payload = jwt.decode(token);
    const account_type = payload.account_type;
    if (account_type === 1) return <li><Link to="/orders">Customer Order History</Link></li>;
    else return <></>
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
        
        <Modal isOpen={sign} >
          <button onClick={this.onCloseRegister}>Close</button>
       <Register />
       </Modal>
       
        <div style={{ position: 'relative' }}>
          <div className={styles.wholeSearchBar}>
            <input className={styles.searchbar} type="text" placeholder="Find restaurant"
              onChange={ this.onSearchFieldChange } onKeyPress={this.handleKeyPress}
              value={ this.state.searchString }>
            </input>
            <button className={styles.button} onClick={this.onCloseEvent}>X</button>
          </div>
          <div className={ styles.popupSearch} style={{ display: `${this.state.appear}` }}>
            <SearchView
              items={ this.props.restaurants.filter(item => item.name.toLowerCase().includes(this.state.searchString.toLowerCase())) }
              onChangePage= { this.changePage }
            />
          </div>
        </div>
       
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
          {/* Added by Thuc */}
          {this.showOrderHistoryForCustomer()}
        </ul>
      </div>
    )

  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Nav {...props} navigate={navigate} />
  }
  
export default WithNavigate