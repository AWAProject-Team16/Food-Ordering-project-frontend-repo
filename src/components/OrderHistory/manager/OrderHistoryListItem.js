import React, {useState} from 'react';
import styles from '../../../css/OrderHistory.module.css';
import cx from 'classnames';
import Modal from 'react-modal';
import OrderHistoryDetailView from './OrderHistoryDetailView';

Modal.setAppElement('#root');

export default function OrderHistoryListItem(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const statusIndex = props.orderStatusData.indexOf(props.orderData.order_status);
  const colors = [styles.order_status_color_0, styles.order_status_color_1, styles.order_status_color_2, styles.order_status_color_3, styles.order_status_color_4, styles.order_status_color_5]
  const statusColor = colors[statusIndex];

  let jsx;

  if (!props.orderData || Object.keys(props.orderData).length === 0) {
    jsx = <div>(No order found.)</div>
  } else {
    jsx =
      <div className={cx(styles.flex, styles.OrderHistoryListItem)}>
        <div className={styles.column1}>{props.orderData.idorders}</div>
        <div className={cx(styles.column2, statusColor)}>{props.orderData.order_status}</div>
        <div className={styles.column3}>&euro;{props.orderData.order_total_cost}</div>
        <div className={styles.column4}>{new Date(props.orderData.order_date).toLocaleDateString()}</div>
        <button onClick={toggleModal} className={cx(styles.column5, styles.viewDetails)}>View Details</button>

        <Modal isOpen={isModalOpen} onRequestClose={toggleModal}>
          <span className={styles.close} onClick={toggleModal}></span>
          <OrderHistoryDetailView {...props}/>
        </Modal>
      </div>
  }

  return jsx;
}
