import React, { useState, useEffect } from "react";
import styles from "../../../css/OrderHistory.module.css";
import cx from "classnames";
import { FaEdit, FaCheck } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDiaglog from "../../ConfirmationDiaglog";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

export default function OrderHistoryDetailView(props) {
  const [orderDetailData, setOrderDetailData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [isConfirmDeliveredBtnShowed, setIsConfirmDeliveredBtnShowed] = useState(false);
  const [orderStatusEnable, setOrderStatusEnable] = useState(false);
  const [orderStatusMessageVisible, setOrderStatusMessageVisible] = useState(false);
  const [orderStatusMessageText, setOrderStatusMessageText] = useState("Click order status and choose!");
  const [ETCEnable, setETCEnable] = useState(false);
  const [ETCMessageText] = useState("Dont't forget ETC!");
  const [ETCMessageVisible, setETCMessageVisible] = useState(false);
  const [FaEditVisible, setFaEditVisible] = useState(true);
  const [FaCheckVisible, setFaCheckVisible] = useState(false);
  const [imgStatuses] = useState([0, 0, 0, 0, 0, 0]);

  const statusTexts = ["Received", "Preparing", "Ready for delivery", "Delivering", "Delivered", "Closed"];

  useEffect(() => {
    const token = window.localStorage.getItem("appAuthData");
    if (!token) {
      console.error("No app auth data");
      return;
    }
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

    for (let i = 0; i < imgStatuses.length; i++) {
      if (i + 1 < orderStatusNumber) {
        imgStatuses[i] = -1;
      } else if (i + 1 == orderStatusNumber) {
        imgStatuses[i] = 1;
        if (orderStatusNumber == 6) imgStatuses[i] = -1;
        if (orderStatusNumber === 4) setIsConfirmDeliveredBtnShowed(true);
      }
    }
  }, [orderStatus]);

  const hideEditButtonIfClosedStatus = () => {
    if (orderStatus === "Closed") {
      setFaEditVisible(false);
    }
  };

  const editOrderStatus = () => {
    //Toggle icon
    setFaEditVisible(!FaEditVisible);
    setFaCheckVisible(!FaCheckVisible);

    //Toggle dropdown and ETC's enability
    setOrderStatusEnable(!orderStatusEnable);
    setETCEnable(!ETCEnable);
    setOrderStatusMessageText("Click order status and choose!");
    setOrderStatusMessageVisible(true);
    setETCMessageVisible(true);

    //If icon=check icon
    //  Save new status: client & backend
    //  Disable this button for 1 second before enabling it again
    if (FaCheckVisible) {
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
        if (!token) {
          console.error("No app auth data");
          return;
        }

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
        setOrderStatusMessageText(newStatusSetMessage);
        setTimeout(() => {
          setOrderStatusMessageVisible(false);
          setETCMessageVisible(false);
          setETCEnable(false);
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
          { autoClose: false, closeOnClick: false, closeButton: false, draggable: false }
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
    const noCallback = () => {
      toast.dismiss(toastId);
      return;
    };

    const yesCallback = () => {
      toast.dismiss(toastId);

      const token = window.localStorage.getItem("appAuthData");
      if (!token) {
        console.error("No app auth data");
        return;
      }
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
                text="Thank you for your confirmation. This order will be closed soon."
                btn1Text="OK"
                btn1Callback={() => window.location.reload()}
              />,
              { autoClose: false, closeOnClick: false, closeButton: false, draggable: false }
            );
            setOrderStatus("Delivered");
            setIsConfirmDeliveredBtnShowed(false);
          }
        })
        .catch(console.error);
    };

    const toastId = toast.info(
      <ConfirmationDiaglog
        text="Are you sure you want to confirm this order as delivered?"
        btn1Text="Yes"
        btn1Callback={yesCallback}
        btn2Text="No"
        btn2Callback={noCallback}
      />,
      { autoClose: false, closeOnClick: false, closeButton: false, draggable: false }
    );
  };

  return (
    <div>
      <div>
        <div className={styles.wrapper}>
          <div className={cx(styles.inner, styles.orderDetailContainer)}>
            <form action="" className={styles.form}>
              <h3>Order Information</h3>
              {props.isManagerView && (
                <div className={styles.formwrapper}>
                  <label htmlFor="order_status">
                    Order Status
                    <span htmlFor="" className={cx(styles.errormessage, orderStatusMessageVisible ? styles.show : styles.hide)}>
                      {orderStatusMessageText}
                    </span>
                  </label>
                  <div className={styles.flex}>
                    <select
                      disabled={!orderStatusEnable}
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
                      <FaEdit size="2em" className={cx(FaEditVisible ? styles.show : styles.hide)} />
                      <FaCheck size="2em" className={cx(FaCheckVisible ? styles.show : styles.hide)} />
                    </div>
                  </div>
                </div>
              )}

              {props.isManagerView && (
                <div className={styles.formwrapper}>
                  <label htmlFor="">
                    Estimated Time of Completion
                    <span htmlFor="" className={cx(styles.errormessage, ETCMessageVisible ? styles.show : styles.hide)}>
                      {ETCMessageText}
                    </span>
                  </label>
                  <div className={styles.flex}>
                    <input
                      disabled={!ETCEnable}
                      type="number"
                      name="order_status_extra_info"
                      className={cx(styles.formcontrol, styles.ETC)}
                      value={orderStatusExtraInfo}
                      onChange={(event) => setOrderStatusExtraInfo(event.target.value)}
                    />
                    <div>minutes</div>
                  </div>
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

              <div className={cx(styles.formwrapper, styles.width300)}>
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
                      {imgStatuses.map((value, index) => (
                        <div
                          key={index}
                          className={cx(
                            styles.image,
                            styles.defaultStatus,
                            value == 0 ? "" : value == -1 ? styles.prevStatus : styles.currentStatus
                          )}
                        ></div>
                      ))}
                    </div>
                    <div className={styles.statusTexts}>
                      {statusTexts.map((value, index) => (
                        <div className={styles.orderStatusText} key={index}>
                          <div>
                            <b>{value}</b>
                          </div>
                          {1 <= index && index <= 3 && (
                            <div className={cx(styles.customerETC, imgStatuses[index] == 1 ? styles.show : styles.hide)}>
                              {orderStatusExtraInfo && `(in about ${orderStatusExtraInfo} minutes)`}
                            </div>
                          )}
                          {index == 4 && (
                            <div
                              className={cx(
                                styles.button,
                                styles.smallButton,
                                isConfirmDeliveredBtnShowed ? styles.show : styles.hide
                              )}
                              onClick={handleConfirmDelivered}
                            >
                              Confirm Delivered
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h3>ORDER DETAILS</h3>
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
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
