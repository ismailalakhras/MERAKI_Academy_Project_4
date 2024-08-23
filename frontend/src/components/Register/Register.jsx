import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import "./Register.css";
import axios from "axios";
import makeToast from "../sweetalert2/Toaster";

const Register = () => {
  const { setToken, setIsLoggedIn, loginError, setLoginError } =
    useContext(AppContext);

  const [loginActive, setLoginActive] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="register-container">
      <div
        className={loginActive ? "container " : "right-panel-active container"}
      >
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>

            <input
              value={firstName}
              onChange={(e) => {
                setLoginError("");
                setFirstName(e.target.value);
              }}
              type="text"
              placeholder="First Name"
            />
            <input
              value={lastName}
              onChange={(e) => {
                setLoginError("");
                setLastName(e.target.value);
              }}
              type="text"
              placeholder="Last Name"
            />
            <input
              value={age}
              onChange={(e) => {
                setLoginError("");
                setAge(e.target.value);
              }}
              type="number"
              placeholder="Age"
            />
            <input
              value={email}
              onChange={(e) => {
                setLoginError("");
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => {
                setLoginError("");
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
            <button
              onClick={() => {
                axios
                  .post("https://webpulse-35pb.onrender.com/users/register", {
                    firstName,
                    lastName,
                    age,
                    email,
                    password,
                  })
                  .then((result) => {
                    setLoginError("");
                    setFirstName("");
                    setLastName("");
                    setAge("");
                    setEmail("");
                    setPassword("");
                    setLoginActive(true);
                  })
                  .catch((err) => {
                    console.log(err);
                    setLoginError(err.response.data.message);
                  });
              }}
            >
              Sign Up
            </button>
            <div className={loginError ? "err-message " : "err-message hidden"}>
              {loginError}
            </div>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>

            <input
              value={email}
              onChange={(e) => {
                setLoginError("");
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => {
                setLoginError("");
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
            <a href="#">Forgot your password?</a>
            <button
              onClick={() => {
                axios
                  .post("https://webpulse-35pb.onrender.com/users/login", {
                    email,
                    password,
                  })
                  .then((result) => {
                    setToken(result.data.token);
                    setLoginError("");
                    setEmail("");
                    setPassword("");
                    setIsLoggedIn(true);

                    localStorage.setItem("token", result.data.token);
                    makeToast("success", result.data.message)
                  })
                  .catch((err) => {
                    setLoginError(err.response.data.message);
                    makeToast("error", err.response.data.message)
                  });
              }}
            >
              Sign In
            </button>
            <div className={loginError ? "err-message " : "err-message hidden"}>
              {loginError}
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
              Stay connected and share what's new with your friends
              </p>
              <button
                onClick={() => {
                  setLoginError("");
                  setLoginActive(true);
                  setLoginError("");
                  setFirstName("");
                  setLastName("");
                  setAge("");
                  setEmail("");
                  setPassword("");
                }}
                className="ghost"
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>We're excited to have you join our community. Let's get you set up to connect with others and share your experiences.</p>
              <button
                onClick={() => {
                  setLoginError("");
                  setLoginActive(false);
                  setFirstName("");
                  setLastName("");
                  setAge("");
                  setEmail("");
                  setPassword("");
                }}
                className="ghost"
              >
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
