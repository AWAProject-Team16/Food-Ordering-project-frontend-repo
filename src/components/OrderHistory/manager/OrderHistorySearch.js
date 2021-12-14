import React from "react";
import styles from "../../../css/OrderHistory.module.css";
import OrderHistorySearchCriterionSelect from "./OrderHistorySearchCriterionSelect";

export default function OrderHistorySearch() {
  return (
    <div>
      <div className={styles.searchArea}>
        <OrderHistorySearchCriterionSelect title="Restaurant" stdData={this.getStdRestaurantData()} />
        <OrderHistorySearchCriterionSelect title="Order number" />
        <OrderHistorySearchCriterionSelect title="Order Status" stdData={this.getStdOrderData()} />
        <OrderHistorySearchCriterionSelect title="Customer Name" />
        <OrderHistorySearchCriterionSelect title="From" type="date" />
        <OrderHistorySearchCriterionSelect title="To" type="date" />

        <div className={styles.criterion}>
          <button>Search</button>
        </div>
      </div>
    </div>
  );
}
