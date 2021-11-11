import React from 'react';
import styles from '../css/RestaurantCreateNew.module.css';
import axios from 'axios';

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

function createRestaurant() {
  const form = document.querySelector('form[name="createRestaurant"]');

  form.onsubmit = (event) => {
    event.preventDefault();
  };

  console.log('creaate restaurant')

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
          <form action="" name="createRestaurant">
            <h3>Create A New Restaurant</h3>
            <div className={styles.formgroup}>
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Restaurant Name
                <span htmlFor="" className={`${styles.errormessage} name`}>
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
              <textarea required rows="12" className={styles.formcontrol} name="operating_hours" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Restaurant Type</label>
              <select className={styles.formcontrol} name="restaurant_type">
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
              <select className={styles.formcontrol} name="restaurant_type">
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
              <textarea required rows="50" className={styles.formcontrol} name="restaurant_description" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Image</label>
              <div>
                <input type="file" accept="image/*" className={styles.formcontrol} name="image" id="file_picker" onChange={showChosenFileName} />
                <label className={styles.formcontrol} htmlFor="file_picker">Click to choose an image</label>
              </div>
            </div>


            <button onClick={createRestaurant}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function RestaurantCreateNew() {
  return render();
}
