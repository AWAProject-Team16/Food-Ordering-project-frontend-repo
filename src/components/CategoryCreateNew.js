import React, { useEffect, useState } from "react";
import styles from "../css/RestaurantCreateNew.module.css";
import axios from "axios";
import cx from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

export default function CategoryCreateNew() {
  const [restaurantDropdownItems, setRestaurantDropdownItems] = useState([
    { idrestaurants: 0, name: "" },
  ]);

  const token = localStorage.getItem("appAuthData");

  useEffect(() => {
    if (!token) {
      console.error("Token not found");
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
          console.log("Something went wrong!");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function getFormDataAndCallAPI() {
    const formData = new FormData(
      document.querySelector('form[name="createCategory"]')
    );

    let categoryObj = {};
    formData.forEach((value, key) => (categoryObj[key] = value));

    const token = localStorage.getItem("appAuthData");
    const idrestaurants = document.querySelector(
      'select[name="select_a_restaurant"]'
    ).value;

    axios
      .post(
        `${API_ADDRESS}/categories/restaurant/${idrestaurants}/addCategory2`,
        categoryObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Category created.");
          document.querySelector('form[name="createCategory"]').name.value = "";
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function createCategory() {
    const form = document.querySelector('form[name="createCategory"]');

    form.onsubmit = (event) => {
      event.preventDefault();
    };

    const isDataValid =
      Number(form.select_a_restaurant.value) > 0 &&
      form.name.value.trim() != "";

    if (!isDataValid) {
      toast.error("All data are required");
    } else {
      getFormDataAndCallAPI();
    }
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <form action="" name="createCategory" className={styles.form}>
            <h3>Create A New Category</h3>
            <div className={styles.formgroup}></div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Select a Restaurant</label>
              <select
                className={cx(styles.formcontrol, styles.select)}
                name="select_a_restaurant"
              >
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
              />
            </div>

            <button onClick={createCategory} className={styles.button}>
              Create
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
