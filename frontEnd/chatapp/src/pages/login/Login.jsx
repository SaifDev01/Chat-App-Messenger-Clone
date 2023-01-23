import { useContext, useRef, useState } from "react";
import "./login.css";
import axios from "axios";

import { loginCall } from "../../ApiCalls";
import { AuthContext } from "../../context/AuthContext";
// import { CircularProgress } from "@material-ui/core";

export default function Login() {
  
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  console.log(email);
  const handleClick = async(e) => {
    
    e.preventDefault();
    const res = await login()
    console.log(res);
  };

  const login = async (user) => {
    try {
      const res = await axios.post("http://localhost:4001/api/v1/login", {
        email: email,
        password: password,
      },{withCredentials : true});
      // console.log(JSON.stringify(res));
      return res
     
    } catch (e) {
      console.log(e);
      // console.log(e.response);
      // console.log(e.response);
    }
    
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button className="loginButton" type="submit" >
            Login
            </button>
            <span className="loginForgot">Forgot Password?</span>
             <button className="loginRegisterButton">
              Register
             </button> 
          </form>
        </div>
      </div>
    </div>
  );
}
