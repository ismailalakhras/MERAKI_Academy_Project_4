import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./Home.css";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import UploadPic from "../UploadPic/UploadPic";
import Posts from "../Posts/Posts";
import CreatePost from "../CreatePost/CreatePost";
import AddPostScreen from "../addPostScreen/addPostScreen";
import Chat from "../Chat/Chat";


const Home = () => {
  const [chatScreen, setChatScreen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [profilePicScreen, setProfilePicScreen] = useState(false);

  const [addPostScreen, setAddPostScreen] = useState(false);

  const { setToken, toggle, setPageName, setShowComments, setIsLoggedIn } =
    useContext(AppContext);


  useEffect(() => {
    setToken(localStorage.getItem("token"));

    axios
      .get("http://localhost:5000/users/userId ", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setPageName("My Profile Info");
        localStorage.setItem("userId", result.data.user._id);
        localStorage.setItem(
          "userName",
          `${result.data.user.firstName} ${result.data.user.lastName}`
        );
        localStorage.setItem("firstName", `${result.data.user.firstName} `);

        // localStorage.setItem("profileImage", result.data.profileImage);
        localStorage.setItem("profilePic", result.data.user.profileImage);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [toggle]);

  return (
    <div className="Home">
      {chatScreen && <Chat />}

      {profilePicScreen && (
        <>
          <UploadPic setProfilePicScreen={setProfilePicScreen} />
        </>
      )}

      {addPostScreen && <AddPostScreen setAddPostScreen={setAddPostScreen} />}

      <div className="header">
        <div className="header-left_side">
          <div className="logo">
            <img src={require("../../pic/logo2.png")} alt="" />
          </div>
        </div>
        <div className={`header-middle ${isActive}`}>
          <Link
            onClick={() => {
              setShowComments(false);
              setIsActive("home");
              setPageName("My Profile Info");
            }}
            className="link home"
          >
            <i className="fa-solid fa-house "></i>Home
          </Link>
          <Link
            onClick={() => {
              setShowComments(false);

              setIsActive("followers");
              setPageName("Followers");
            }}
            className="link followers"
          >
            Followers
          </Link>
          <Link
            onClick={() => {
              setShowComments(false);

              setIsActive("following");
              setPageName("Following");
            }}
            className="link following"
          >
            Following
          </Link>
          <Link
            onClick={() => {
              setShowComments(false);

              setIsActive("suggestion");
              setPageName("Suggestions");
            }}
            className="link suggestion"
          >
            Suggestions
          </Link>
          <Link
            onClick={() => {
              setIsActive("logout");
              setToken("");
              setIsLoggedIn(false);
              localStorage.clear();
            }}
            className="link logout"
          >
            <i className="fa-solid fa-right-from-bracket"></i>Logout
          </Link>
        </div>
        <div className="header-right_side">
          <div className="notification">
            <i className="fa-regular fa-bell"></i>
            {/* <div>0</div> */}
          </div>
          <div onClick={() => setChatScreen(true)} className="message">
            <i className="fa-regular fa-message"></i>
            {/* <div>0</div> */}
          </div>
        </div>
      </div>

      {/* --------------------------------- */}
      {/* --------------------------------- */}
      {/* --------------------------------- */}

      <CreatePost
        setAddPostScreen={setAddPostScreen}
        setProfilePicScreen={setProfilePicScreen}
      />

      {/* --------------------------------- */}
      {/* --------------------------------- */}
      {/* --------------------------------- */}

      <Posts setProfilePicScreen={setProfilePicScreen} />
    </div>
  );
};

export default Home;
