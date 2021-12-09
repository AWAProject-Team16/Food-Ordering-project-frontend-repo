import React, { useState, useEffect, createRef } from "react";
import styles from "../../../css/OrderHistory.module.css";
import cx from "classnames";
import { FaEdit, FaCheck } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDiaglog from "../../ConfirmationDiaglog";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;
const confirmDeliveredRef = createRef();

export default function OrderHistoryDetailView(props) {
  const [orderDetailData, setOrderDetailData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const token = window.localStorage.getItem("appAuthData");
    const idorders = props.orderData.idorders;

    axios
      .post(
        `${API_ADDRESS}/orders/orderId/${idorders}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("res.data", res.data);
        setOrderDetailData(res.data);
        setSubTotal(res.data.reduce((total, item) => item.product_cost * item.product_amount + total, 0));
      })
      .catch(console.error);
  }, []);

  const [orderStatus, setOrderStatus] = useState(props.orderData.order_status);
  const [orderStatusExtraInfo, setOrderStatusExtraInfo] = useState(props.orderData.order_status_extra_info);

  useEffect(() => {
    if (props.isManagerView) hideEditButtonIfClosedStatus();
  }, []);

  useEffect(() => {
    const orderStatusNumber = props.orderStatusData.indexOf(orderStatus) + 1;
    const statusImages = Array.from(document.getElementsByClassName(styles.defaultStatus));
    const customerETCs = Array.from(document.getElementsByClassName(styles.customerETC));

    statusImages.forEach((element) => {
      const siblingOrder = Number(element.getAttribute("data-sibling-order"));

      if (siblingOrder < orderStatusNumber) {
        element.classList.remove(styles.currentStatus);
        element.classList.add(styles.prevStatus);
      } else if (siblingOrder === orderStatusNumber) {
        element.classList.remove(styles.prevStatus);
        element.classList.add(styles.currentStatus);

        if (orderStatusNumber === 6) {
          // Last "Closed" status
          element.classList.remove(styles.currentStatus);
          element.classList.add(styles.prevStatus);
        }

        if (orderStatusNumber === 4) {
          // Show 'Confirm Delivered' btn
          confirmDeliveredRef.current.classList.remove(styles.hide);
          confirmDeliveredRef.current.classList.add(styles.show);
        }
      }
    });

    customerETCs.forEach((element) => {
      const siblingOrder = Number(element.getAttribute("data-sibling-order"));

      if (siblingOrder < orderStatusNumber) {
        element.classList.remove(styles.show);
        element.classList.add(styles.hide);
      } else if (siblingOrder === orderStatusNumber) {
        element.classList.remove(styles.hide);
        element.classList.add(styles.show);
      }
    });
  }, [orderStatus]);

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
        console.log("Unexpected case!");
      }
    } catch (e) {
      console.error("Null/Invalid element arg");
    }
  };

  const hideEditButtonIfClosedStatus = () => {
    if (orderStatus === "Closed") {
      const FaEdit = document.querySelector(".FaEdit");
      FaEdit.classList.remove(styles.show);
      FaEdit.classList.add(styles.hide);
    }
  };

  const editOrderStatus = () => {
    //Toggle icon
    const FaEdit = document.querySelector(".FaEdit");
    const FaCheck = document.querySelector(".FaCheck");
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
    if (Array.from(FaCheck.classList).includes(styles.hide)) {
      // After clicked, FaCheck change to hide

      const updateParent = () => {
        // For better UX
        const newOrder = {
          ...props.orderData,
          order_status: orderStatus,
          order_status_extra_info: orderStatusExtraInfo,
        };
        props.updateAnOrder(newOrder);
      };

      const callAPIToSaveNewStatus = () => {
        const token = window.localStorage.getItem("appAuthData");

        axios
          .post(
            `${API_ADDRESS}/orders/updateOrderStatusAndETC`,
            {
              idorders: props.orderData.idorders,
              order_status: orderStatus,
              order_status_extra_info: orderStatusExtraInfo,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              toast.success("Order updated successfully.");
              if (props.isManagerView) hideEditButtonIfClosedStatus();
            }
          })
          .catch(console.error);
      };

      const toggleGuidingMessage = (newStatusSetMessage) => {
        let message = document.querySelector(`.${styles.errormessage}.order_status`);
        message.innerHTML = newStatusSetMessage;
        setTimeout(() => {
          message.style.display = "none";
          ETCmessage.style.display = "none";
        }, 1000);
      };

      // Ask for confirmation before setting order status to Closed (unchangable after that)
      if (orderStatus === "Closed") {
        let actionConfirmed = false;
        const yesCallback = () => {
          actionConfirmed = true;
          toast.dismiss();
          updateParent();
          callAPIToSaveNewStatus();
          toggleGuidingMessage("New status set!");
        };
        const noCallback = () => {
          actionConfirmed = false;
          toast.dismiss();
          setOrderStatus(props.orderData.order_status);
          toggleGuidingMessage("Old status is reserved.");
        };

        toast.warn(
          <ConfirmationDiaglog
            text="Once set to 'Closed', the order is locked and unchangable. Are you sure you want to continue?"
            btn1Text="Yes"
            btn1Callback={yesCallback}
            btn2Text="No"
            btn2Callback={noCallback}
          />,
          { autoClose: false, closeOnClick: false }
        );

        if (!actionConfirmed) return;
      } else {
        updateParent();
        callAPIToSaveNewStatus();
        toggleGuidingMessage("New status set!");
      }
    }
  };

  const getRestaurantName = (idrestaurants) => {
    const matchedRestaurant = props.restaurantData.find((restaurant) => restaurant.idrestaurants === idrestaurants);
    if (matchedRestaurant) return matchedRestaurant.name;
    else return undefined;
  };

  const handleConfirmDelivered = () => {
    const token = window.localStorage.getItem("appAuthData");
    const idorders = props.orderData.idorders;

    axios
      .get(`${API_ADDRESS}/orders/confirmDelivered/${idorders}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(
            <ConfirmationDiaglog
              text="Done! Now waiting for the restaurant owner to close this order."
              btn1Text="OK"
              btn1Callback={() => window.location.reload()}
            />,
            { autoClose: false, closeOnClick: false, closeButton: false, draggable: false }
          );
          setOrderStatus("Delivered");
          confirmDeliveredRef.current.classList.add(styles.hide);
          confirmDeliveredRef.current.classList.remove(styles.show);
        }
      })
      .catch(console.error);
  };

  return (
    <div>
      <div>
        <div className={styles.wrapper}>
          <div className={cx(styles.inner, styles.orderDetailContainer)}>
            <form action="" className={styles.form}>
              <h3>Order Details</h3>
              {props.isManagerView && (
                <div className={styles.formwrapper}>
                  <label htmlFor="order_status">
                    Order Status
                    <span htmlFor="" className={cx(styles.errormessage, "order_status")}>
                      Click order status and choose!
                    </span>
                  </label>
                  <div className={styles.flex}>
                    <select
                      disabled
                      className={cx(styles.formcontrol, styles.select)}
                      value={orderStatus}
                      onChange={(event) => setOrderStatus(event.target.value)}
                    >
                      {props.orderStatusData.map((statusName, index) => {
                        return (
                          <option value={statusName} key={index}>
                            {statusName}
                          </option>
                        );
                      })}
                    </select>
                    <div onClick={editOrderStatus} className={styles.editButton}>
                      <FaEdit size="2em" className={cx(styles.show, "FaEdit")} />
                      <FaCheck size="2em" className={cx(styles.hide, "FaCheck")} />
                    </div>
                  </div>
                </div>
              )}

              {props.isManagerView && (
                <div className={styles.formwrapper}>
                  <label htmlFor="">
                    Estimated Time of Completion
                    <span htmlFor="" className={cx(styles.errormessage, "ETC")}>
                      Dont't forget ETC!
                    </span>
                  </label>
                  <input
                    disabled
                    type="text"
                    name="order_status_extra_info"
                    className={cx(styles.formcontrol, styles.ETC)}
                    value={orderStatusExtraInfo}
                    onChange={(event) => setOrderStatusExtraInfo(event.target.value)}
                  />
                </div>
              )}

              <div className={styles.formwrapper}>
                <label htmlFor="">Restaurant</label>
                <input
                  disabled
                  type="text"
                  className={styles.formcontrol}
                  value={getRestaurantName(props.orderData.restaurants_idrestaurants)}
                />
              </div>

              <div className={styles.formwrapper}>
                <label htmlFor="">Order Number</label>
                <input disabled type="text" className={styles.formcontrol} value={props.orderData.idorders} />
              </div>

              {props.isManagerView && (
                <div className={styles.formwrapper}>
                  <label htmlFor="">Customer Name</label>
                  <input disabled type="text" className={styles.formcontrol} value={props.orderData.customer_name} />
                </div>
              )}

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
                <input disabled type="text" className={styles.formcontrol} value={props.orderData.order_delivery_location} />
              </div>

              <div className={styles.formwrapper}>
                <label htmlFor="">Total Cost</label>
                <div className={styles.flex}>
                  <span>&euro;</span>
                  <input disabled type="text" className={styles.formcontrol} value={props.orderData.order_total_cost} />
                </div>
              </div>
            </form>

            {!props.isManagerView && (
              <div className={styles.orderTracking}>
                <h3>Order Tracking</h3>
                <div className={styles.relative}>
                  <div className={styles.line}></div>
                  <div className={styles.flex}>
                    <div className={styles.statusImages}>
                      <div data-sibling-order="1" className={cx(styles.orderStatusPlaceholderImage, styles.defaultStatus)}></div>
                      <div data-sibling-order="2" className={cx(styles.orderStatusPlaceholderImage, styles.defaultStatus)}></div>
                      <div data-sibling-order="3" className={cx(styles.orderStatusPlaceholderImage, styles.defaultStatus)}></div>
                      <div data-sibling-order="4" className={cx(styles.orderStatusPlaceholderImage, styles.defaultStatus)}></div>
                      <div data-sibling-order="5" className={cx(styles.orderStatusPlaceholderImage, styles.defaultStatus)}></div>
                      <div data-sibling-order="6" className={cx(styles.orderStatusPlaceholderImage, styles.defaultStatus)}></div>
                    </div>
                    <div className={styles.statusTexts}>
                      <div className={styles.orderStatusText}>
                        <div>
                          <b>Received</b>
                        </div>
                        <div></div>
                      </div>
                      <div className={styles.orderStatusText}>
                        <div>
                          <b>Preparing</b>
                        </div>
                        <div data-sibling-order="2" className={cx(styles.hide, styles.customerETC)}>
                          (in about {orderStatusExtraInfo})
                        </div>
                      </div>
                      <div className={styles.orderStatusText}>
                        <div>
                          <b>Ready for delivery</b>
                        </div>
                        <div data-sibling-order="3" className={cx(styles.hide, styles.customerETC)}>
                          (in about {orderStatusExtraInfo})
                        </div>
                      </div>
                      <div className={styles.orderStatusText}>
                        <div>
                          <b>Delivering</b>
                        </div>
                        <div data-sibling-order="4" className={cx(styles.hide, styles.customerETC)}>
                          (in about {orderStatusExtraInfo})
                        </div>
                      </div>
                      <div className={styles.orderStatusText}>
                        <div>
                          <b>Delivered</b>
                        </div>
                        <div
                          ref={confirmDeliveredRef}
                          className={cx(styles.button, styles.smallButton, styles.hide)}
                          onClick={handleConfirmDelivered}
                        >
                          Confirm Delivered
                        </div>
                      </div>
                      <div className={styles.orderStatusText}>
                        <div>
                          <b>Closed</b>
                        </div>
                        <div></div>
                      </div>
                    </div>
                    <div className={styles.statusTexts}></div>
                  </div>
                </div>
              </div>
            )}

            <table className={styles.tableOrderDetail}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Unit Price</th>
                  <th>Line Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetailData.map((detail, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{detail.product_name}</td>
                    <td>{detail.product_amount}</td>
                    <td>{detail.product_cost}</td>
                    <td>&euro;{detail.product_amount * detail.product_cost}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className={styles.tableHorizontalLine}></tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Subtotal</td>
                  <td>&euro;{subTotal}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Shipping Fee</td>
                  <td>&euro;5</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className={styles.tableHorizontalLine} colSpan="2"></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Grand Total</td>
                  <td>&euro;{subTotal + 5}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
