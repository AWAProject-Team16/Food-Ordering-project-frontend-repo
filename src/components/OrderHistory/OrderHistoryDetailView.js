import React, {useState} from 'react';
import styles from '../../css/OrderHistory.module.css';
import cx from 'classnames';
import {FaEdit, FaCheck} from 'react-icons/fa';

export default function OrderHistoryDetailView(props) {
  // Call API
  const apiCustomerData = [
    {idcustomers: 22, name: 'Bill Gates'},
    {idcustomers: 21, name: 'Elon Musk'},
    {idcustomers: 5, name: 'Oprah Winfrey'},
    {idcustomers: 4, name: 'Taylor Swift'},
  ];

  const [orderStatus, setOrderStatus] = useState(props.orderData.order_status);
  const [orderStatusExtraInfo, setOrderStatusExtraInfo] = useState("");

  const toggleShowHide = (element) => {
    //Toggle the 'show' and 'hide' className of an element
    try {
      if (Array.from(element.classList).includes(styles.show)) {
        element.classList.remove(styles.show);
        element.classList.add(styles.hide);
      } else if (Array.from(element.classList).includes(styles.hide)) {
        element.classList.remove(styles.hide);
        element.classList.add(styles.show);
      } else {
        console.log('Welcome To Finland')
      }
    } catch (e) {
      console.log('Null/Invalid element arg');
    }
  }

  const apiSetStatus = () => {
    //Call API
    //If succeeded, update parent via callback

  }

  const editOrderStatus = (event) => {
    //Toggle icon
    const FaEdit = document.querySelector('#FaEdit');
    const FaCheck = document.querySelector('#FaCheck');
    toggleShowHide(FaEdit);
    toggleShowHide(FaCheck);
    //Toggle dropdown and ETC's enability
    const selectElement = document.getElementsByClassName(styles.select)[0];
    selectElement.disabled = !selectElement.disabled;
    const ETCElement = document.getElementsByClassName(styles.ETC)[0];
    ETCElement.disabled = !ETCElement.disabled;
    let message = document.querySelector(`.${styles.errormessage}.order_status`);
    message.innerHTML = "Click order status and choose!";
    message.style.display = "inline-block";
    const ETCmessage = document.querySelector(`.${styles.errormessage}.ETC`);
    ETCmessage.style.display = "inline-block";
    //If icon=check icon
    //  Save new status: client & backend
    //  Disable this button for 1 second before enabling it again
    if (Array.from(FaCheck.classList).includes(styles.hide)) { // After clicked, FaCheck change to hide
      //Update parent on client side first, for better UX
      const newOrder = {...props.orderData, order_status: orderStatus, order_status_extra_info: orderStatusExtraInfo};
      props.updateAnOrder(newOrder);
      //Call api to save new status
      console.log('API called. New status set!')
      let message = document.querySelector(`.${styles.errormessage}.order_status`);
      message.innerHTML = "New status set!";
      setTimeout(() => {
        message.style.display = "none";
        ETCmessage.style.display = "none";
      }, 1000);
    }

  }

  const getCustomerName = (idcustomers) => {
    const matchedCustomer = apiCustomerData.find(customer => customer.idcustomers === idcustomers);
    if (matchedCustomer) return matchedCustomer.name;
    else return undefined;
  }

  const getRestaurantName = (idrestaurants) => {
    const matchedRestaurant = props.restaurantData.find(restaurant => restaurant.idrestaurants === idrestaurants);
    if (matchedRestaurant) return matchedRestaurant.name;
    else return undefined;
  }

  return (
    <div>
      <div>
        <div className={styles.wrapper}>
          <div className={styles.inner}>
            <form action="" name="registrationForm" className={styles.form}>
              <h3>Order Details</h3>
              <div className={styles.formwrapper}>
                <label htmlFor="order_status">
                  Order Status
                  <span htmlFor="" className={cx(styles.errormessage, "order_status")} >
                    Click order status and choose!
                  </span>
                </label>
                <div className={styles.flex}>
                  <select
                    disabled
                    className={cx(styles.formcontrol, styles.select)}
                    value={orderStatus}
                    onChange={event => setOrderStatus(event.target.value)}>
                    {props.orderStatusData.map((statusName, index) => {
                      return <option value={statusName} key={index} >{statusName}</option>
                    })}
                  </select>
                  <div onClick={event => editOrderStatus(event)} className={styles.editButton}>
                    <FaEdit size="2em" className={cx(styles.show)} id="FaEdit" />
                    <FaCheck size="2em" className={cx(styles.hide)} id="FaCheck" />
                  </div>
                </div>
              </div>

              <div className={styles.formwrapper}>
                <label htmlFor="">
                  Estimated Time of Completion
                  <span htmlFor="" className={cx(styles.errormessage, "ETC")} >
                    Dont't forget ETC!
                  </span>
                </label>
                <input
                  disabled
                  type="text"
                  className={cx(styles.formcontrol, styles.ETC)}
                  value={orderStatusExtraInfo}
                  onChange={e => setOrderStatusExtraInfo(e.target.value)}
                />
              </div>

              <div className={styles.formwrapper}>
                <label htmlFor="">Restaurant</label>
                <input
                  disabled
                  type="text"
                  className={styles.formcontrol}
                  value={getRestaurantName(props.orderData.restaurants_idrestaurants)} />
              </div>

              <div className={styles.formwrapper}>
                <label htmlFor="">Order Number</label>
                <input
                  disabled
                  type="text"
                  className={styles.formcontrol}
                  value={props.orderData.idorders}
                />
              </div>

              <div className={styles.formwrapper}>
                <label htmlFor="">Customer Name</label>
                <input
                  disabled
                  type="text"
                  className={styles.formcontrol}
                  value={getCustomerName(props.orderData.users_idusers)}
                />
              </div>

              <div className={styles.formwrapper}>
                <label htmlFor="">Order Date</label>
                <input
                  disabled
                  type="text"
                  className={styles.formcontrol}
                  value={new Date(props.orderData.order_date).toLocaleDateString()}
                />
              </div>

              <div className={styles.formwrapper}>
                <label htmlFor="">Order Delivery Location</label>
                <input
                  disabled
                  type="text"
                  className={styles.formcontrol}
                  value={props.orderData.order_delivery_location}
                />
              </div>

              <div className={styles.formwrapper}>
                <label htmlFor="">Total Cost</label>
                <input
                  disabled
                  type="text"
                  className={styles.formcontrol}
                  value={props.orderData.order_total_cost}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
