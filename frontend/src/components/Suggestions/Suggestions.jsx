import React, { useContext } from "react";
import "./Suggestions.css";
import { AppContext } from "../../App";

const Suggestions = ({ followers, following, user }) => {
  const { pageName } = useContext(AppContext);

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
                <div key={ind} className="suggestios-container-user">
                  <div className="left-side">
                    <img src={ele.profileImage} alt="" />
                    <div className="userName">
                      {ele.firstName} {ele.lastName}
                    </div>
                  </div>
                  <div className="button">Follow</div>
                </div>
              </>
            );
          })}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}

        {pageName === "Following" &&
          following?.map((ele, ind) => {
            return (
              <div key={ind} className="suggestios-container-user">
                <div className="left-side">
                  <img src={ele.profileImage} alt="" />
                  <div className="userName">
                    {ele.firstName} {ele.lastName}
                  </div>
                </div>
                <div className="button">Follow</div>
              </div>
            );
          })}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}

        {pageName === "My Profile Info" && (
          <div className="myProfileInfo">
            <img src={user.profileImage} alt="" />
            <div className="info">
              <div>First Name : {user.firstName}</div>
              <div>Last Name : {user.lastName}</div>
              <div>age : {user.age}</div>
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
