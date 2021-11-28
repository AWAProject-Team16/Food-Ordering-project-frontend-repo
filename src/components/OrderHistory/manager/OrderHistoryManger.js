import React from 'react';
import styles from '../../../css/OrderHistory.module.css';
import OrderHistoryPerRestaurant from './OrderHistoryPerRestaurant';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_ADDRESS;

export default class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      restaurantData: [],
      orderStatusData: [],
      isManagerView: true,
    }
  }

  updateAnOrder = (newOrder) => {
    console.log(newOrder)
    let orderData = [...this.state.orderData];
    const matchedOrderIndex = this.state.orderData.findIndex(order => order.idorders === newOrder.idorders);
    if (matchedOrderIndex > -1) {
      orderData[matchedOrderIndex] = newOrder;
      this.setState({orderData});
    }
  }

  getStdRestaurantData() {
    const stdData = this.state.restaurantData.map(item => {
      return {name: item.name, value: item.idrestaurants}
    });
    return stdData;
  }

  getStdOrderData() {
    const stdData = this.state.orderStatusData.map((item, index) => {
      return {name: item, value: index}
    });
    return stdData;
  }

  render() {
    return (
      <div>
        <h2>Order History</h2>
        {this.state.restaurantData.map((restaurant, index) => {
          return <div className={styles.orderHistoryPerRestaurant} key={index}>
            <OrderHistoryPerRestaurant
              {...this.state}
              updateAnOrder={this.updateAnOrder}
              name={restaurant.name}
              orderData={this.state.orderData.filter(order => {
                return order.restaurants_idrestaurants === restaurant.idrestaurants;
              })}
            />
          </div>
        })}
      </div>
    )
  }

  componentDidMount() {
    //Fetch data from api
    this.setState({
      orderData: [
        {
          restaurants_idrestaurants: 99,
          idorders: 3,
          users_idusers: 22,  // customer id
          order_date: "Fri, 12 Nov 2021 18:47:48 GMT",
          order_delivery_location: "Tapiontie 123, Oulu",
          order_status: "Received",
          order_status_extra_info: "",
          order_total_cost: 19.5
        },
        {
          restaurants_idrestaurants: 100,
          idorders: 4,
          users_idusers: 21,  // customer id
          order_date: "Fri, 12 Nov 2021 18:47:48 GMT",
          order_delivery_location: "Uusikatu 123, Oulu",
          order_status: "Delivering",
          order_status_extra_info: "Fri, 12 Nov 2021 19:00:00 GMT",
          order_total_cost: 200
        },
        {
          restaurants_idrestaurants: 111,
          idorders: 5,
          users_idusers: 5,  // customer id
          order_date: "Mon, Nov 15 2021 10:07:48 GMT",
          order_delivery_location: "Kirkokatu 123, Oulu",
          order_status: "Closed",
          order_status_extra_info: "",
          order_total_cost: 19.5
        },
        {
          restaurants_idrestaurants: 99,
          idorders: 44,
          users_idusers: 4,  // customer id
          order_date: "Mon, 12 Nov 2021 11:07:48 GMT",
          order_delivery_location: "Tamontie 123, Oulu",
          order_status: "Ready for delivery",
          order_status_extra_info: "Mon, 12 Nov 2021 11:30:00 GMT",
          order_total_cost: 200
        }
      ],

      restaurantData: [
        {
          idrestaurants: 99,
          name: "Restaurant A"
        },
        {
          idrestaurants: 100,
          name: "Restaurant B"
        },
        {
          idrestaurants: 111,
          name: "Restaurant C"
        },
        {
          idrestaurants: 122,
          name: "Restaurant D"
        },

      ],

      orderStatusData: ["Received", "Preparing", "Ready for delivery", "Delivering", "Delivered", "Closed"]

    });

    console.log('Axios GET request with body')

    axios({
      method: 'get',
      url: API_URL + '/orders',
      data: {
        userId: 1
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))

    // axios.get(API_URL+'/orders', {
    //   // headers: {
    //   //   'Content-Type': 'application/x-www-form-urlencoded',
    //   //   'Accept': '*/*',
    //   //   'Accept-Encoding': 'gzip, deflate, br'
    //   // },
    //   data: {userId: 1}
    // })
    //   .then(res => console.log(res))

    // fetch('http://localhost:4000/orders/managers/all', {
    //   method: 'GET',
    //   body: JSON.stringify({userId: 1})
    // })
    //   .then(res => res.json())
    //   .then(data => console.log(data))
  }
}