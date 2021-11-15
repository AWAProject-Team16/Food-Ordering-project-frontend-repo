import React from 'react'

export default function CriterionInput(props) {
  return (
    <div>
      <div className={styles.criterion}>
        <div className={styles.criterionTitle}>Order number</div>
        <div className={styles.criterionInput}>
          <input type="text"></input>
        </div>
      </div>
    </div>
  )
}
