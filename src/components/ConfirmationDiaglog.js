import React from "react";
import styles from "../css/ConfirmationDiaglog.module.css";

export default function ConfirmationDiaglog({ text, btn1Text, btn1Callback = (f) => f, btn2Text, btn2Callback = (f) => f }) {
  return (
    <div>
      {text}
      <div className={styles.flex}>
        {btn1Text && (
          <button className={styles.button} onClick={btn1Callback}>
            {btn1Text}
          </button>
        )}
        {btn2Text && (
          <button className={styles.button} onClick={btn2Callback}>
            {btn2Text}
          </button>
        )}
      </div>
    </div>
  );
}
