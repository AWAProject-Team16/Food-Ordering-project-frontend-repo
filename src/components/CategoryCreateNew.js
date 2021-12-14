import React, { useEffect, useState } from "react";
import styles from "../css/_Common.module.css";
import axios from "axios";
import cx from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

export default function CategoryCreateNew() {
  const [restaurantDropdownItems, setRestaurantDropdownItems] = useState([{ idrestaurants: 0, name: "" }]);
  const [categoryName, setCategoryName] = useState([""]);

  useEffect(() => {
    const token = localStorage.getItem("appAuthData");

    if (!token) {
      console.error("App auth data not found");
      return;
    }

    axios
      .get(`${API_ADDRESS}/restaurants/ownRestaurants2`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setRestaurantDropdownItems(res.data.Own_Restaurants);
        } else {
          console.error("Something went wrong!");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const idrestaurants = e.target.select_a_restaurant.value;
    const categoryName = e.target.name.value.trim();
    const isDataValid = Number(idrestaurants) > 0 && categoryName != "";

    if (!isDataValid) {
      toast.error("All data are required");
      return;
    } else {
      const token = localStorage.getItem("appAuthData");

      if (!token) {
        console.error("App auth data not found");
        return;
      }

      axios
        .post(
          `${API_ADDRESS}/categories/restaurant/${idrestaurants}/addCategory2`,
          { name: categoryName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            toast.success("Category created.");
            setCategoryName("");
          } else {
            toast.error("Something went wrong!");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <form action="" name="createCategory" className={styles.form} onSubmit={submit}>
            <h3>Create A New Category</h3>
            <div className={styles.formgroup}></div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Select a Restaurant</label>
              <select className={cx(styles.formcontrol, styles.select)} name="select_a_restaurant">
                {restaurantDropdownItems.map((item, index) => (
                  <option value={item.idrestaurants} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Category Name
                <span htmlFor="" className={cx(styles.errormessage, "name")}>
                  Category Name cannot be empty!
                </span>
              </label>
              <input
                required
                type="text"
                className={styles.formcontrol}
                name="name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.button}>
              Create
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
