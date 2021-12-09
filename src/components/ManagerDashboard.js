import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import DashboardCard from "./DashboardCard";
import styles from "../css/_Common.module.css";
import cx from "classnames";

export default function ManagerDashboard() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, settotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [mostPopularDays, setMostPopularDays] = useState([
    { day_name: "", total_order: "" },
  ]);
  const [mostPopularTimes, setMostPopularTimes] = useState([
    { hour: "", total_order: "" },
  ]);
  const [mostPopularProducts, setMostPopularProducts] = useState([
    { product_name: "", total_order: "" },
  ]);

  const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;
  const token = window.localStorage.getItem("appAuthData");
  const name = jwt.decode(token).name;

  useEffect(() => {
    axios
      .get(`${API_ADDRESS}/users/totalRevenueOrdersCustomersForManager`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTotalRevenue(res.data.total_revenue);
        settotalOrders(res.data.total_orders);
        setTotalCustomers(res.data.total_customers);
      })
      .catch(console.error);

    axios
      .get(`${API_ADDRESS}/users/totalRestaurants`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotalRestaurants(res.data.total_restaurants);
      })
      .catch(console.error);

    axios
      .get(`${API_ADDRESS}/users/most4PopularDaysForManager`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMostPopularDays(res.data);
      })
      .catch(console.error);

    axios
      .get(`${API_ADDRESS}/users/most6PopularTimeForManager`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMostPopularTimes(res.data);
      })
      .catch(console.error);

    axios
      .get(`${API_ADDRESS}/users/most3PopularProductsForManager`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMostPopularProducts(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Hello {name} !</h1>
      <div>Here is your statistics</div>
      <br />
      <div className={styles.cardContainer}>
        <DashboardCard
          title="Total Revenue"
          text={<>&euro;{totalRevenue}</>}
          icon="GiReceiveMoney"
          link="/managers/orders"
          color="orange"
        />
        <DashboardCard
          title="Total Orders"
          text={totalOrders}
          icon="IoReceipt"
          link="/managers/orders"
          color="lightblue"
        />
        <DashboardCard
          title="Total Customers"
          text={totalCustomers}
          icon="BsPeopleFill"
          color="lightgreen"
        />
        <DashboardCard
          title="Total Restaurants"
          text={totalRestaurants}
          icon="IoRestaurant"
          link="/managers/restaurants"
          color="lightpink"
        />
        <DashboardCard
          title="Most Popular Day"
          text={mostPopularDays[0].day_name.substring(0, 3)}
          color="white"
        />
        <DashboardCard
          title="Most Popular Time"
          text={
            mostPopularTimes[0].hour ? mostPopularTimes[0].hour + ":00" : ""
          }
          color="white"
        />
        <DashboardCard
          title="Most Ordered Product"
          text={mostPopularProducts[0].product_name}
          color="white"
        />
      </div>
      <h4>Quick Action</h4>
      <div className={styles.quickActionContainer}>
        <Link
          to="/managers/restaurants"
          className={cx(styles.button, styles.quickAction)}
        >
          View my Restaurants
        </Link>
        <Link
          to="/managers/restaurants/create"
          className={cx(styles.button, styles.quickAction)}
        >
          Add a Restaurant
        </Link>
        <Link
          to="/managers/categories"
          className={cx(styles.button, styles.quickAction)}
        >
          View my Categories
        </Link>
        <Link
          to="/managers/categories/create"
          className={cx(styles.button, styles.quickAction)}
        >
          Add a Category
        </Link>
        <Link
          to="/managers/products"
          className={cx(styles.button, styles.quickAction)}
        >
          View my Products
        </Link>
        <Link
          to="/managers/products/create"
          className={cx(styles.button, styles.quickAction)}
        >
          Add a Product
        </Link>
        <Link
          to="/managers/orders"
          className={cx(styles.button, styles.quickAction)}
        >
          Order History
        </Link>
      </div>
    </div>
  );
}
