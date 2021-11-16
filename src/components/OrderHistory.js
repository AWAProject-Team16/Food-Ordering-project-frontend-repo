import React from 'react';
import styles from './OrderHistory.module.css';
import OrderHistoryCriterionInput from './OrderHistoryCriterionInput';
import OrderHistoryCriterionSelect from './OrderHistoryCriterionSelect';
import OrderHistoryListItem from './OrderHistoryListItem';

export default class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          users_idusers: 22,  // customer id
          order_date: "Mon, Nov 15 2021 10:07:48 GMT",
          order_delivery_location: "Kirkokatu 123, Oulu",
          order_status: "Received",
          order_status_extra_info: "",
          order_total_cost: 19.5
        },
        {
          restaurants_idrestaurants: 122,
          idorders: 44,
          users_idusers: 21,  // customer id
          order_date: "Mon, 12 Nov 2021 11:07:48 GMT",
          order_delivery_location: "Tamontie 123, Oulu",
          order_status: "Delivering",
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

      orderStatusData: ["Received", "Preparing", "Ready for delivery", "Delivering", "Delivered", "Closed"],  // ko xóa khi có BE

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
        <div className={styles.searchArea}>
          <OrderHistoryCriterionSelect title="Restaurant" stdData={this.getStdRestaurantData()} />
          <OrderHistoryCriterionInput title="Order number" />
          <OrderHistoryCriterionSelect title="Order Status" stdData={this.getStdOrderData()} />
          <OrderHistoryCriterionInput title="Customer Name" />
          <OrderHistoryCriterionInput title="From" type="date" />
          <OrderHistoryCriterionInput title="To" type="date" />

          <div className={styles.criterion}><button>Search</button></div>
        </div>
        <div className={styles.orderList}>
          <OrderHistoryListItem />
        </div>
      </div>
    )
  }
}