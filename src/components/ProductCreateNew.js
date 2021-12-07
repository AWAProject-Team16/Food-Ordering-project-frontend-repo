import React, { useEffect, useState } from "react";
import styles from "../css/RestaurantCreateNew.module.css";
import axios from "axios";
import cx from "classnames";
import Modal from "react-modal";
import CategoryCreateNew from "./CategoryCreateNew";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

function getFormDataAndCallAPI() {
  const formData = new FormData(
    document.querySelector('form[name="createProduct"]')
  );

  const token = localStorage.getItem("appAuthData");
  const idcategories = document.querySelector(
    'select[name="select_a_category"]'
  ).value;

  axios
    .post(
      `${API_ADDRESS}/products/category/${idcategories}/addProductMultipart`,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 201) {
        toast.success("Product created.");
      } else {
        toast.error("Something went wrong!");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function createProduct() {
  const form = document.querySelector('form[name="createProduct"]');

  form.onsubmit = (event) => {
    event.preventDefault();
  };

  const isDataValid =
    Number(form.select_a_category.value) > 0 &&
    form.product_name.value.trim() != "" &&
    form.product_description.value.trim() != "" &&
    Number(form.product_cost.value) > 0 &&
    form.product_image.files.length > 0;

  if (!isDataValid) {
    toast.error("All data are required and price must be greater than 0");
  } else {
    getFormDataAndCallAPI();
  }
}

function showChosenFileName() {
  const imageLabel = document.querySelector('label[for="file_picker"]');
  const filePicker = document.querySelector('input[type="file"]');
  if (filePicker.files.length > 0) {
    imageLabel.textContent = filePicker.files[0].name;
  } else {
    imageLabel.textContent = "Click to choose an image";
  }
}

export default function ProductCreateNew() {
  const [restaurantDropdownItems, setRestaurantDropdownItems] = useState([
    { idrestaurants: 0, name: "" },
  ]);

  const initialCategoryDropdownItems = [{ idcategories: 0, category_name: "" }];
  const [categoryDropdownItems, setCategoryDropdownItems] = useState(
    initialCategoryDropdownItems
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalAndUpdateCategoryDropdown = () => {
    setIsModalOpen(!isModalOpen);
    handleCategoryDropdown();
  };

  const token = localStorage.getItem("appAuthData");

  function handleCategoryDropdown() {
    //call api
    //set items
    const idrestaurants = document.querySelector(
      'select[name="select_a_restaurant'
    ).value;

    axios
      .get(`${API_ADDRESS}/categories/restaurant/${idrestaurants}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCategoryDropdownItems(res.data.Categories);
        } else if (res.status === 404) {
          setCategoryDropdownItems(initialCategoryDropdownItems);
        }
      })
      .catch(() => {
        setCategoryDropdownItems(initialCategoryDropdownItems);
      });
  }

  function showCategoryCreateNew() {
    toggleModalAndUpdateCategoryDropdown();
  }

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
        console.log(res);
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

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <form action="" name="createProduct" className={styles.form}>
            <h3>Create A New Product</h3>
            <div className={styles.formgroup}></div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Select a Restaurant</label>
              <select
                className={cx(styles.formcontrol, styles.select)}
                name="select_a_restaurant"
                onChange={handleCategoryDropdown}
              >
                {restaurantDropdownItems.map((item, index) => (
                  <option value={item.idrestaurants} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Select a Category</label>
              <select
                className={cx(styles.formcontrol, styles.select)}
                name="select_a_category"
              >
                {categoryDropdownItems.map((item, index) => (
                  <option value={item.idcategories} key={index}>
                    {item.category_name}
                  </option>
                ))}
              </select>
            </div>
            <a
              className={styles.addCategoryLink}
              onClick={showCategoryCreateNew}
            >
              Add New Category
            </a>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={toggleModalAndUpdateCategoryDropdown}
            >
              <span
                className={styles.close}
                onClick={toggleModalAndUpdateCategoryDropdown}
              ></span>
              <CategoryCreateNew />
            </Modal>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Product Name
                <span
                  htmlFor=""
                  className={cx(styles.errormessage, "product_name")}
                >
                  Product Name cannot be empty!
                </span>
              </label>
              <input
                required
                type="text"
                className={styles.formcontrol}
                name="product_name"
              />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Product Description</label>
              <textarea
                required
                rows="12"
                className={cx(styles.formcontrol, styles.textarea)}
                name="product_description"
              />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Product Cost</label>
              <div className={styles.flex}>
                <div>&euro;</div>
                <input
                  required
                  type="number"
                  className={styles.formcontrol}
                  name="product_cost"
                />
              </div>
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Image</label>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className={cx(styles.formcontrol, styles.input_file)}
                  name="product_image"
                  id="file_picker"
                  onChange={showChosenFileName}
                />
                <label className={styles.formcontrol} htmlFor="file_picker">
                  Click to choose an image
                </label>
              </div>
            </div>

            <button onClick={createProduct} className={styles.button}>
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
