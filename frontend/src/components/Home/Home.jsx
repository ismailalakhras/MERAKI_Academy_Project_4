import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./Home.css";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import UploadPic from "../UploadPic/UploadPic";
import Posts from "../Posts/Posts";
import CreatePost from "../CreatePost/CreatePost";
import AddPostScreen from "../addPostScreen/addPostScreen";

const Home = () => {
  const [isActive, setIsActive] = useState("");
  const [profilePicScreen, setProfilePicScreen] = useState(false);

  const [addPostScreen, setAddPostScreen] = useState(false);

  const { token, setToken, toggle, setToggle } = useContext(AppContext);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    axios
      .get("http://localhost:5000/posts/userId", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        // console.log(result);
        localStorage.setItem("userId", result.data._id);
        localStorage.setItem("profilePic", result.data.profileImage);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [toggle]);

  return (
    <div>
      {profilePicScreen && (
        <UploadPic setProfilePicScreen={setProfilePicScreen} />
      )}

      {addPostScreen && <AddPostScreen setAddPostScreen={setAddPostScreen} />}

      <div className="header">
        <div className="header-left_side">
          <div className="logo">
            <img src={require("../../pic/logo.png")} alt="" />
          </div>
        </div>
        <div className={`header-middle ${isActive}`}>
          <Link
            to={"home"}
            onClick={() => {
              setIsActive("home");
            }}
            className="link home"
          >
            <i className="fa-solid fa-house "></i>Home
          </Link>
          <Link
            onClick={() => {
              setIsActive("followers");
            }}
            className="link followers"
          >
            Followers
          </Link>
          <Link
            onClick={() => {
              setIsActive("following");
            }}
            className="link following"
          >
            Following
          </Link>
          <Link
            onClick={() => {
              setIsActive("logout");
            }}
            className="link logout"
          >
            <i className="fa-solid fa-right-from-bracket"></i>Logout
          </Link>
        </div>
        <div className="header-right_side">
          <div className="notification">
            <i className="fa-regular fa-bell"></i>
            <div>0</div>
          </div>
          <div className="message">
            <i className="fa-regular fa-message"></i>
            <div>0</div>
          </div>
        </div>
      </div>

      {/* --------------------------------- */}
      {/* --------------------------------- */}
      {/* --------------------------------- */}

      <CreatePost setAddPostScreen={setAddPostScreen} setProfilePicScreen={setProfilePicScreen} />

      {/* --------------------------------- */}
      {/* --------------------------------- */}
      {/* --------------------------------- */}

      <Routes>
        <Route path="home" element={<Posts />} />
      </Routes>
    </div>
  );
};

export default Home;
