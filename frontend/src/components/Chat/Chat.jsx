import React from "react";
import "./Chat.css";
const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-container">
        <div className="leftSide">
          <div className="userContainer">
            <div className="image">
              <img src={require("../../pic/logo.png")} alt="" />
            </div>
            <div className="userName">
              <div className="name">ismail mohd</div>
              <div className="offline">offline</div>
            </div>
          </div>
          {/* -------------------------------------- */}

          <div className="userContainer">
            <div className="image">
              <img src={require("../../pic/logo.png")} alt="" />
            </div>
            <div className="userName">
              <div className="name">ismail mohd</div>
              <div className="offline">offline</div>
            </div>
          </div>
          {/* -------------------------------------- */}
          <div className="userContainer">
            <div className="image">
              <img src={require("../../pic/logo.png")} alt="" />
            </div>
            <div className="userName">
              <div className="name">ismail mohd</div>
              <div className="offline">offline</div>
            </div>
          </div>
          {/* -------------------------------------- */}

          <div className="userContainer">
            <div className="image">
              <img src={require("../../pic/logo.png")} alt="" />
            </div>
            <div className="userName">
              <div className="name">ismail mohd</div>
              <div className="offline">offline</div>
            </div>
          </div>
          {/* -------------------------------------- */}
        </div>
        <div className="rightSide"></div>
      </div>
    </div>
  );
};

export default Chat;
