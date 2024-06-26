import React, { useContext, useEffect, useState } from "react";
import "./Suggestions.css";
import { AppContext } from "../../App";
import axios from "axios";
import PostTimestamp from "../PostTimestamp";

const Suggestions = ({
  followers,
  following,
  user,
  setFollowers,
  setFollowing,
  setPosts,
}) => {
  const {
    pageName,
    showComments,
    setShowComments,
    comments,
    setComments,
    post,
    token,
    users,
    setToggle,
    toggle,
    suggestions,
    setSuggestions,
    createChat,
    setCreateChat,
    chatScreen,
    setChatScreen,
  } = useContext(AppContext);

  const [toggle_2, setToggle_2] = useState(false);

  useEffect(() => {
    console.log("posts useEffect");
    axios
      .get("http://localhost:5000/posts", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        // setPageName("My Profile Info");
        setPosts(result.data.posts);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [toggle_2]);

  useEffect(() => {
    console.log("xxxxxxxxxxxx");
    axios
      .get(`http://localhost:5000/users/userId`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setFollowers(result.data.user.followers);

        setFollowing(result.data.user.following);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [toggle_2]);

  useEffect(() => {
    createChat && console.log("createChat", createChat);
  }, []);

  useEffect(() => {
    post &&
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
          setComments(result.data.post.comments);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
  }, [toggle]);

  return (
    <div className={suggestions ? "suggestios visible" : "suggestios "}>
      <div className="suggestios-container">
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}

        <div className={showComments ? "showComments" : "showComments hidden"}>
          <div
            onClick={() => {
              setSuggestions(false);
              setShowComments(false);
            }}
            className="close-tap"
          >
            X
          </div>
          {comments?.map((ele, ind) => {
            return (
              <div key={ele._id} className="comment-container">
                <div className="comment-container-top">
                  {/* ------------------------------------------------------ */}
                  {/* ------------------------------------------------------ */}
                  {/* ------------------------------------------------------ */}

                  {(post.user === localStorage.getItem("userId") ||
                    ele.commenter._id === localStorage.getItem("userId")) && (
                    <i
                      onClick={() => {
                        axios
                          .delete(
                            `http://localhost:5000/posts/delete/comment/${ele._id}/${post._id}`
                          )
                          .then((result) => {
                            console.log("deleted");
                            setToggle(!toggle);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                      class="fa-solid fa-trash x"
                    ></i>
                  )}
                  {/* ------------------------------------------------------ */}
                  {/* ------------------------------------------------------ */}
                  {/* ------------------------------------------------------ */}
                  <div className="image">
                    <img src={ele.commenter.profileImage} alt="" />
                  </div>
                  <div className="userName">
                    <div>
                      {ele.commenter.firstName} {ele.commenter.lastName}
                    </div>

                    <div className="times">
                      <PostTimestamp timestamp={ele.createdAt} />
                    </div>
                  </div>
                </div>

                <div className="comment-container-bottom">
                  <div className="comment-content">{ele.comment}</div>
                </div>
              </div>
            );
          })}
        </div>
        <h1>{pageName}</h1>

        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}

        {pageName === "Followers" &&
          followers?.map((ele, ind) => {
            return (
              <>
                <div key={ind} className="suggestios-container-user ">
                  <div className="left-side">
                    <img src={ele.profileImage} alt="" />
                    <div className="userName">
                      {ele.firstName} {ele.lastName}
                    </div>
                  </div>

                  {following?.some((element) => {
                    return element._id === ele._id;
                  }) ? (
                    <div
                      onClick={() => {
                        axios
                          .put(
                            `http://localhost:5000/users/unFollow/${ele._id}`,
                            {},
                            {
                              headers: {
                                authorization: `Bearer ${token}`,
                              },
                            }
                          )
                          .then((result) => {
                            setToggle_2(!toggle_2);
                          })
                          .catch((err) => {
                            console.log(err.response.data.message);
                          });
                      }}
                      className="button unFollow"
                    >
                      unFollow
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        axios
                          .put(
                            `http://localhost:5000/users/follow/${ele._id}`,
                            {},
                            {
                              headers: {
                                authorization: `Bearer ${token}`,
                              },
                            }
                          )

                          .then((result) => {
                            setToggle_2(!toggle_2);
                          })
                          .catch((err) => {
                            console.log(err.response.data.message);
                          });
                      }}
                      className="button"
                    >
                      Follow
                    </div>
                  )}
                </div>
              </>
            );
          })}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}

        {pageName === "Following" &&
          following?.map((ele, ind) => {
            if (ele._id !== user._id) {
              return (
                <div key={ind} className="suggestios-container-user ">
                  <div className="left-side">
                    <img src={ele.profileImage} alt="" />

                    <div className="userName">
                      {ele.firstName} {ele.lastName}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setCreateChat(ele._id);
                      setChatScreen(true);

                      axios
                        .post(`http://localhost:5000/chat`, {
                          senderId: localStorage.getItem("userId"),
                          receiverId: ele._id,
                        })

                        .then((result) => {})
                        .catch((err) => {
                          console.log(err.response.data.message);
                        });
                    }}
                    className="message-contact"
                  >
                    <i class="fa-regular fa-message"></i>
                  </div>
                  <div
                    onClick={() => {
                      axios
                        .put(
                          `http://localhost:5000/users/unFollow/${ele._id}`,
                          {},
                          {
                            headers: {
                              authorization: `Bearer ${token}`,
                            },
                          }
                        )

                        .then((result) => {
                          setToggle_2(!toggle_2);
                        })
                        .catch((err) => {
                          console.log(err.response.data.message);
                        });
                    }}
                    className="button unFollow"
                  >
                    unFollow
                  </div>
                </div>
              );
            }
          })}

        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}

        {pageName === "Suggestions" &&
          users?.map((ele, ind) => {
            if (ele._id !== user._id) {
              return (
                <>
                  <div
                    key={ind}
                    className="suggestios-container-user"
                    onClick={(e) => {
                      console.log("test");
                    }}
                  >
                    <div className="left-side">
                      <img src={ele.profileImage} alt="" />
                      <div className="userName">
                        {ele.firstName} {ele.lastName}
                      </div>
                    </div>

                    {following?.some((element) => {
                      return element._id === ele._id;
                    }) ? (
                      <div
                        onClick={() => {
                          axios
                            .put(
                              `http://localhost:5000/users/unFollow/${ele._id}`,
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
                        className="button unFollow"
                      >
                        unFollow
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          axios
                            .put(
                              `http://localhost:5000/users/follow/${ele._id}`,
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
                        className="button"
                      >
                        follow
                      </div>
                    )}
                  </div>
                </>
              );
            }
          })}

        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}

        {pageName === "My Profile Info" && (
          <div className="myProfileInfo">
            <img src={user.profileImage} alt="" />
            <div className="info">
              <div>
                First Name :<span>{user.firstName}</span>{" "}
              </div>
              <div>
                Last Name :<span>{user.lastName}</span>{" "}
              </div>
              <div>
                age :<span>{user.age}</span>{" "}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
      <div onClick={()=>{
        setSuggestions(false)
      }} className="close-suggestions">Close Tap</div>
      </div>
    </div>
  );
};

export default Suggestions;
