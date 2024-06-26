import React, { useState, useEffect, createContext, useRef } from "react";
import "./App.css";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import axios from "axios";
import { io } from "socket.io-client";

export const AppContext = createContext();

const App = () => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [pageName, setPageName] = useState("");

  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState([]);

  const [post, setPost] = useState(null);

  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [suggestions, setSuggestions] = useState(false);

  const [createChat, setCreateChat] = useState(null);

  const [chatScreen, setChatScreen] = useState(false);

  


  const socket = useRef();

  // useEffect(() => {
  //   socket.current = io("http://localhost:8800");
  //   socket.current.emit("new-user-add", localStorage.getItem("userId"));
  //   socket.current.on("get-users", (users) => {
  //     setOnlineUsers(users);
  //   });
  // }, [localStorage.getItem("userId")]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users`)
      .then((result) => {
        // console.log("from App.jsx", result.data.users);
        setUsers(result.data.users);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token"));
  }, []);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        loginError,
        setLoginError,
        pageName,
        setPageName,
        showComments,
        setShowComments,
        comments,
        setComments,
        post,
        setPost,
        users,
        setUsers,
        toggle,
        setToggle,
        onlineUsers,
        setOnlineUsers,
        suggestions,
        setSuggestions,
        createChat,
        setCreateChat,
        chatScreen, setChatScreen
        
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
