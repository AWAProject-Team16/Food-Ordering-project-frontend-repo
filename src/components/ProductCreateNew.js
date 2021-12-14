import React, { useEffect, useState, createRef } from "react";
import styles from "../css/_Common.module.css";
import axios from "axios";
import cx from "classnames";
import Modal from "react-modal";
import CategoryCreateNew from "./CategoryCreateNew";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

export default function ProductCreateNew() {
  const [restaurantDropdownItems, setRestaurantDropdownItems] = useState([]);

  const initialCategoryDropdownItems = [{ idcategories: 0, category_name: "" }];
  const [categoryDropdownItems, setCategoryDropdownItems] = useState(initialCategoryDropdownItems);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [componentWillShowInModal, setComponentWillShowInModal] = useState("restaurant");

  const [filePickerLabelText, setFilePickerLabelText] = useState("Click to choose an image");
  const [imgSource, setImgSource] = useState("/images/placeholder.png");

  const selectRestaurantRef = createRef();

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
          handleCategoryDropdown();
        } else {
          console.error("Something went wrong!");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCategoryDropdown = () => {
    const idrestaurants = selectRestaurantRef.current.value;
    const token = window.localStorage.getItem("appAuthData");
    if (!token) {
      console.error("No app auth data");
      return;
    }

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
  };

  const handleModal = () => {
    if (componentWillShowInModal == "restaurant") toggleModalAndUpdateRestaurantDropdown();
    else toggleModalAndUpdateCategoryDropdown();
  };

  const toggleModalAndUpdateRestaurantDropdown = () => {
    setComponentWillShowInModal("restaurant");
    setIsModalOpen(!isModalOpen);

    const token = window.localStorage.getItem("appAuthData");
    if (!token) {
      console.error("No app auth data");
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
        }
      })
      .catch(console.error);
  };

  const toggleModalAndUpdateCategoryDropdown = () => {
    setComponentWillShowInModal("category");
    setIsModalOpen(!isModalOpen);
    handleCategoryDropdown();
  };

  function submit(e) {
    e.preventDefault();

    const idcategories = e.target.select_a_category.value;

    const isDataValid =
      Number(idcategories) > 0 &&
      e.target.product_name.value.trim() != "" &&
      e.target.product_description.value.trim() != "" &&
      Number(e.target.product_cost.value) > 0 &&
      e.target.product_image.files.length > 0;

    if (!isDataValid) {
      toast.error("All data are required and price must be greater than 0");
    } else {
      const formData = new FormData(e.target);

      const token = localStorage.getItem("appAuthData");
      if (!token) {
        console.error("No app auth data");
        return;
      }

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
            e.target.reset();
            setImgSource("/images/placeholder.png");
            setFilePickerLabelText("Click to choose an image");
          } else {
            toast.error("Something went wrong!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function showNewImageChosenFileName(e) {
    const filePicker = e.target;

    if (FileReader && filePicker.files && filePicker.files.length) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImgSource(fileReader.result);
      };
      fileReader.readAsDataURL(filePicker.files[0]);
    }

    if (filePicker.files.length > 0) {
      setFilePickerLabelText(filePicker.files[0].name);
    } else {
      setFilePickerLabelText("Click to choose an image");
    }
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <form action="" name="createProduct" className={styles.form} onSubmit={submit}>
            <h3>Create A New Product</h3>
            <div className={styles.formgroup}></div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Select a Restaurant</label>
              <select
                ref={selectRestaurantRef}
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
            <Link className={styles.addProductLink} to="/managers/restaurants/create">
              Add New Restaurant
            </Link>
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
            <Modal
              isOpen={isModalOpen}
              onRequestClose={handleModal}
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
                content: {
                  top: "0px",
                  left: "0px",
                  border: "none",
                  background: "none",
                },
              }}
            >
              <span className={styles.close} onClick={handleModal}></span>
              <button className={styles.button2} onClick={handleModal}>
                CLOSE
              </button>
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
                <img className={styles.productImage} src={imgSource} />
                <input
                  type="file"
                  accept="image/*"
                  className={cx(styles.formcontrol, styles.input_file)}
                  name="product_image"
                  id="file_picker"
                  onChange={(e) => showNewImageChosenFileName(e)}
                />
                <label className={styles.formcontrol} htmlFor="file_picker">
                  {filePickerLabelText}
                </label>
              </div>
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
