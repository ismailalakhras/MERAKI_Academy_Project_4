import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Login = () => {
  const { setToken, setIsLoggedIn, loginError, setLoginError } =
    useContext(AppContext);

  return (
    <div>
      <Link
        onClick={() => {
          setLoginError("");
        }}
        to={"users/login"}
        className="link-header"
      >
        Login
      </Link>
    </div>
  );
};

export default Login;
