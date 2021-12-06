import React, { useState, useEffect, createRef } from "react";
import styles from "../css/RestaurantCreateNew.module.css";
import axios from "axios";
import cx from "classnames";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

export default function CategoryModify(props) {
  const [data, setData] = useState({
    idcategories: 0,
    restaurants_idrestaurants: 0,
    category_name: "",
    restaurant_name: "",
  });

  const idcategories = useParams().idcategories || props.idcategories;

  const token = localStorage.getItem("appAuthData");
  if (!token) {
    console.error("Token not found. Operation terminated!");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${API_ADDRESS}/categories/categoryInfoWithRestaurantName/${idcategories}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.length == 0) {
          toast.error("Access denied");
          window.location.href = "/"
          return;
        } else {
          setData(res.data[0]);
          document.querySelector('input[name="name"]').disabled = false;
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  function modifyCategory(idcategories) {
    const form = document.querySelector('form[name="modifyCategory"]');

    form.onsubmit = (event) => {
      event.preventDefault();
    };

    if (!form.name.value.trim()) {
      toast.error("Category name is required.");
      return;
    }

    getFormDataAndCallAPI(idcategories);
  }

  function getFormDataAndCallAPI(idcategories) {
    const formData = new FormData(
      document.querySelector('form[name="modifyCategory"]')
    );

    let categoryObj = {};
    formData.forEach((value, key) => (categoryObj[key] = value));

    const token = localStorage.getItem("appAuthData");
    if (!token) {
      console.error("Token not found. Operation terminated!");
      return;
    }

    const idrestaurants = data.restaurants_idrestaurants;

    axios
      .post(
        `${API_ADDRESS}/categories/restaurant/${idrestaurants}/category/${idcategories}/renameCategory`,
        categoryObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Category modified.");
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <form action="" name="modifyCategory" className={styles.form}>
            <h3>Modify A Category</h3>
            <div className={styles.formgroup}></div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Category Name
                <span htmlFor="" className={cx(styles.errormessage, "name")}>
                  Category Name cannot be empty!
                </span>
              </label>
              <input
                disabled
                required
                type="text"
                className={styles.formcontrol}
                name="name"
                value={data.category_name}
                onChange={(e) =>
                  setData({ ...data, category_name: e.target.value })
                }
              />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">This category belongs to the restaurant</label>
              <div className={styles.flex}>
                <input
                  disabled
                  type="text"
                  className={cx(styles.formcontrol, styles.ban)}
                  name="restaurant_name"
                  value={data.restaurant_name}
                />
              </div>
            </div>

            <button
              onClick={() => modifyCategory(idcategories)}
              className={styles.button}
            >
              Save
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
