import React from "react";
import styles from "../../../css/OrderHistory.module.css";

export default function OrderHistorySearchCriterionSelect(props) {
  // Required props: title, stdData (array of {name, value})
  // Optional props:
  return (
    <div>
      <div className={styles.criterion}>
        <div className={styles.criterionTitle}>{props.title}</div>
        <div className={styles.criterionInput}>
          <select>
            <option value="-1">(All)</option>
            {props.stdData.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
