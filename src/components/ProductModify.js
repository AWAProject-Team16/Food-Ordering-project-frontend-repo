import React, { useState, useEffect, createRef } from "react";
import styles from "../css/_Common.module.css";
import axios from "axios";
import cx from "classnames";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

export default function ProductModify() {
  const [data, setData] = useState({
    idproducts: 0,
    categories_idcategories: 0,
    product_name: "",
    product_description: "",
    product_cost: 0,
    product_image: "/images/placeholder.png",
  });

  const [filePickerLabelText, setFilePickerLabelText] = useState("Click to choose an image");
  const [imgSource, setImgSource] = useState("/images/placeholder.png");

  const idproducts = useParams().idproducts;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${API_ADDRESS}/products/product/${idproducts}`);
        setData(res.data[0]);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setImgSource(`${API_ADDRESS}/images/${data.product_image}`);
  }, [data.product_image]);

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

  const submit = (e) => {
    const form = e.target;
    e.preventDefault();
    const formData = new FormData(form);

    const token = localStorage.getItem("appAuthData");
    if (!token) {
      console.error("No app auth data");
      return;
    }
    axios
      .post(`${API_ADDRESS}/products/${idproducts}/editProductMultipart`, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Product modified.");
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <form action="" name="modifyProduct" className={styles.form} onSubmit={submit}>
            <h3>Modify A Product</h3>
            <div className={styles.formgroup}></div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Product Name
                <span htmlFor="" className={cx(styles.errormessage, "name")}>
                  Product Name cannot be empty!
                </span>
              </label>
              <input
                required
                type="text"
                className={styles.formcontrol}
                name="product_name"
                value={data.product_name}
                onChange={(e) => setData({ ...data, product_name: e.target.value })}
              />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Product Description</label>
              <textarea
                required
                rows="12"
                className={cx(styles.formcontrol, styles.textarea)}
                name="product_description"
                value={data.product_description}
                onChange={(e) => setData({ ...data, product_description: e.target.value })}
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
                  value={data.product_cost}
                  onChange={(e) => setData({ ...data, product_cost: e.target.value })}
                />
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
              Save
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
