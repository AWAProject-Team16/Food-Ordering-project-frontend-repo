import React, {useState} from 'react'
import styles from '../css/Register.module.css';
import axios from 'axios';



function getLoginData(){
    const username = document.querySelector('input[name="username"]')
    const password = document.querySelector('input[name="password"]')
    

    axios.post("http://localhost:3000/login",{
        username: username,
        password: password,
    }).then((response) => {
        if (username == response.data.username && password == response.data.password) {
           console.log("Logged in")
        }
        else {
            console.log("Wrong username or password")
        }
    })
}

function renderLoginForm(){
    return(
        <div className={styles.wrapper}>
        <div className={styles.inner}>
        <form>
            <h3>Login</h3>
        <div className={styles.formwrapper}>
            <label>Enter Username</label>
            <input type="text" name="username" className={styles.formcontrol}/>
        </div>
        <div className={styles.formwrapper}>
            <label>Enter password</label>
            <input type="password" name ="password" className={styles.formcontrol}/>
        </div>
            <button onClick={getLoginData} >Login</button>
            <h1>{}</h1>
        </form>
        </div>
        </div>
    )

}
export default function Login() {
    return renderLoginForm();
  }