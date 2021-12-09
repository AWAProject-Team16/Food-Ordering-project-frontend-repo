import styles from "../css/RestaurantProduct.module.css";
import Modal from "react-modal";
import ModalClickBuy from "./ModalClickBuy";

import React, { useState } from "react";
Modal.setAppElement("#root");
export default function RestaurantDetail(props) {
  var API_ADDRESS = process.env.REACT_APP_API_ADDRESS;
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div
        className={styles.product}
        key={props.item.idproducts}
        onClick={
          // Manager cannot buy his own product
          props.isManagerView
            ? null
            : () => {
                setModalOpen(true);
              }
        }
      >
        <div className={styles.productLeft}>
          <div className={styles.name}> {props.item.product_name} </div>
          <div className={styles.description}>
            {" "}
            {props.item.product_description}{" "}
          </div>
          <div className={styles.price}> {"$ " + props.item.product_cost} </div>
        </div>
        <div className={styles.productRight}>
          <img
            alt="true"
            className={styles.imageM}
            src={`${API_ADDRESS}/images/${props.item.product_image}`}
          />
        </div>
      </div>
      {/* {modalOpen && <ModalClickBuy handleModalOpen={setModalOpen} item={ props.item }/>} */}
      <Modal isOpen={modalOpen} className={styles.modal}>
        <ModalClickBuy
          handleModalOpen={setModalOpen}
          item={props.item}
          idrestaurants={props.idrestaurants}
        />
      </Modal>
    </div>
  );
}
