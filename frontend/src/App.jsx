import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";

export const AppContext = createContext();

const App = () => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token"));
  });

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        loginError,
        setLoginError,
        toggle,
        setToggle
      }}
    >
      <div className="App">
        {isLoggedIn ? (
          <Home />
        ) : (
          <>
            <Register />
          </>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;
