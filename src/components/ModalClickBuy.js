import React, { useState, useContext } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import styles from "../css/ModalClickBuy.module.css";
import cx from "classnames";
import { CartContext } from "../context/Contexts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ModalClickBuy(props) {
  var API_ADDRESS = process.env.REACT_APP_API_ADDRESS;
  const [quantity, setQuantity] = useState(1);
  const context = useContext(CartContext);
  function onDown() {
    let newQuantity = quantity > 1 ? quantity - 1 : quantity;
    setQuantity(newQuantity);
  }
  function onUp() {
    let newQuantity = quantity + 1;
    setQuantity(newQuantity);
  }

  function addNewItem(e) {
    let StorageCart = localStorage.getItem("ShoppingCart");
    StorageCart = JSON.parse(StorageCart);
    let Restaurant = localStorage.getItem("RestaurantID");

    if (Restaurant && Restaurant != props.idrestaurants) {
      toast.error("Sorry, you can only buy at one restaurant at a time");
      return;
    }

    if (!Restaurant) {
      localStorage.setItem("RestaurantID", props.idrestaurants);
      PushToCart(props, StorageCart);
    } else if (Restaurant == !props.idrestaurants) {
      toast.error(
        "You currently have items from another restaurant in your shopping cart. One order can only contain items from one restaurant"
      );
    } else {
      PushToCart(props, StorageCart);
    }

    props.handleModalOpen(false);
    context.CartCounter();
  }

  function PushToCart(props, StorageCart) {
    if (Array.isArray(StorageCart)) {
      let indexnumber = StorageCart.findIndex((Product) => Product.id === props.item.idproducts);
      if (indexnumber === -1) {
        StorageCart.push({ id: props.item.idproducts, value: props.item.product_name, qty: quantity, cost: props.item.product_cost });
      } else {
        StorageCart[indexnumber].qty += quantity;
      }
      localStorage.setItem("ShoppingCart", JSON.stringify(StorageCart));
    } else {
      let StorageCart = [];
      StorageCart.push({ id: props.item.idproducts, value: props.item.product_name, qty: quantity, cost: props.item.product_cost });
      localStorage.setItem("ShoppingCart", JSON.stringify(StorageCart));
    }
  }

  return (
    <div>
      <div>
        <button
          onClick={() => {
            props.handleModalOpen(false);
          }}
          className={cx(styles.button, styles.close)}
        >
          X
        </button>
      </div>
      <div className={styles.item}>
        <div className={styles.col1}>
          {/*  */}
          <img alt="true" src={`${API_ADDRESS}/images/${props.item.product_image}`} />
        </div>
        <div className={styles.col2}>
          <div className={styles.name}>
            <b>{props.item.product_name}</b>
          </div>
        </div>
        <div className={styles.col3}>
          <div className={styles.gray}>Price</div>
          <div className={styles.red}>
            <span>{"$ " + props.item.product_cost}</span>
          </div>
        </div>
        <div className={styles.col4}>
          <div className={styles.gray}>Quantity</div>
          <div className={styles.minusplus}>
            <FaMinus className={cx(styles.fas, styles.faMinus)} onClick={onDown} />
            <span>{quantity}</span>
            <FaPlus className={cx(styles.fas, styles.faPlus)} onClick={onUp} />
          </div>
        </div>
        <div className={styles.col5}>
          <div className={styles.gray}>Subtotal</div>
          <div>
            <span>€</span>
            <span>{(quantity * props.item.product_cost).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button onClick={addNewItem} className={cx(styles.button, styles.addToCart)}>
        Add to cart
      </button>

      <ToastContainer position="top-center" />
    </div>
  );
}
