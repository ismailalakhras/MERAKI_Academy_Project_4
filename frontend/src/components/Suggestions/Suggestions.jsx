import React, { useContext } from "react";
import "./Suggestions.css";
import { AppContext } from "../../App";
import axios from "axios";

const Suggestions = ({ followers, following, user }) => {
  const {
    pageName,
    showComments,
    setShowComments,
    comments,
    setComments,
    setToggle,
    toggle,
    post,
    setPost,
  } = useContext(AppContext);
  return (
    <div className="suggestios">
      <div className="suggestios-container">
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}

        <div className={showComments ? "showComments" : "showComments hidden"}>
          <div onClick={() => setShowComments(false)} className="close-tap">
            X
          </div>
          {comments?.map((ele, ind) => {
            return (
              <div key={ind} className="comment-container">
                <div className="comment-container-top">
                  {ele.commenter._id === localStorage.getItem("userId") && (
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

                  <div className="image">
                    <img src={ele.commenter.profileImage} alt="" />
                  </div>
                  <div className="userName">
                    {ele.commenter.firstName} {ele.commenter.lastName}
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
                    <div className="button unFollow">unFollow</div>
                  ) : (
                    <div className="button">follow</div>
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
                  <div className="button unFollow">unFollow</div>
                </div>
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
