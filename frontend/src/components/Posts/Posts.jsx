import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./Posts.css";
import axios from "axios";
import PostTimestamp from "../PostTimestamp";
import Suggestions from "../Suggestions/Suggestions";
import AddCommentScreen from "../AddCommentScreen/AddCommentScreen";
import RightSide from "../RightSide/RightSide";

const Posts = () => {
  const {
    token,
    setToggle,
    toggle,
    setPageName,
    setShowComments,
    setComments,
    setPost,
    suggestions,
    setSuggestions,
  } = useContext(AppContext);

  const [posts, setPosts] = useState(null);

  const [addCommentScreen, setAddCommentScreen] = useState(false);

  const [followers, setFollowers] = useState([]);

  const [following, setFollowing] = useState([]);

  const [user, setUser] = useState({});

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [postId, setPostId] = useState(null);

  useEffect(() => {
    console.log("posts useEffect");
    axios
      .get("http://localhost:5000/posts", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setPageName("My Profile Info");
        setPosts(result.data.posts);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [toggle]);

  useEffect(() => {
    console.log("users useEffect");

    axios
      .get(`http://localhost:5000/users/userId`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setFollowers(result.data.user.followers);

        setFollowing(result.data.user.following);

        setUser(result.data.user);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [toggle]);

  // -------------------------------------------
  // -------------------------------------------
  // -------------------------------------------

  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    console.log("posts delete useEffect");

    if (postToDelete) {
      const timer = setTimeout(() => {
        axios
          .delete(`http://localhost:5000/posts/delete/${postToDelete}`)
          .then((result) => {
            console.log("deleted");

            setToggle(!toggle);

            setPostToDelete(null);
            const filtredArray = posts.filter((elem, i) => {
              return elem._id !== postToDelete;
            });
            setPosts(filtredArray);
          })
          .catch((err) => {
            console.log(err);
            setPostToDelete(null);
          });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [postToDelete, toggle]);

  // -------------------------------------------
  // -------------------------------------------
  // -------------------------------------------

  return (
    <div className="posts-page">
      <Suggestions
        following={following}
        followers={followers}
        setFollowers={setFollowers}   
        setFollowing={setFollowing}
        setPosts = {setPosts}
        user={user}
      />

      <div className="posts">
        {posts?.map((post, ind) => {
          return (
            <div key={ind} className="post-container">
              {/* ---------------------------------------- */}
              <div
                className={`changeColor ${
                  postToDelete === post._id ? "deleting" : ""
                }`}
              ></div>
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
                          setConfirmDelete(true);
                          setPostId(post._id);
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
                      axios
                        .get(
                          `http://localhost:5000/posts/${post._id}/comments`,

                          {
                            headers: {
                              authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((result) => {
                          setToggle(!toggle);
                          setShowComments(true);
                          setComments(result.data.post.comments);
                          setPost(result.data.post);
                          setSuggestions(true);
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
                        .then((result) => {})
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
                      // setShowComments(true);
                      localStorage.setItem("postId", post._id);
                      axios
                        .get(
                          `http://localhost:5000/posts/${post._id}/comments`,

                          {
                            headers: {
                              authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((result) => {
                          setToggle(!toggle);
                          setShowComments(true);
                          setComments(result.data.post.comments);
                          setPost(result.data.post);
                        })
                        .catch((err) => {
                          console.log(err.response.data.message);
                        });
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

      <RightSide
        following={following}
        followers={followers}
        setFollowers={setFollowers}
        setFollowing={setFollowing}
        user={user}
        posts={posts}
        setPosts={setPosts}
      />
      {addCommentScreen && (
        <AddCommentScreen
          addCommentScreen={addCommentScreen}
          setAddCommentScreen={setAddCommentScreen}
        />
      )}

      {confirmDelete && (
        <div className="confirm-delete">
          <div className="confirm-delete-container">
            <div className="message">
              Are you sure you want to delete this post?
            </div>
            <div className="button">
              <button
                onClick={() => {
                  setConfirmDelete(false);
                }}
                className="cancel"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPostToDelete(postId);

                  setConfirmDelete(false);
                }}
                className="delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
