import React from 'react';
import styles from '../../css/OrderHistory.module.css';
import cx from 'classnames';

const orderStatusData = ["Received", "Preparing", "Ready for delivery", "Delivering", "Delivered", "Closed"];

function showCorrectOrderStatus(event, statusName) {
  event.target.value = orderStatusData.indexOf(statusName);
}

export default function OrderHistoryDetailView(props) {
  console.log(props)

  return (
    <div>
      <div>
        <div className={styles.wrapper}>
          <div className={styles.inner}>
            <form action="" name="registrationForm" className={styles.form}>
              <h3>Order Details</h3>
              <div className={styles.formwrapper}>
                <label htmlFor="">Restaurant</label>
                <input type="text" className={styles.formcontrol} />
              </div>
              <div className={styles.formwrapper}>
                <label htmlFor="">Order Number</label>
                <input type="text" className={styles.formcontrol} value={props.orderData} />
              </div>
              <div className={styles.formwrapper}>
                <label htmlFor="">Customer Name</label>
                <input type="text" className={styles.formcontrol} />
              </div>
              <div className={styles.formwrapper}>
                <label htmlFor="">Order Date</label>
                <input type="text" className={styles.formcontrol} />
              </div>
              <div className={styles.formwrapper}>
                <label htmlFor="">Order Delivery Location</label>
                <input type="text" className={styles.formcontrol} />
              </div>
              <div className={styles.formwrapper}>
                <label htmlFor="">Order Status</label>
                <select
                  className={cx(styles.formcontrol, styles.select)}
                  onLoad={event => showCorrectOrderStatus(event, props.orderData.order_status)}>
                  {orderStatusData.map((statusName, index) => {
                    return <option value={index} key={index} >{statusName}</option>
                  })}
                </select>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
