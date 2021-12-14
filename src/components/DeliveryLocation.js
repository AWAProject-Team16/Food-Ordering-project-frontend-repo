import React from "react";
import styles from "./../css/ShoppingCart/DeliveryLocation.module.css";

const DeliveryLocation = (props) => {
  return (
    <div className={styles.LocationBox}>
      <div className={styles.LocationInput}>
        <div>Please input delivery location:</div>
        <form onSubmit={props.LocationSubmitted}>
          <input type="text" value={props.DeliveryForm} onChange={(value) => props.UpdateLocation(value)} />
          <button type="submit" className={styles.LocationSubmit}>
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
      {props.isLocationSubmitted === true && (
        <div className={styles.DeliveryInfo}>
          <div>Estimated delivery time to {props.DeliveryLocation} is 15-20 minutes</div>
          <div>Delivery costs are {props.DeliveryCost} €</div>
        </div>
      )}
    </div>
  );
};

export default DeliveryLocation;
