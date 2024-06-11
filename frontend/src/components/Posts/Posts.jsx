import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./Posts.css";
import axios from "axios";
import PostTimestamp from "../PostTimestamp";

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
      {posts?.map((post, ind) => {
        return (
          <div key={ind} className="post-container">
            {/* ---------------------------------------- */}

            <div className="post-top">
              <div className="post-top-left">
                <div className="image">
                  <img src={post.user.profileImage} alt="" />
                </div>

                <div>
                  <div className="user-name">
                    {post.user.firstName} {post.user.lastName}
                  </div>
                  <div className="times">
                    <PostTimestamp timestamp={post.createdAt} />
                  </div>
                </div>
              </div>

              {post.user._id === localStorage.getItem("userId") && (
                <div className="post-top-right">
                  <div>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </div>
                  <div>
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </div>
              )}
            </div>
            {/* ---------------------------------------- */}

            <div className="post-body">
              <div className="post-content">{post.post}</div>
              {post.image && (
                <div className="post-image">
                  <img src={post.image} alt="post image" />
                </div>
              )}
            </div>

            {/* ---------------------------------------- */}

            <div className="post-bottom">
              <div className="commentsAndLikesNumber">
                <div className="like">
                  <span>{post.likes.length}</span> Likes
                </div>

                <div className="comment">
                  <span>{post.comments.length}</span> Comments
                </div>
              </div>

              <div className="commentsAndLikesButton">
                <div className="like">
                  <i className="fa-solid fa-heart"></i>
                  <div>Like</div>
                </div>

                <div className="comment">
                  <i className="fa-regular fa-comment"></i>
                  <div>Comment</div>
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
