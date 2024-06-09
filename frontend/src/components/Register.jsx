import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Register = () => {
  const { setToken, setIsLoggedIn, loginError, setLoginError } =
    useContext(AppContext);

  return (
    <div>
      <Link
        onClick={() => {
          setLoginError("");
        }}
        to={"users/register"}
        className="link-header"
      >
        Register
      </Link>
    </div>
  );
};

export default Register;
