import React from 'react';
import styles from './OrderHistory.module.css';

export default function OrderHistoryCriterionInput(props) {
  // Required props: title
  // Optional props: type (default: 'text')
  return (
    <div>
      <div className={styles.criterion}>
        <div className={styles.criterionTitle}>{props.title}</div>
        <div className={styles.criterionInput}>
          <input type={props.type || 'text'}></input>
        </div>
      </div>
    </div>
  )
}
