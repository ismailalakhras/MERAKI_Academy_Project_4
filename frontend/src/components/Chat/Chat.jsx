import React, { useEffect, useState } from "react";
import "./Chat.css";
import axios from "axios";
import Conversation from "../Conversation/Conversation";
const Chat = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/chat/${localStorage.getItem("userId")}`)
      .then((result) => {
        setChats(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(chats);

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
        <div className="rightSide">
          <div className="chatContainer">
            <h2>Chats</h2>
            <div className="chat-list">
              {chats.map((chat) => {
                return (
                  <div>
                    <Conversation data={chat} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
