import React, { useContext } from "react";
import "./Suggestions.css";
import { AppContext } from "../../App";

const Suggestions = ({ followers, following, user }) => {
  const { pageName } = useContext(AppContext);
  console.log("followers : ", followers);
  return (
    <div className="suggestios">
      <div className="suggestios-container">
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
                  {followers?.some((element) => {
                    return element._id === ele._id;
                  }) ? (
                    <div className="button unFollow">unFollow</div>
                  ) : (
                    <div className="button">follow</div>
                  )}
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
