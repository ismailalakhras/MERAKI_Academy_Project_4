import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AppContext } from "../../App";

const RightSide = ({
  following,
  setFollowing,
  followers,
  setFollowers,
  user,
  posts,
  setPosts,
}) => {
  const {
    token,
    users,

    createChat,
    setCreateChat,
    chatScreen,
    setChatScreen,
  } = useContext(AppContext);

  const [toggle_2, setToggle_2] = useState(false);

  useEffect(() => {
    console.log("posts useEffect");
    axios
      .get("https://webpulse-35pb.onrender.com/posts", {
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
      .get(`https://webpulse-35pb.onrender.com/users/userId`, {
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

  return (
    <div className="suggestios rightSide">
      <div className="suggestios-container">
        <h1>Suggestions</h1>

        {users?.map((ele, ind) => {
          if (ele._id !== user._id) {
            return (
              <>
                <div key={ele._id} className="suggestios-container-user ">
                  <div className="left-side">
                    <img src={ele.profileImage} alt="" />

                    <div className="userName">
                      {ele.firstName} {ele.lastName}
                    </div>
                  </div>

                  {/* <div
                    onClick={() => {
                      setCreateChat(ele._id);
                      setChatScreen(true);

                      axios
                        .post(`https://webpulse-35pb.onrender.com/chat`, {
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
                  </div> */}

                  {following?.some((element) => {
                    return element._id === ele._id;
                  }) ? (
                    <div
                      onClick={() => {
                        axios
                          .put(
                            `https://webpulse-35pb.onrender.com/users/unFollow/${ele._id}`,
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
                            `https://webpulse-35pb.onrender.com/users/follow/${ele._id}`,
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
          }
        })}
      </div>
    </div>
  );
};

export default RightSide;
