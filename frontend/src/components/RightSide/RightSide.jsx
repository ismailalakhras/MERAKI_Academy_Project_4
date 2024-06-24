import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AppContext } from "../../App";

const RightSide = ({ following, user }) => {
  const {
    token,
    users,
    toggle,
    setToggle,
    createChat,
    setCreateChat,
    chatScreen,
    setChatScreen,
  } = useContext(AppContext);

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
                    <div
                      onClick={() => {
                        setCreateChat(ele._id);
                        axios
                          .post(`http://localhost:5000/chat`, {
                            senderId: localStorage.getItem("userId"),
                            receiverId: ele._id,
                          })

                          .then((result) => {
                            setChatScreen(true);
                          })
                          .catch((err) => {
                            console.log(err.response.data.message);
                          });
                      }}
                      className="userName"
                    >

                      {ele.firstName} {ele.lastName}
                    <i class="fa-brands fa-rocketchat"></i>
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
          }
        })}
      </div>
    </div>
  );
};

export default RightSide;
