import React from 'react';
import styles from './OrderHistory.module.css';

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

      orderStatusData: ["Received", "Preparing", "Ready for delivery", "Delivering", "Delivred", "Closed"],  // ko xóa khi có BE

    }
  }

  render() {
    return (
      <div>
        <h2>Order History</h2>
        <div className={styles.searchArea}>
          <div className={styles.criterion}>
            <div className={styles.criterionTitle}>Restaurant</div>
            <div className={styles.criterionInput}>
              <select>
                <option value="-1">All</option>
                {this.state.restaurantData.map((item, index) => <option key={index} value={item.idrestaurants}>{item.name}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.criterion}>
            <div className={styles.criterionTitle}>Order number</div>
            <div className={styles.criterionInput}>
              <input type="text"></input>
            </div>
          </div>

          <div className={styles.criterion}>
            <div className={styles.criterionTitle}>Status</div>
            <div className={styles.criterionInput}>
              <select>
                <option value="-1">All</option>
                {this.state.orderStatusData.map((item, index) => <option key={index} value={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.criterion}>
            <div className={styles.criterionTitle}>Customer Name</div>
            <div className={styles.criterionInput}>
              <input type="text"></input>
            </div>
          </div>

          <div className={styles.criterion}>
            <div className={styles.criterionTitle}>From</div>
            <div className={styles.criterionInput}>
              <input type="date" className={styles.input_date}></input>
            </div>
          </div>

          <div className={styles.criterion}>
            <div className={styles.criterionTitle}>To</div>
            <div className={styles.criterionInput}>
              <input type="date" className={styles.input_date}></input>
            </div>
          </div>
          <div className={styles.criterion}><button>Search</button></div>
        </div>
        <div className={styles.orderList}>

        </div>
      </div>
    )
  }
}