import React from "react";
import styles from "./../css/ShoppingCart/Totalcost.module.css";

const TotalCostBox = (props) => {
  return (
    <div className={styles.TotalCostBox}>
      <div className={styles.CostTitle}>Total cost of the order:</div>
      <div className={styles.Cost}>Products: {props.ProductCosts} €</div>
      <div className={styles.Cost}>Delivery: {props.DeliveryCost} €</div>
      <div className={styles.Cost}>Total: {props.TotalCost} €</div>
    </div>
  );
};

export default TotalCostBox;
