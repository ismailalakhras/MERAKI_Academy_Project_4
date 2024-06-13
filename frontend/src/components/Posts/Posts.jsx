import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./Posts.css";
import axios from "axios";
import PostTimestamp from "../PostTimestamp";
import Suggestions from "../Suggestions/Suggestions";
import AddCommentScreen from "../AddCommentScreen/AddCommentScreen";

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

  const [addCommentScreen, setAddCommentScreen] = useState(false);

  const [followers, setFollowers] = useState([]);

  const [following, setFollowing] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        // console.log(result.data.posts);

        setPosts(result.data.posts);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [toggle]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/userId`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setFollowers(result.data.user.followers);

        setFollowing(result.data.user.following);

        console.log(result.data.user);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [toggle]);

  return (
    <div className="posts-page">
      <Suggestions followers={followers} />
      <div className="posts">
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
                      <i
                        onClick={() => {
                          axios
                            .delete(
                              `http://localhost:5000/posts/delete/${post._id}`
                            )
                            .then((result) => {
                              console.log("deleted");
                              setToggle(!toggle);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                        className="fa-solid fa-trash"
                      ></i>
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

                  <div
                    onClick={() => {
                      //get comments by post id
                      axios
                        .get(
                          `http://localhost:5000/posts/${localStorage.getItem(
                            "postId"
                          )}/comments`,

                          {
                            headers: {
                              authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((result) => {
                          setToggle(!toggle);
                          console.log(result.data);
                        })
                        .catch((err) => {
                          console.log(err.response.data.message);
                        });
                    }}
                    className="comment"
                  >
                    <span>{post.comments.length}</span> Comments
                  </div>
                </div>

                <div className="commentsAndLikesButton">
                  <div
                    onClick={() => {
                      setToggle(!toggle);

                      axios
                        .post(
                          `http://localhost:5000/posts/${post._id}/like`,
                          {},
                          {
                            headers: {
                              authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((result) => {
                          console.log(result.data);
                        })
                        .catch((err) => {
                          console.log(err.response.data.message);
                        });
                    }}
                    className="like"
                  >
                    {post.likes.includes(localStorage.getItem("userId")) ? (
                      <>
                        <i className="fa-solid fa-heart red"></i>
                        <div className="">unlike</div>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-heart"></i>
                        <div>Like</div>
                      </>
                    )}
                  </div>

                  <div
                    onClick={() => {
                      setAddCommentScreen(true);

                      localStorage.setItem("postId", post._id);
                    }}
                    className="comment"
                  >
                    <i className="fa-regular fa-comment"></i>
                    <div>Comment</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {addCommentScreen && (
        <AddCommentScreen
          addCommentScreen={addCommentScreen}
          setAddCommentScreen={setAddCommentScreen}
        />
      )}
    </div>
  );
};

export default Posts;
