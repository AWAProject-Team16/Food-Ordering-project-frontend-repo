import React from 'react';
import styles from '../css/RestaurantCreateNew.module.css';

export default function FormControlInput(props) {
  return (
    <div className={styles.formwrapper}>
      <label htmlFor="">
        {props.label}
        <span htmlFor="" className={cx(styles.errormessage, props.label)}>
          {props.errorMessage}
        </span>
      </label>
      <input type="text" className={styles.formcontrol} name={props.label} onFocus={(event) => hideErrorMessage(event)} />
    </div>
  )
}
