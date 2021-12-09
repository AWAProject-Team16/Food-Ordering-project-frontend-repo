import React, { useEffect, useState, createRef } from "react";
import styles from "../css/_Common.module.css";
import cx from "classnames";

// Something wrong with this component, but copy paste jsx works!!!
// Come back later

export default function FormControlInput({ disabled, cursorPointer, label, type, name, value, width }) {
  const [_value, setValue] = useState(value);

  const inputRef = createRef();

  useEffect(() => {
    if (width) inputRef.current.style.width = width;
    if (cursorPointer) {
      inputRef.current.classList.add(styles.cursorPointer);
      inputRef.current.classList.add(styles.onHoverColor1);
    }
  }, []);

  return (
    <div className={styles.formwrapper}>
      <label>{label}</label>
      <input
        ref={inputRef}
        disabled={disabled}
        type={type}
        className={styles.formcontrol}
        name={name}
        value={_value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}
