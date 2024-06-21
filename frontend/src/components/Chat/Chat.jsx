import React, { useEffect, useState } from "react";
import "./Chat.css";
import axios from "axios";
import Conversation from "../Conversation/Conversation";
const Chat = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null)

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
      <div className="leftSide">
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
      {/* -------------------------------------- */}
      <div className="rightSide">

        <ChatBox chat={currentChat} />
      </div>
    </div>
  );
};

export default Chat;
