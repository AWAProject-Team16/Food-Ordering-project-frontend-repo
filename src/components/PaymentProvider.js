import React from "react";
import styles from "./../css/PaymentView/PaymentProvider.module.css";
import PaymentProviderBank from "./PaymentProviderBank";
import PaymentProviderCC from "./PaymentProviderCC";

const PaymentProvider = (props) => {
  if (props.expanded === true && props.type === "bank") {
    return (
      <div className={styles.ProviderItem} style={{ order: "-1" }}>
        <div className={styles.ProviderBox} onClick={() => props.SelectProvider(props.id)} style={{ backgroundColor: "silver" }}>
          {props.name}
        </div>
        <div>
          <PaymentProviderBank name={props.name} AddOrder={props.AddOrder} />
        </div>
      </div>
    );
  } else if (props.expanded === true && props.type === "credit card") {
    return (
      <div className={styles.ProviderItem} style={{ order: "-1" }}>
        <div className={styles.ProviderBox} onClick={() => props.SelectProvider(props.id)} style={{ backgroundColor: "silver" }}>
          {props.name}
        </div>
        <div>
          <PaymentProviderCC name={props.name} AddOrder={props.AddOrder} HandleSubmit={props.HandleSubmit} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.ProviderItem}>
        <div className={styles.ProviderBox} onClick={() => props.SelectProvider(props.id)}>
          {props.name}
        </div>
      </div>
    );
  }
};

export default PaymentProvider;
