import React from "react";
import styles from "../../../css/OrderHistory.module.css";
import OrderHistoryPerRestaurant from "./OrderHistoryPerRestaurant";
import axios from "axios";
const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

export default class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      restaurantData: [],
      orderStatusData: [],
      isManagerView: true,
    };
  }

  updateAnOrder = (newOrder) => {
    let orderData = [...this.state.orderData];
    const matchedOrderIndex = this.state.orderData.findIndex((order) => order.idorders === newOrder.idorders);
    if (matchedOrderIndex > -1) {
      orderData[matchedOrderIndex] = newOrder;
      this.setState({ orderData });
    }
  };

  getStdRestaurantData() {
    const stdData = this.state.restaurantData.map((item) => {
      return { name: item.name, value: item.idrestaurants };
    });
    return stdData;
  }

  getStdOrderData() {
    const stdData = this.state.orderStatusData.map((item, index) => {
      return { name: item, value: index };
    });
    return stdData;
  }

  render() {
    console.log("this.state", this.state);
    return (
      <div>
        <h2>Order History</h2>
        {this.state.orderData.length == 0 && "(You have no orders)"}
        {this.state.restaurantData.map((restaurant, index) => {
          return (
            <div key={index}>
              <div className={styles.orderHistoryPerRestaurant}>
                <OrderHistoryPerRestaurant
                  {...this.state}
                  updateAnOrder={this.updateAnOrder}
                  name={restaurant.name}
                  orderData={this.state.orderData.filter((order) => {
                    return order.restaurants_idrestaurants === restaurant.idrestaurants;
                  })}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    const token = window.localStorage.getItem("appAuthData");

    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_ADDRESS}/orders/myOrdersPlusNames`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        const orderData = data;

        const _restaurantData = data.map((item) => {
          return {
            idrestaurants: item.restaurants_idrestaurants,
            name: item.restaurant_name,
          };
        });
        console.log("_restaurantData", _restaurantData);

        // const restaurantData = _restaurantData.filter(
        //   (item, index, self) =>
        //     self.findIndex(
        //       (i) => i.place === item.place && i.name === item.name
        //     ) === index
        // );
        const restaurantData = _restaurantData.filter((item, index) => {
          return (
            _restaurantData.findIndex((element) => {
              return element.idrestaurants == item.idrestaurants;
            }) == index
          );
        });

        console.log("restaurantData", restaurantData);

        const orderStatusData = ["Received", "Preparing", "Ready for delivery", "Delivering", "Delivered", "Closed"];

        const isManagerView = true;

        this.setState({
          orderData,
          restaurantData,
          orderStatusData,
          isManagerView,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }
}
