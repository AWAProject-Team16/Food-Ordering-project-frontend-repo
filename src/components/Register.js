import React, { useState } from "react";
import styles from "../css/_Common.module.css";
import axios from "axios";
import cx from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDiaglog from "./ConfirmationDiaglog";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

export default function Register(props) {
  const [usernameErrorMessageVisible, setUserNameErrorMessageVisible] = useState(false);
  const [emailErrorMessageVisible, setEmailErrorMessageVisible] = useState(false);
  const [passwordErrorMessageVisible, setPasswordErrorMessageVisible] = useState(false);
  const [confirmPasswordErrorMessageVisible, setConfirmPasswordErrorMessageVisible] = useState(false);
  const [checkboxErrorMessageVisible, setCheckboxErrorMessageVisible] = useState(false);

  function isEmailValid(email) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  function isPasswordStrong(password) {
    //Have lowercase letters, uppercase letters, numbers, special chars, and at least 12 chars
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/;
    return regex.test(password);
  }

  function validateUsername(username) {
    if (!username.value.trim()) {
      setUserNameErrorMessageVisible(true);
      return false;
    } else {
      setUserNameErrorMessageVisible(false);
      return true;
    }
  }

  function validateEmail(email) {
    if (!isEmailValid(email.value)) {
      setEmailErrorMessageVisible(true);
      return false;
    } else {
      setEmailErrorMessageVisible(false);
      return true;
    }
  }

  function validatePassword(password) {
    if (!isPasswordStrong(password.value)) {
      setPasswordErrorMessageVisible(true);
      return false;
    } else {
      setPasswordErrorMessageVisible(false);
      return true;
    }
  }

  function validateConfirmPassword(password, confirmPassword) {
    if (password.value !== confirmPassword.value) {
      setConfirmPasswordErrorMessageVisible(true);
      return false;
    } else {
      setConfirmPasswordErrorMessageVisible(false);
      return true;
    }
  }

  function validateAcceptTerms(checkbox) {
    if (!checkbox.checked) {
      setCheckboxErrorMessageVisible(true);
      return false;
    } else {
      setCheckboxErrorMessageVisible(false);
      return true;
    }
  }

  function submit(e) {
    e.preventDefault();
    const form = e.target;

    validateUsername(form.username);
    validateEmail(form.email);
    validatePassword(form.password);
    validateConfirmPassword(form.password, form.confirm_password);
    validateAcceptTerms(form.checkbox);

    let isDataValid = false;
    isDataValid =
      validateUsername(form.username) &&
      validateEmail(form.email) &&
      validatePassword(form.password) &&
      validateConfirmPassword(form.password, form.confirm_password) &&
      validateAcceptTerms(form.checkbox);

    if (!isDataValid) {
      toast.error("Input error, please check your form");
    } else {
      const formData = new FormData(form);
      let userObj = {};
      formData.forEach((value, key) => (userObj[key] = value));

      axios
        .post(API_ADDRESS + "/users/register", userObj)
        .then((response) => {
          if (response.status === 201) {
            const okCb = () => {
              if (props.onCloseRegister) props.onCloseRegister();
            };
            toast.success(
              <ConfirmationDiaglog text="Register successfully. You can log in now." btn1Text="OK" btn1Callback={okCb} />,
              {
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
                draggable: false,
              }
            );
          } else {
            toast.error("Something went wrong!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <form action="" name="registrationForm" className={styles.form} onSubmit={submit}>
            <h3>Registration Form</h3>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Username
                <span htmlFor="" className={cx(styles.errormessage, usernameErrorMessageVisible ? styles.show : styles.hide)}>
                  Username cannot be empty!
                </span>
              </label>
              <input type="text" className={styles.formcontrol} name="username" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Password
                <span htmlFor="" className={cx(styles.errormessage, passwordErrorMessageVisible ? styles.show : styles.hide)}>
                  Password must have lowercase letters, uppercase letters, numbers, special characters, and at least 12 characters!
                </span>
              </label>
              <input type="password" className={styles.formcontrol} name="password" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Confirm Password
                <span htmlFor="" className={cx(styles.errormessage, confirmPasswordErrorMessageVisible ? styles.show : styles.hide)}>
                  Password does not match!
                </span>
              </label>
              <input type="password" className={styles.formcontrol} name="confirm_password" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">
                Email Address
                <span htmlFor="" className={cx(styles.errormessage, emailErrorMessageVisible ? styles.show : styles.hide)}>
                  Please enter a valid email!
                </span>
              </label>
              <input type="text" className={styles.formcontrol} name="email" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Full Name</label>
              <input type="text" className={styles.formcontrol} name="name" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Phone Number</label>
              <input type="tel" className={styles.formcontrol} name="phonenumber" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Home Address</label>
              <input type="text" className={styles.formcontrol} name="address" />
            </div>
            <div className={styles.formwrapper}>
              <label htmlFor="">Account Type</label>
              <select className={cx(styles.formcontrol, styles.select)} name="account_type">
                <option value="1">Customer</option>
                <option value="2">Manger</option>
              </select>
            </div>
            <div className={styles.checkbox}>
              <label>
                <input type="checkbox" name="checkbox" />I accept the Terms of Use & Privacy Policy.
                <div htmlFor="" className={cx(styles.errormessage, checkboxErrorMessageVisible ? styles.show : styles.hide)}>
                  You must agree with our terms and policy!
                </div>
                <span className={styles.checkmark}></span>
              </label>
            </div>
            <button type="submit" className={styles.button}>
              Register Now
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
