import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./Posts.css";
import axios from "axios";

const Posts = () => {
  const {
    token,
    setToken,
    toggle,
    setToggle,
    profilePicScreen,
    setProfilePicScreen,
  } = useContext(AppContext);

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        console.log(result.data.posts);

        setPosts(result.data.posts);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [toggle]);

  return (
    <div className="posts-page">
      {posts?.map((post) => {
        return (
          <div className="post-container">
            <div className="deleteAndUpdateBtn">
              <div>
                <i className="fa-regular fa-pen-to-square"></i>
              </div>
              <div>
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
            <div className="post-top">
              <div className="post-top-left">
                <div className="image">
                  <img src={(post.user.profileImage)} alt="" />
                </div>
                <div className="user-name">{post.user.firstName}</div>
              </div>
              <div className="post-top-right">
                <p>{post.post}</p>
              </div>
            </div>
            <div className="post-bottom">
              <div className="like">
                <i className="fa-solid fa-heart"></i>
                <div>
                  <span>{post.likes.length}</span> Like
                </div>
              </div>

              <div className="comment">
                <i className="fa-regular fa-comment"></i>
                <div>
                  <span>{post.comments.length}</span> Comment
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
