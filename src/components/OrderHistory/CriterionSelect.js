import React from 'react';
import styles from './MainView.module.css';

export default function CriterionSelect() {
  return (
    <div>
      <div className={styles.criterion}>
        <div className={styles.criterionTitle}>Restaurant</div>
        <div className={styles.criterionInput}>
          <select>
            <option value="-1">All</option>
            {this.state.restaurantData.map((item, index) => <option key={index} value={item.idrestaurants}>{item.name}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}
