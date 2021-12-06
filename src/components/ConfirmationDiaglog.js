import React from "react";
import styles from "../css/ConfirmationDiaglog.module.css";

export default function ConfirmationDiaglog({ text, yesCallback, noCallback }) {
  return (
    <div>
      {text}
      <div className={styles.flex}>
        <button className={styles.button} onClick={yesCallback}>Yes</button>
        <button className={styles.button} onClick={noCallback}>No</button>
      </div>
    </div>
  );
}
