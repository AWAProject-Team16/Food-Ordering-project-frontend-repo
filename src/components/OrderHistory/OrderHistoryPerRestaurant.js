import React from 'react';
import OrderHistoryListItem from './OrderHistoryListItem';
import styles from '../../css/OrderHistory.module.css';
import cx from 'classnames';

export default function OrderHistoryPerRestaurant(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <div className={styles.orderList}>
        <div className={styles.flex}>
          <div className={cx(styles.column1, styles.title)}>Order no.</div>
          <div className={cx(styles.column2, styles.title)}>Status</div>
          <div className={cx(styles.column3, styles.title)}>Total</div>
          <div className={cx(styles.column4, styles.title)}>Order date</div>
          <div className={cx(styles.column5, styles.title)}></div>
        </div>
        {props.orderData.map((order, index) => {
          return <OrderHistoryListItem
            key={index}
            orderData={order}
            orderStatusData={props.orderStatusData} />
        })}

      </div>
    </div>
  )
}
