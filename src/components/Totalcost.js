import React from 'react'
import styles from './../css/Totalcost.module.css'


const TotalCostBox = props => {
    return (
        <div className={styles.TotalCostBox}>
            <div className={styles.CostTitle}>
                Total cost of all items:
            </div>
            <div className={styles.TotalCost}>
                { props.Totalcost } €
            </div>
        </div>
    )
}

export default TotalCostBox