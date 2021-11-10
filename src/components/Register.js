import React from 'react';
import styles from '../css/Register.module.css';
import axios from 'axios';

function isEmailValid(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

function isPasswordStrong(password) {
  //Have lowercase letters, uppercase letters, numbers, special chars, and at least 12 chars
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/;
  return regex.test(password);
}

function validateEmail() {
  const email = document.querySelector('input[name="email"]');
  const emailErrorMessage = document.querySelector(`.${styles.errormessage}.email`);

  if (!isEmailValid(email.value)) {
    emailErrorMessage.style.display = "inline";
  } else {
    emailErrorMessage.style.display = "none";
  }
}

function validatePassword() {
  const password = document.querySelector('input[name="password"]');
  const passwordErrorMessage = document.getElementsByClassName(`${styles.errormessage} password`)[0];

  if (!isPasswordStrong(password.value)) {
    passwordErrorMessage.style.display = "inline";
  } else {
    passwordErrorMessage.style.display = "none";
  }
}

function validateConfirmPassword() {
  const password = document.querySelector('input[name="password"]');
  const confirmPassword = document.querySelector('input[name="confirm_password"]');
  const confirmPasswordErrorMessage = document.getElementsByClassName(`${styles.errormessage} confirm_password`)[0];

  if (password.value !== confirmPassword.value) {
    confirmPasswordErrorMessage.style.display = "inline";
  } else {
    confirmPasswordErrorMessage.style.display = "none";
  }
}

function validateAcceptTerms() {
  const checkbox = document.querySelector('input[type="checkbox"]');
  const checkboxErrorMessage = document.getElementsByClassName(styles.checkboxerrormessage)[0];

  if (!checkbox.checked) {
    checkboxErrorMessage.style.display = "block";
  } else {
    checkboxErrorMessage.style.display = "none";
  }
}

function hideErrorMessage(event) {
  const errorMessage = event.target?.parentNode?.getElementsByClassName(styles.errormessage)[0];
  errorMessage.style.display = "none";
}

function hideCheckboxErrorMessage(event) {
  const checkboxErrorMessage = document.getElementsByClassName(styles.checkboxerrormessage)[0];
  checkboxErrorMessage.style.display = "none";
}

function getFormDataAndCallAPI() {
  const formData = new FormData(document.querySelector('form[name="registrationForm"]'));
  let userObj = {}
  formData.forEach((value, key) => userObj[key] = value);
  axios.post('/users/register', userObj)
    .then((response) =>{
      console.log(response);
      alert("Register successfully. You can log in now.")
    })
    .catch((err) =>console.error(err))
  
}

function registerNow() {
  const form = document.querySelector('form[name="registrationForm"]');

  form.onsubmit = (event) => {
    event.preventDefault();
  };

  validateEmail();
  validatePassword();
  validateConfirmPassword();
  validateAcceptTerms();

  // getFormDataAndCallAPI();
}

function renderRegistrationForm() {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <form action="" name="registrationForm">
            <h3>Registration Form</h3>
            <div className={styles.formgroup}>
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Username</label>
              <input type="text" className={styles.formcontrol} name="username" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Password
                <span htmlFor="" className={`${styles.errormessage} password`}>
                  Password must have lowercase letters, uppercase letters, numbers, special characters, and at least 12 characters!
                </span>
              </label>
              <input type="password" className={styles.formcontrol} name="password"  />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Confirm Password
                <span htmlFor="" className={`${styles.errormessage} confirm_password`}>Password does not match!</span>
              </label>
              <input type="password" className={styles.formcontrol} name="confirm_password" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Fullname</label>
              <input type="text" className={styles.formcontrol} name="name" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Email
                <span htmlFor="" className={`${styles.errormessage} email`}>Please enter a valid email!</span>
              </label>
              <input type="email" className={styles.formcontrol} name="email"  />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Home Address</label>
              <input type="text" className={styles.formcontrol} name="address" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Account Type</label>
              <select className={styles.formcontrol}>
                <option value="customer">Customer</option>
                <option value="manager">Manger</option>
              </select>
            </div>
            <div className={styles.checkbox}>
              <label>
                <input type="checkbox" />
                I accept the Terms of Use & Privacy Policy.
                <div htmlFor="" className={styles.checkboxerrormessage} >
                  You must agree with our terms and policy!
                </div>
                <span className={styles.checkmark}></span>
              </label>
            </div>
            <button onClick={registerNow}>Register Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  return renderRegistrationForm();
}
