import React from 'react';
import styles from '../css/RestaurantCreateNew.module.css';
import axios from 'axios';
import cx from 'classnames';
const API_ADDRESS = process.env.REACT_APP_API_ADDRESS

function getFormDataAndCallAPI() {
  const formData = new FormData(document.querySelector('form[name="createRestaurantForm"]'));
  // console.log(document.querySelector('input[name="image"]').files[0])
  // formData.append('image', document.querySelector('input[name="image"]').files[0])
  console.log(formData)
  let restaurantObj = {}
  formData.forEach((value, key) => restaurantObj[key] = value);

  // delete restaurantObj.image;  // BECAUSE BACKEND CANNOT HANDLE IT NOW

  console.log('restaurantObj:', restaurantObj);

  let token;

  axios.post(API_ADDRESS + '/users/login', {}, {
    auth: {username: 'ma99', password: '123456789Aa@'}
  })
    .then(res => {
      // console.log(res)
      token = res.data.token;

      axios.post(API_ADDRESS + '/restaurants/newRestaurant', restaurantObj, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${restaurantObj._boundary}`,
          'Authorization': `Bearer ${token}`
        },
      })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            alert("Restaurant created.");
          } else {
            alert("Something went wrong!");
          }
        })
        .catch((err) => {
          console.log(err)
          alert("Something went wrong!");
        })
    })
    .catch(console.log)
  return



}

function createRestaurant() {
  const form = document.querySelector('form[name="createRestaurantForm"]');

  form.onsubmit = (event) => {
    event.preventDefault();
  };

  console.log('create clicked')

  getFormDataAndCallAPI();
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
          <form action="" name="createRestaurantForm" className={styles.form}>
            <h3>Create A New Restaurant</h3>
            <div className={styles.formgroup}>
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Restaurant Name
                <span htmlFor="" className={cx(styles.errormessage, "name")}>
                  Restaurant Name cannot be empty!
                </span>
              </label>
              <input required type="text" className={styles.formcontrol} name="name" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Restaurant Address
              </label>
              <input required type="text" className={styles.formcontrol} name="address" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Operating Hours
              </label>
              <textarea required rows="12" className={cx(styles.formcontrol, styles.textarea)} name="operating_hours" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Phone Number
              </label>
              <input required type="tel" className={styles.formcontrol} name="phonenumber" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Restaurant Type</label>
              <select className={cx(styles.formcontrol, styles.select)} name="restaurant_type">
                <option value="Buffet">Buffet</option>
                <option value="Fast food">Fast food</option>
                <option value="Fast casual">Fast casual</option>
                <option value="Casual dining">Casual dining</option>
                <option value="Fine dining">Fine dining</option>
              </select>
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Price Level
              </label>
              <select className={cx(styles.formcontrol, styles.select)} name="price_level">
                <option value="1">&euro;</option>
                <option value="2">&euro;&euro;</option>
                <option value="3">&euro;&euro;&euro;</option>
                <option value="4">&euro;&euro;&euro;&euro;</option>
              </select>
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Restaurant Description
              </label>
              <textarea required rows="12" className={cx(styles.formcontrol, styles.textarea)} name="restaurant_description" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Image</label>
              <div>
                <input type="file" accept="image/*" className={cx(styles.formcontrol, styles.input_file)} name="image" id="file_picker" onChange={showChosenFileName} multiple />
                <label className={styles.formcontrol} htmlFor="file_picker">Click to choose an image</label>
              </div>
            </div>


            <button onClick={createRestaurant} className={styles.button}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function RestaurantCreateNew() {
  return render();
}
