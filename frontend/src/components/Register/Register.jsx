import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import "./Register.css";

const Register = () => {
  const { setToken, setIsLoggedIn, loginError, setLoginError } =
    useContext(AppContext);

  const [loginActive, setLoginActive] = useState(true);

  return (
    <div className="register-container">
      <div
        className={loginActive ? "container " : "right-panel-active container"}
      >
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
           
            <span>or use your email for registration</span>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="number" placeholder="Age" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button >Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button onClick={()=>{setLoginActive(true)}} className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={()=>{setLoginActive(false)}} className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
