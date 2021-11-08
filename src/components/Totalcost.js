import React from 'react'
import styles from './../css/Totalcost.module.css'


export default function TotalCostBox() {
    return (
        <div className={styles.TotalCostBox}>
            <div className={styles.CostTitle}>
                Total cost of all items:
            </div>
            <div className={styles.TotalCost}>
                241.15€
            </div>
        </div>
    )
}