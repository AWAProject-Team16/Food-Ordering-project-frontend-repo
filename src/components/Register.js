import React from "react";
import styles from "../css/RestaurantCreateNew.module.css";
import axios from "axios";
import cx from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

function isEmailValid(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

function isPasswordStrong(password) {
  //Have lowercase letters, uppercase letters, numbers, special chars, and at least 12 chars
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/;
  return regex.test(password);
}

function validateUsername() {
  const username = document.querySelector('input[name="username"]');
  const usernameErrorMessage = document.querySelector(
    `.${styles.errormessage}.username`
  );

  if (!username.value.trim()) {
    usernameErrorMessage.style.display = "inline-block";
    return false;
  } else {
    usernameErrorMessage.style.display = "none";
    return true;
  }
}

function validateEmail() {
  const email = document.querySelector('input[name="email"]');
  const emailErrorMessage = document.querySelector(
    `.${styles.errormessage}.email`
  );

  if (!isEmailValid(email.value)) {
    emailErrorMessage.style.display = "inline-block";
    return false;
  } else {
    emailErrorMessage.style.display = "none";
    return true;
  }
}

function validatePassword() {
  const password = document.querySelector('input[name="password"]');
  const passwordErrorMessage = document.querySelector(
    `.${styles.errormessage}.password`
  );

  if (!isPasswordStrong(password.value)) {
    passwordErrorMessage.style.display = "inline-block";
    return false;
  } else {
    passwordErrorMessage.style.display = "none";
    return true;
  }
}

function validateConfirmPassword() {
  const password = document.querySelector('input[name="password"]');
  const confirmPassword = document.querySelector(
    'input[name="confirm_password"]'
  );
  const confirmPasswordErrorMessage = document.querySelector(
    `.${styles.errormessage}.confirm_password`
  );

  if (password.value !== confirmPassword.value) {
    confirmPasswordErrorMessage.style.display = "inline-block";
    return false;
  } else {
    confirmPasswordErrorMessage.style.display = "none";
    return true;
  }
}

function validateAcceptTerms() {
  const checkbox = document.querySelector('input[type="checkbox"]');
  const checkboxErrorMessage = document.getElementsByClassName(
    styles.checkboxerrormessage
  )[0];

  if (!checkbox.checked) {
    checkboxErrorMessage.style.display = "block";
    return false;
  } else {
    checkboxErrorMessage.style.display = "none";
    return true;
  }
}

function hideErrorMessage(event) {
  const errorMessage = event.target?.parentNode?.getElementsByClassName(
    styles.errormessage
  )[0];
  if (errorMessage) errorMessage.style.display = "none";
}

function hideCheckboxErrorMessage(event) {
  const checkboxErrorMessage = document.getElementsByClassName(
    styles.checkboxerrormessage
  )[0];
  checkboxErrorMessage.style.display = "none";
}

function getFormDataAndCallAPI() {
  const formData = new FormData(
    document.querySelector('form[name="registrationForm"]')
  );
  let userObj = {};
  formData.forEach((value, key) => (userObj[key] = value));
  console.log("userObj", userObj);

  axios
    .post(API_ADDRESS + "/users/register", userObj)
    .then((response) => {
      console.log(response);
      if (response.status === 201) {
        toast.success("Register successfully. You can log in now.");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        toast.error("Something went wrong!");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Something went wrong!");
    });
}

function registerNow() {
  const form = document.querySelector('form[name="registrationForm"]');

  form.onsubmit = (event) => {
    event.preventDefault();
  };

  validateUsername();
  validateEmail();
  validatePassword();
  validateConfirmPassword();
  validateAcceptTerms();

  let isDataValid = false;
  isDataValid =
    validateUsername() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword() &&
    validateAcceptTerms();

  if (isDataValid) getFormDataAndCallAPI();
  else toast.error("Error, plase check your form");
}

function renderRegistrationForm() {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <form action="" name="registrationForm" className={styles.form}>
            <h3>Registration Form</h3>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Username
                <span
                  htmlFor=""
                  className={cx(styles.errormessage, "username")}
                >
                  Username cannot be empty!
                </span>
              </label>
              <input
                type="text"
                className={styles.formcontrol}
                name="username"
                onFocus={(event) => hideErrorMessage(event)}
              />
            </div>
            {/* <FormControlInput label="Username" errorMessage="Username cannot be empty!"/> */}
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Password
                <span
                  htmlFor=""
                  className={cx(styles.errormessage, "password")}
                >
                  Password must have lowercase letters, uppercase letters,
                  numbers, special characters, and at least 12 characters!
                </span>
              </label>
              <input
                type="password"
                className={styles.formcontrol}
                name="password"
                onFocus={(event) => hideErrorMessage(event)}
              />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Confirm Password
                <span
                  htmlFor=""
                  className={cx(styles.errormessage, "confirm_password")}
                >
                  Password does not match!
                </span>
              </label>
              <input
                type="password"
                className={styles.formcontrol}
                name="confirm_password"
                onFocus={(event) => hideErrorMessage(event)}
              />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Email Address
                <span htmlFor="" className={cx(styles.errormessage, "email")}>
                  Please enter a valid email!
                </span>
              </label>
              <input
                type="text"
                className={styles.formcontrol}
                name="email"
                onFocus={(event) => hideErrorMessage(event)}
              />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Full Name</label>
              <input type="text" className={styles.formcontrol} name="name" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Phone Number</label>
              <input
                type="tel"
                className={styles.formcontrol}
                name="phonenumber"
              />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Home Address</label>
              <input
                type="text"
                className={styles.formcontrol}
                name="address"
              />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Account Type</label>
              <select
                className={cx(styles.formcontrol, styles.select)}
                name="account_type"
              >
                <option value="1">Customer</option>
                <option value="2">Manger</option>
              </select>
            </div>
            <div className={styles.checkbox}>
              <label>
                <input
                  type="checkbox"
                  onFocus={(event) => hideCheckboxErrorMessage(event)}
                />
                I accept the Terms of Use & Privacy Policy.
                <div htmlFor="" className={styles.checkboxerrormessage}>
                  You must agree with our terms and policy!
                </div>
                <span className={styles.checkmark}></span>
              </label>
            </div>
            <button onClick={registerNow} className={styles.button}>
              Register Now
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

export default function Register() {
  return renderRegistrationForm();
}
