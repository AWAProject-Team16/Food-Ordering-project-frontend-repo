import React, { useEffect, createRef } from "react";
import styles from "../css/DashboardCard.module.css";
import { GiReceiveMoney } from "react-icons/gi";
import { IoReceipt } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { IoRestaurant } from "react-icons/io5";
import cx from "classnames";

export default function DashboardCard({ title, text, icon, link, color }) {
  let _icon = <></>;

  switch (icon) {
    case "GiReceiveMoney":
      _icon = <GiReceiveMoney size="3em" />;
      break;
    case "IoReceipt":
      _icon = <IoReceipt size="3em" />;
      break;
    case "BsPeopleFill":
      _icon = <BsPeopleFill size="3em" />;
      break;
    case "IoRestaurant":
      _icon = <IoRestaurant size="3em" />;
      break;
  }

  const cardRef = createRef();
  const moreInfoRef = createRef();
  const textRef = createRef();

  useEffect(() => {
    if (color) {
      cardRef.current.style.background = color;
      moreInfoRef.current.style.background = color;
    }

    if (link) cardRef.current.style.cursor = "pointer";
  }, []);

  return (
    <div ref={cardRef} className={cx(styles.card)}>
      <div className={cx(styles.title)}>{title}</div>
      <div className={cx(styles.flex)}>
        <div ref={textRef} className={cx(styles.text)}>
          {text}
        </div>
        <div>{_icon}</div>
      </div>
      <div ref={moreInfoRef} className={cx(styles.moreInfo)}>
        {link && <>More info</>}
      </div>
    </div>
  );
}
