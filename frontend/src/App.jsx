import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";

export const AppContext = createContext();

const App = () => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

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
      }}
    >
      <div className="App">
        {isLoggedIn ? (
          <Home />
        ) : (
          <>
            <Routes>
              <Route path="users/register" element={<Register />} />
              <Route path="users/login" element={<Login />} />
            </Routes>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;
