import React from "react";
import styles from "../../../css/OrderHistory.module.css";
import OrderHistoryPerRestaurant from "./OrderHistoryPerRestaurant";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDiaglog from "../../ConfirmationDiaglog";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

export default class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      restaurantData: [],
      orderStatusData: [],
      isManagerView: true,
      newOrdersConfirmDiaglogShowed: false,
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

  fetchData = async () => {
    const token = window.localStorage.getItem("appAuthData");
    if (!token) {
      console.error("No app auth data");
      return;
    }
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

      const restaurantData = _restaurantData.filter((item, index) => {
        return (
          _restaurantData.findIndex((element) => {
            return element.idrestaurants == item.idrestaurants;
          }) == index
        );
      });

      const orderStatusData = ["Received", "Preparing", "Ready for delivery", "Delivering", "Delivered", "Closed"];

      const isManagerView = true;

      this.setState({
        orderData,
        restaurantData,
        orderStatusData,
        isManagerView,
      });

      localStorage.setItem("latestOrderDate", JSON.stringify(new Date(data[0].order_date)));
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div>
        <div className={styles.componentTitle}>Order History</div>
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
        <ToastContainer position="top-center" />
      </div>
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    // console.log("jjjjjj");
    // console.log("this.props.hasNewOrders", this.props.hasNewOrders);
    // console.log("this.props.loadNewOrderOnClick", this.props.loadNewOrderOnClick);
    // console.log("this.state.newOrdersConfirmDiaglogShowed", this.state.newOrdersConfirmDiaglogShowed);
    if (this.props.loadNewOrderOnClick) {
      this.fetchData();
      this.props.setLoadNewOrderOnClick(false);
      // const okcb = () => {
      //   this.fetchData();
      //   // toast.dismiss();
      //   // this.setState({ newOrdersConfirmDiaglogShowed: false });
      // };
      // toast.info(<ConfirmationDiaglog text="You have new orders. Click OK to view them." btn1Text="OK" btn1Callback={okcb} />, {
      //   autoClose: false,
      //   closeOnClick: false,
      //   closeButton: false,
      // });
      // this.setState({ newOrdersConfirmDiaglogShowed: true });
    }
  }
}
