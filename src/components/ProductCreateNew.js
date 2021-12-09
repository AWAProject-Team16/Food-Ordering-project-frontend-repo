import React, { useEffect, useState, createRef } from "react";
import styles from "../css/_Common.module.css";
import axios from "axios";
import cx from "classnames";
import Modal from "react-modal";
import CategoryCreateNew from "./CategoryCreateNew";
import RestaurantCreateNew from "./RestaurantCreateNew";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;
const token = localStorage.getItem("appAuthData");

const productImageRef = createRef();

export default function ProductCreateNew() {
  const [restaurantDropdownItems, setRestaurantDropdownItems] = useState([{ idrestaurants: 0, name: "" }]);

  const initialCategoryDropdownItems = [{ idcategories: 0, category_name: "" }];
  const [categoryDropdownItems, setCategoryDropdownItems] = useState(initialCategoryDropdownItems);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [componentWillShowInModal, setComponentWillShowInModal] = useState("restaurant");

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
          handleCategoryDropdown();
        } else {
          console.log("Something went wrong!");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleModal = () => {
    if (componentWillShowInModal == "restaurant") toggleModalAndUpdateRestaurantDropdown();
    else toggleModalAndUpdateCategoryDropdown();
  };

  const toggleModalAndUpdateRestaurantDropdown = () => {
    setComponentWillShowInModal("restaurant");
    setIsModalOpen(!isModalOpen);

    axios
      .get(`${API_ADDRESS}/restaurants/ownRestaurants2`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setRestaurantDropdownItems(res.data.Own_Restaurants);
          handleCategoryDropdown();
        }
      })
      .catch(console.error);
  };

  const toggleModalAndUpdateCategoryDropdown = () => {
    setComponentWillShowInModal("category");
    setIsModalOpen(!isModalOpen);
    handleCategoryDropdown();
  };

  function handleCategoryDropdown() {
    const idrestaurants = document.querySelector('select[name="select_a_restaurant').value;

    axios
      .get(`${API_ADDRESS}/categories/restaurant/${idrestaurants}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCategoryDropdownItems(
            res.data.Categories.sort((a, b) => (a.category_name.toLowerCase() < b.category_name.toLowerCase() ? -1 : 1))
          );
        } else if (res.status === 404) {
          setCategoryDropdownItems(initialCategoryDropdownItems);
        }
      })
      .catch(() => {
        setCategoryDropdownItems(initialCategoryDropdownItems);
      });
  }

  function resetForm() {
    document.querySelector('form[name="createProduct"]').reset();
    document.getElementsByClassName(styles.productImage)[0].src = " ";
    document.querySelector('label[for="file_picker"]').textContent = "Click to choose an image";
  }

  function getFormDataAndCallAPI() {
    const formData = new FormData(document.querySelector('form[name="createProduct"]'));

    const token = localStorage.getItem("appAuthData");
    const idcategories = document.querySelector('select[name="select_a_category"]').value;

    axios
      .post(`${API_ADDRESS}/products/category/${idcategories}/addProductMultipart`, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Product created.");
          resetForm();
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

  function showNewImageChosenFileName() {
    const imageLabel = document.querySelector('label[for="file_picker"]');
    const filePicker = document.querySelector('input[type="file"]');

    if (FileReader && filePicker.files && filePicker.files.length) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        productImageRef.current.src = fileReader.result;
      };
      fileReader.readAsDataURL(filePicker.files[0]);
    }

    if (filePicker.files.length > 0) {
      imageLabel.textContent = filePicker.files[0].name;
    } else {
      imageLabel.textContent = "Click to choose an image";
    }
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <form action="" name="createProduct" className={styles.form}>
            <h3>Create A New Product</h3>
            <div className={styles.formgroup}></div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Select a Restaurant</label>
              <select className={cx(styles.formcontrol, styles.select)} name="select_a_restaurant" onChange={handleCategoryDropdown}>
                {restaurantDropdownItems.map((item, index) => (
                  <option value={item.idrestaurants} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <a className={styles.addProductLink} href="/managers/restaurants/create">
              Add New Restaurant
            </a>
            <div className={styles.formwrapper}>
              <label htmlFor="">Select a Category</label>
              <select className={cx(styles.formcontrol, styles.select)} name="select_a_category">
                {categoryDropdownItems.map((item, index) => (
                  <option value={item.idcategories} key={index}>
                    {item.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className={cx(styles.button, styles.smallButton)} onClick={toggleModalAndUpdateCategoryDropdown}>
              Add New Category
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={handleModal}>
              <span className={styles.close} onClick={handleModal}></span>
              <CategoryCreateNew />
            </Modal>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Product Name
                <span htmlFor="" className={cx(styles.errormessage, "product_name")}>
                  Product Name cannot be empty!
                </span>
              </label>
              <input type="text" className={styles.formcontrol} name="product_name" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Product Description</label>
              <textarea rows="12" className={cx(styles.formcontrol, styles.textarea)} name="product_description" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Product Cost</label>
              <div className={styles.flex}>
                <div>&euro;</div>
                <input type="number" className={styles.formcontrol} name="product_cost" />
              </div>
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Image</label>
              <div>
                <img ref={productImageRef} className={styles.productImage} />
                <input
                  type="file"
                  accept="image/*"
                  className={cx(styles.formcontrol, styles.input_file)}
                  name="product_image"
                  id="file_picker"
                  onChange={showNewImageChosenFileName}
                />
                <label className={styles.formcontrol} htmlFor="file_picker">
                  Click to choose another image
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
      />
    </div>
  );
}
