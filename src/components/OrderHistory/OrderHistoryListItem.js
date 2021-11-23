import React from 'react';
import styles from '../../css/OrderHistory.module.css';
import cx from 'classnames';
import Modal from 'react-modal';
import OrderHistoryDetailView from './OrderHistoryDetailView';

Modal.setAppElement('#root');

export default class OrderHistoryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isModalOpen: false};
  }

  openModal = () => {
    this.setState({isModalOpen: true});
  }

  closeModal = () => {
    this.setState({isModalOpen: false});
  }

  render() {
    const statusIndex = this.props.orderStatusData.indexOf(this.props.orderData.order_status);
    const colors = [styles.order_status_color_0, styles.order_status_color_1, styles.order_status_color_2, styles.order_status_color_3, styles.order_status_color_4, styles.order_status_color_5]
    const statusColor = colors[statusIndex];

    let jsx;

    if (!this.props.orderData || Object.keys(this.props.orderData).length === 0) {
      jsx = <div>(No order found.)</div>
    } else {
      jsx =
        <div className={cx(styles.flex, styles.OrderHistoryListItem)}>
          <div className={styles.column1}>{this.props.orderData.idorders}</div>
          <div className={cx(styles.column2, statusColor)}>{this.props.orderData.order_status}</div>
          <div className={styles.column3}>&euro;{this.props.orderData.order_total_cost}</div>
          <div className={styles.column4}>{new Date(this.props.orderData.order_date).toLocaleDateString()}</div>
          <button onClick={this.openModal} className={cx(styles.column5, styles.viewDetails)}>View Details</button>

          <Modal isOpen={this.state.isModalOpen} onRequestClose={this.closeModal}>
            <span className={styles.close} onClick={this.closeModal}></span>
            <OrderHistoryDetailView
              {...this.props} />
          </Modal>
        </div>
    }

    return jsx;
  }
}
