import React from "react";
import "./Suggestions.css";

const Suggestions = ({ followers }) => {
  console.log(followers);
  return (
    <div className="suggestios">
      <div className="suggestios-container">
        <h1>Suggestions</h1>

        {followers.map((ele) => {
          return (
            <div className="suggestios-container-user">
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
      </div>
    </div>
  );
};

export default Suggestions;
