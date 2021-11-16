import React from 'react';
import styles from './OrderHistory.module.css';

export default function OrderHistoryCriterionSelect(props) {
  // Required props: title, data
  // Optional props: 
  return (
    <div>
      <div className={styles.criterion}>
        <div className={styles.criterionTitle}>{props.title}</div>
        <div className={styles.criterionInput}>
          <select>
            <option value="-1">All</option>
            {props.data.map((item, index) => <option key={index} value={item.idrestaurants}>{item.name}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}
