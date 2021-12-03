import React, { useState, useEffect, createRef } from "react";
import styles from "../css/RestaurantCreateNew.module.css";
import axios from "axios";
import cx from "classnames";
import { useParams } from "react-router-dom";
const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

const productImageRef = createRef();

function getFormDataAndCallAPI(idproducts) {
  const formData = new FormData(
    document.querySelector('form[name="modifyProduct"]')
  );

  let token;

  axios
    .post(
      API_ADDRESS + "/users/login",
      {},
      {
        headers: { "Content-Type": "multipart/form-data" },
        auth: { username: "ma99", password: "123456789Aa@" },
      }
    )
    .then((res) => {
      console.log("res", res);
      token = res.data.token;

      axios
        .post(
          `${API_ADDRESS}/products/${idproducts}/editProductMultipart`,
          formData,
          {
            headers: {
              "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("Restaurant modified.");
          } else {
            alert("Something went wrong!");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong!");
        });
    })
    .catch(console.log);
}

function modifyProduct(idproducts) {
  const form = document.querySelector('form[name="modifyProduct"]');

  form.onsubmit = (event) => {
    event.preventDefault();
  };

  console.log("save clicked");

  getFormDataAndCallAPI(idproducts);
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

export default function ProductModify() {
  const [data, setData] = useState({
    idproducts: 0,
    categories_idcategories: 0,
    product_name: "",
    product_description: "",
    product_cost: 0,
    product_image: "",
  });
  const idproducts = useParams().idproducts;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${API_ADDRESS}/products/product/${idproducts}`
        );
        console.log(res);
        setData(res.data[0]);
        console.log(data.product_name);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <form action="" name="modifyProduct" className={styles.form}>
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
                onChange={(e) =>
                  setData({ ...data, product_name: e.target.value })
                }
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
                onChange={(e) =>
                  setData({ ...data, product_description: e.target.value })
                }
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
                  onChange={(e) =>
                    setData({ ...data, product_cost: e.target.value })
                  }
                />
              </div>
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Image</label>
              <div>
                <img
                  ref={productImageRef}
                  className={styles.productImage}
                  src={`${API_ADDRESS}/images/${data.product_image}`}
                />
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

            <button
              onClick={() => modifyProduct(idproducts)}
              className={styles.button}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
