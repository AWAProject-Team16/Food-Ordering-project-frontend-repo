import React, {useState, useEffect} from 'react';
import styles from '../../../css/OrderHistory.module.css';
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
  const [orderStatusExtraInfo, setOrderStatusExtraInfo] = useState(props.orderData.order_status_extra_info);

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
      console.log(orderStatusExtraInfo)
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

  // function getOffset(el) {
  //   var rect = el.getBoundingClientRect();
  //   return {
  //     left: rect.left + window.pageXOffset,
  //     top: rect.top + window.pageYOffset,
  //     width: rect.width || el.offsetWidth,
  //     height: rect.height || el.offsetHeight
  //   };
  // }

  // function connect(div1, div2, color, thickness) { // draw a line connecting elements
  //   var off1 = getOffset(div1);
  //   var off2 = getOffset(div2);
  //   // bottom right
  //   var x1 = off1.left + off1.width;
  //   var y1 = off1.top + off1.height;
  //   // top right
  //   var x2 = off2.left + off2.width;
  //   var y2 = off2.top;
  //   // distance
  //   var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
  //   // center
  //   var cx = ((x1 + x2) / 2) - (length / 2);
  //   var cy = ((y1 + y2) / 2) - (thickness / 2);
  //   console.log(div1, div1.offsetTop, div1.offsetHeight, div1.offsetLeft, div1.offsetWidth)
  //   cy = div1.offsetTop + div1.offsetHeight / 2;
  //   cx = div1.offsetLeft + div1.offsetWidth / 2;
  //   // angle
  //   var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI); angle = 90;
  //   // make hr
  //   const line = document.querySelector('#line');
  //   line.style = `padding:0px; margin:0px; height:${thickness}; background-color:${color}; line-height:1px; position:absolute; left:${cx}px; top:${cy}px; width:${length}px; -moz-transform:rotate(${angle}deg); -webkit-transform:rotate(${angle}deg); -o-transform:rotate(${angle}deg); -ms-transform:rotate(${angle}deg); transform:rotate(${angle}deg);`;
  // }

  // useEffect(() => {
  //   const firstStatusImage = document.querySelector('#firstStatusImage')
  //   const lastStatusImage = document.querySelector('#lastStatusImage')
  //   connect(firstStatusImage, lastStatusImage, "#000", "1px");
  // });

  return (
    <div>
      <div>
        <div className={styles.wrapper}>
          <div className={cx(styles.inner, styles.flex)}>
            <form action="" className={styles.form}>
              <h3>Order Details</h3>
              {props.isManagerView && <div className={styles.formwrapper}>
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
              </div>}

              {props.isManagerView && <div className={styles.formwrapper}>
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
                  onChange={event => setOrderStatusExtraInfo(event.target.value)}
                />
              </div>}

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
                  value={new Date(props.orderData.order_date).toLocaleString()}
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

            {!props.isManagerView && <div className={styles.orderTracking}>
              <h3>Order Tracking</h3>
              <div className={styles.relative}>
                <div className={styles.line}></div>
                <div className={styles.flex}>
                  <div id="firstStatusImage" className={cx(styles.orderStatusPlaceholderImage, styles.prevStatus)}></div>
                  <div className={styles.orderStatusText}>
                    <b>Received</b>
                    <div></div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div className={cx(styles.orderStatusPlaceholderImage, styles.prevStatus)}></div>
                  <div className={styles.orderStatusText}>
                    <b>Preparing</b>
                    <div>(in 30 minutes)</div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div className={cx(styles.orderStatusPlaceholderImage, styles.prevStatus)}></div>
                  <div className={styles.orderStatusText}>
                    <b>Ready for delivery</b>
                    <div>(in 30 minutes)</div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div className={cx(styles.orderStatusPlaceholderImage, styles.prevStatus)}></div>
                  <div className={styles.orderStatusText}>
                    <b>Delivering</b>
                    <div>(in 30 minutes)</div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div id="div5" className={cx(styles.orderStatusPlaceholderImage, styles.currentStatus)}>5</div>
                  <div className={styles.orderStatusText}>
                    <b>Delivered</b>
                    <div></div>
                  </div>
                </div>
                <div className={styles.flex}>
                  <div id="lastStatusImage" className={styles.orderStatusPlaceholderImage}>6</div>
                  <div className={styles.orderStatusText}>
                    <b>Closed</b>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}
