import React from 'react'
import styles from './../css/DeliveryLocation.module.css'

const DeliveryLocation = props => {
    return (
        <div className={styles.LocationBox}>
            <div>
                Please input delivery location:
            </div>
            <form onSubmit={props.LocationSubmitted}>
                <input type="text" value={ props.DeliveryLocation } onChange={(value) => props.UpdateLocation(value) }/>
                <button type="submit"> Submit </button>
            </form>
            {props.isLocationSubmitted == true && 
              <div>
                Estimated delivery time to {props.DeliveryLocation} is 15-20 minutes
              </div>    
            }
            {props.isLocationSubmitted == true &&
              <div>
                Estimated delivery costs are { props.DeliveryCost } €
              </div>
            }
        </div>
    )
}

export default DeliveryLocation
