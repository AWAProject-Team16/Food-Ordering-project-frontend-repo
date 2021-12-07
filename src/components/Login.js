import React, {useState, useContext} from 'react'
import styles from '../css/Register.module.css';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import { TypeContext } from '../context/Contexts';
import Home from './Home';
import { useNavigate } from 'react-router';
import RouterURL from '../router/RouterURL';


export default function Login(props) {
   // let TypeContextValue = useContext(TypeContext)
    const [loginProcessState, setLoginProcessState] = useState("idle");
    let navigate = useNavigate()

    const handleLoginSubmit = async (event) =>{
        event.preventDefault();
        setLoginProcessState("processing");

        try {
            const result = await axios.post(
                "http://localhost:5000/users/login",
                null,
                {
                    auth: {
                        username: event.target.username.value,
                        password: event.target.password.value
                    }
                }
            );
            console.log(result);
            const receivedJWT = result.data.token;
            console.log("token "+receivedJWT);
            setLoginProcessState("success");
            setTimeout(() => {
                setLoginProcessState("idle")
                props.loginToken(receivedJWT)

                const decodedToken = jwt.decode(receivedJWT);
                //console.log("decoded token "+ decodedToken)
                console.log("user account type loginissa " + decodedToken.user.account_type)
               // setType(decodedToken.user.account_type);
                //const type = (decodedToken.user.account_type)
                //TypeContextValue = decodedToken.user.account_type
                //console.log("typecontextvalue: " + TypeContextValue)
                const typeToken = decodedToken.user.account_type
                props.typeToken(typeToken)

                if (typeToken == 2)
                {
                  navigate("/managers")
                }
                else {
                  navigate("/")
                }
                
                

                
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