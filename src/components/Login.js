import React, {useState} from 'react'
import styles from '../css/Register.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router';


export default function Login(props) {

    let navigate = useNavigate();
    const [loginProcessState, setLoginProcessState] = useState("idle");

    const handleLoginSubmit = async (event) =>{
        event.preventDefault();
        setLoginProcessState("processing");

        try {
            const result = await axios.post(
                "http://localhost:5000/loginForJWT",
                null,
                {
                    auth: {
                        username: event.target.username.value,
                        password: event.target.password.value
                    }
                }
            );
            console.log(result);
            console.log(result.data);
            setLoginProcessState("success");
            setTimeout(() => {
                setLoginProcessState("idle")
            //    props.login(result.data.token);
                navigate("/", { replace: true});
                
            }, 1500)
        } catch (error) {
            console.log(error.message);
            setLoginProcessState("error")
            setTimeout(() => setLoginProcessState("idle"), 1500)
        }
    }

    let loginUIControls = null;
  switch(loginProcessState) {
    case "idle":
      loginUIControls = <button type="submit">Login</button>
      break;

    case "processing":
      loginUIControls = <span style={{color: 'blue'}}>Processing login...</span>
      break;

    case "success":
      loginUIControls = <span style={{color: 'green'}}>Login successful</span>
      break;

    case "error":
      loginUIControls = <span style={{color: 'red'}}>Error</span>
      break;

    default:
      loginUIControls = <button type="submit">Login</button>
  }

    return (
    <div className={styles.wrapper}>
    <div className={styles.inner}>
    <form onSubmit={ handleLoginSubmit }>
        <h3>Login</h3>
    <div className={styles.formwrapper}>
        <label>Enter Username</label>
        <input type="text" name="username" className={styles.formcontrol}/>
    </div>
    <div className={styles.formwrapper}>
        <label>Enter password</label>
        <input type="password" name ="password" className={styles.formcontrol}/>
    </div>
        { loginUIControls }
    </form>
    </div>
    </div>
    )
  }