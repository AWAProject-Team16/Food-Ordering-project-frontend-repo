import React, { useState, useEffect } from "react";
import styles from "../css/Restaurant.module.css";
import { useParams } from "react-router-dom";
import RestaurantDetail from "./RestaurantDetail";
import axios from "axios";

export default function Restaurant({ isManagerView }) {
  var API_ADDRESS = process.env.REACT_APP_API_ADDRESS;
  var result = useParams();
  var path = result.idOfRestaurant;

  const [obj, setObj] = useState([]);
  useEffect(() => {
    function fetchOne(x) {
      axios
        .get(`${API_ADDRESS}/restaurants/id/${x}`)
        .then((res) => {
          setObj(res.data[0]);
        })
        .catch((err) => console.error(err));
    }
    fetchOne(path);
  }, [path, API_ADDRESS]);

  const [objCategories, setObjCategories] = useState([]);
  useEffect(() => {
    function fetchData(x) {
      axios
        .get(`${API_ADDRESS}/categories/restaurant/${x}`)
        .then((res) => {
          setObjCategories(res.data.Categories);
        })
        .catch((err) => console.error(err));
    }
    fetchData(path);
  }, [path, API_ADDRESS]);

  const [objProducts, setObjProducts] = useState([]);
  useEffect(() => {
    async function fetchData(x) {
      try {
        let res = await axios.get(`${API_ADDRESS}/products/restaurant/${x}`);
        setObjProducts(res.data.Products);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData(path);
  }, [path, API_ADDRESS]);

  if (obj.idrestaurants == null) {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>No matching restaurant</h1>
      </div>
    );
  }

  return (
    <div>
      {/* <div className={styles.header}>
        <img alt="true" className={styles.image} src={`/images/event.png`} />
      </div> */}
      <div className={styles.container}>
        <div className={styles.categories}>
          {objCategories.map((item) => (
            <div className={styles.categoryListElement} key={item.idcategories}>
              <a href={"#" + item.idcategories}>{item.category_name}</a>
            </div>
          ))}
        </div>
        <div className={styles.products}>
          {objCategories.map((item) => (
            <RestaurantDetail
              key={item.idcategories}
              idrestaurants={parseInt(result.idOfRestaurant)}
              categories={objCategories}
              category={item}
              products={objProducts}
              isManagerView={isManagerView}
            />
          ))}
        </div>
        <div className={styles.info}>
          <h4>Restaurant information</h4>
          <h5>{obj.name}</h5>
          <h5>Address</h5>
          <div>{obj.address}</div>
          <h5>Phone no.</h5>
          <div>{obj.phonenumber}</div>
          <h5>Opening times</h5>
          <div>{obj.operating_hours}</div>
          <h5>About restaurant</h5>
          <div>{obj.restaurant_description}</div>
        </div>
      </div>
    </div>
  );
}
