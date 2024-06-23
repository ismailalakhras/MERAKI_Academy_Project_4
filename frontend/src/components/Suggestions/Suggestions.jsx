import React, { useContext, useEffect, useState } from "react";
import "./Suggestions.css";
import { AppContext } from "../../App";
import axios from "axios";
import PostTimestamp from "../PostTimestamp";

const Suggestions = ({ followers, following, user }) => {
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
  } = useContext(AppContext);

  const [createChat, setCreateChat] = useState(null);

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
                            setToggle(!toggle);
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
                            setToggle(!toggle);
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
                          setToggle(!toggle);
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
                  <div key={ind} className="suggestios-container-user ">
                    <div className="left-side">
                      <img src={ele.profileImage} alt="" />
                      <div
                        onClick={() => {
                          console.log("xxxxxxxxx");
                          // setCreateChat(ele._id);
                          // axios
                          //   .post(`http://localhost:5000/chat`, {
                          //     senderId: localStorage.getItem("userId"),
                          //     receiverId: ele._id,
                          //   })

                          //   .then((result) => {
                          //     console.log(result.data);
                          //     console.log("xxxxxxxxx");
                          //   })
                          //   .catch((err) => {
                          //     console.log(err.response.data.message);
                          //   });
                        }}
                        className="userName"
                      >
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
      </div>
    </div>
  );
};

export default Suggestions;
