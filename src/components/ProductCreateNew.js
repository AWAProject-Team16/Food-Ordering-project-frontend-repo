import React from 'react';
import styles from '../css/RestaurantCreateNew.module.css';
import axios from 'axios';
import cx from 'classnames';

function getFormDataAndCallAPI() {
  const formData = new FormData(document.querySelector('form[name="registrationForm"]'));
  let userObj = {}
  formData.forEach((value, key) => userObj[key] = value);

  axios.post('/users/register', userObj)
    .then((response) => {
      console.log(response);
      alert("Register successfully. You can log in now.")
    })
    .catch((err) => console.error(err))

}

function createProduct() {
  const form = document.querySelector('form[name="createProduct"]');

  form.onsubmit = (event) => {
    event.preventDefault();
  };

  console.log('creaate Product')

  // getFormDataAndCallAPI();
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

function render() {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <form action="" name="createProduct" className={styles.form}>
            <h3>Create A New Product</h3>
            <div className={styles.formgroup}>
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Product Name
                <span htmlFor="" className={cx(styles.errormessage, "name")}>
                  Product Name cannot be empty!
                </span>
              </label>
              <input required type="text" className={styles.formcontrol} name="name" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Product Description
              </label>
              <textarea required rows="12" className={cx(styles.formcontrol, styles.textarea)} name="description" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Product Cost
              </label>
              <div className={styles.flex}>
                <div>&euro;</div>
                <input required type="number" className={styles.formcontrol} name="" />
              </div>
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Image</label>
              <div>
                <input type="file" accept="image/*" className={cx(styles.formcontrol, styles.input_file)} name="image" id="file_picker" onChange={showChosenFileName} />
                <label className={styles.formcontrol} htmlFor="file_picker">Click to choose an image</label>
              </div>
            </div>


            <button onClick={createProduct} className={styles.button}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ProductCreateNew() {
  return render();
}
