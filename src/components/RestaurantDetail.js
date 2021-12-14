import React from "react";
import styles from "../css/RestaurantDetail.module.css";
import RestaurantProduct from "./RestaurantProduct";

export default function RestaurantDetail(props) {
  const objProducts = props.products.filter((item) => item.categories_idcategories === props.category.idcategories);

  return (
    <div>
      <h3 id={props.category.idcategories} className={styles.category}>
        {" "}
        {props.category.category_name}{" "}
      </h3>
      {objProducts.map((item) => (
        <RestaurantProduct item={item} idrestaurants={props.idrestaurants} key={item.idproducts} isManagerView={props.isManagerView} />
      ))}
    </div>
  );
}
