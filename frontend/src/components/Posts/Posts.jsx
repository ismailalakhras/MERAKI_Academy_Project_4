import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./Posts.css";

const Posts = () => {
  const {
    token,
    setToken,
    toggle,
    setToggle,
    profilePicScreen,
    setProfilePicScreen,
  } = useContext(AppContext);

  return (
    <div className="posts-page">
      <div className="post-container">
        <div className="post-top">
          <div className="post-top-left">
            <div className="image">
              <img src={require("../../pic/logo.png")} alt="" />
            </div>
            <div className="user-name">ismail</div>
          </div>
          <div className="post-top-right">
            <p>content of post</p>
          </div>
        </div>
        <div className="post-bottom">
          <div className="like">
            <i class="fa-solid fa-heart"></i>
            <div>Like</div>
          </div>

          <div className="comment">
            <i class="fa-regular fa-comment"></i>
            <div>Comment</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
