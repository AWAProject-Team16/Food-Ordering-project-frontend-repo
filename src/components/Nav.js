import styles from "./../css/Nav.module.css";
import React, { createRef } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";
import Modal from "react-modal";
import Login from "./Login";
import SearchView from "./SearchView";
import { useNavigate } from "react-router-dom";
import { BiRestaurant } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { IoReceipt } from "react-icons/io5";
import cx from "classnames";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sign: false,
      login: false,
      userJwt: null,
      typeJwt: null,
      CartItems: 0,
      searchString: "",
      appear: "none",

      count: 0,
    };

    this.ref = createRef();
  }

  onOpenRegister = () => {
    this.setState({ sign: true });
  };

  onOpenLogin = () => {
    this.setState({ login: true });
  };

  onCloseRegister = () => {
    this.setState({ sign: false });
  };

  onCloseLogin = () => {
    this.setState({ login: false });
  };
  logOut = () => {
    window.localStorage.clear();

    this.state.userJwt = null;
    this.state.typeJwt = null;
    this.passToken();
    this.props.navigate("/");
  };

  passToken = () => {
    this.props.nav(this.state.userJwt);
    this.props.navType(this.state.typeJwt);
  };

  onSearchFieldChange = (e) => {
    if (e.target.value) {
      this.setState({
        searchString: e.target.value,
        appear: "block",
      });
    } else {
      this.setState({
        searchString: e.target.value,
        appear: "none",
      });
    }
  };

  changePage = () => {
    this.setState({
      searchString: "",
      appear: "none",
    });
  };

  onCloseEvent = () => {
    this.setState({
      searchString: "",
      appear: "none",
    });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      localStorage.setItem("valueOfInput", e.target.value);
      this.props.navigate("/search");
      this.setState({
        searchString: "",
        appear: "none",
      });
    }
  };

  getStaleJwt = () => {
    const jwtToken = window.localStorage.getItem("typeData");
    return jwtToken;
  };

  handleLoadNewOrderOnClick = () => {
    // console.log("kkk", this.props.hasNewOrders);
    if (this.props.hasNewOrders) this.props.setLoadNewOrderOnClick(true);
    else this.props.setLoadNewOrderOnClick(false);
  };

  render() {
    const { login, sign } = this.state;

    return (
      <div>
        <div className={styles.nav}>
          <ul>
            <li>
              <Link to="/" className={styles.logo}>
                Slurps
              </Link>
            </li>
          </ul>

          {this.getStaleJwt() == 2 ? (
            <>
              <Link to="/managers/restaurants" className={styles.navItem}>
                <BiRestaurant size="2em" /> Restaurants
              </Link>
              <Link to="/managers/categories" className={styles.navItem}>
                <MdCategory size="2em" /> Categories
              </Link>
              <Link to="/managers/products" className={styles.navItem}>
                <IoFastFood size="2em" /> Products
              </Link>
              <Link to="/managers/orders" className={styles.navItem} onClick={this.handleLoadNewOrderOnClick}>
                <IoReceipt size="2em" /> Orders
                <div className={cx(styles.notification, this.props.hasNewOrders ? styles.show : styles.hide)}>
                  <span className={styles.notificationText}>&nbsp;new</span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <div>
                <div style={{ position: "relative" }}>
                  <div className={styles.wholeSearchBar}>
                    <input
                      className={styles.searchbar}
                      type="search"
                      placeholder="Find restaurant"
                      onChange={this.onSearchFieldChange}
                      onKeyPress={this.handleKeyPress}
                      value={this.state.searchString}
                    ></input>
                  </div>
                  <div className={styles.popupSearch} style={{ display: `${this.state.appear}` }}>
                    <SearchView
                      items={this.props.restaurants.filter((item) =>
                        item.name.toLowerCase().includes(this.state.searchString.toLowerCase())
                      )}
                      onChangePage={this.changePage}
                    />
                  </div>
                </div>
              </div>
              <Modal
                isOpen={sign}
                onRequestClose={this.onCloseRegister}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                  },
                  content: {
                    top: "0px",
                    left: "0px",
                    border: "none",
                    background: "none",
                  },
                }}
              >
                <button className={styles.button} onClick={this.onCloseRegister}>
                  CLOSE
                </button>
                <Register onCloseRegister={this.onCloseRegister} />
              </Modal>

              <Modal
                isOpen={login}
                onRequestClose={this.onCloseLogin}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                  },
                  content: {
                    top: "0px",
                    left: "0px",
                    border: "none",
                    background: "none",
                  },
                }}
              >
                <button className={styles.button} onClick={this.onCloseLogin}>
                  CLOSE
                </button>
                <Login
                  loginToken={(newJwt) => {
                    this.setState({ userJwt: newJwt });
                    window.localStorage.setItem("appAuthData", this.state.userJwt);
                    window.localStorage.setItem("latestOrderDate", JSON.stringify(new Date(0)));
                    this.passToken();
                    this.onCloseLogin();
                  }}
                  typeToken={(newTypeJwt) => {
                    this.setState({ typeJwt: newTypeJwt });
                    window.localStorage.setItem("typeData", this.state.typeJwt);
                    this.passToken();
                    this.onCloseLogin();
                  }}
                />
              </Modal>

              <div className={styles.wrapButtons}>
                <div>
                  <Link to="/restaurants">
                    <button className={styles.button2}>Restaurants</button>
                  </Link>
                </div>
                <div>
                  <Link to="/shoppingcart">
                    <button className={styles.button2}>ShoppingCart [{this.props.CartQty}]</button>
                  </Link>
                </div>
                <div>
                  <Link to="/orders">
                    <button className={styles.button2}>Order History</button>
                  </Link>
                </div>
              </div>
            </>
          )}

          <div>
            {this.props.userLoggedIn ? (
              <button className={styles.button2} onClick={this.logOut}>
                {" "}
                Log out{" "}
              </button>
            ) : (
              <div>
                <button className={styles.button} onClick={this.onOpenLogin}>
                  Log in
                </button>
                <button className={styles.button2} onClick={this.onOpenRegister}>
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
        <img
          src={`/images/event.png`}
          style={{ height: "360px", width: "100%", display: "block", margin: "auto", marginBottom: "26px" }}
        />
      </div>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Nav {...props} navigate={navigate} />;
}

export default WithNavigate;
