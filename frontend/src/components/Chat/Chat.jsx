import React, { useContext, useEffect, useRef, useState } from "react";
import "./Chat.css";
import axios from "axios";
import Conversation from "../Conversation/Conversation";
import ChatBox from "../ChatBox/ChatBox";
import { io } from "socket.io-client";
import { AppContext } from "../../App";

const Chat = ({ setChatScreen }) => {
  const { onlineUsers, setOnlineUsers } = useContext(AppContext);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const socket = useRef();

  console.log("onlineUsers", onlineUsers);

  // send message to socket server

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // receive message from socket server

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", localStorage.getItem("userId"));
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [localStorage.getItem("userId")]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/chat/${localStorage.getItem("userId")}`)
      .then((result) => {
        setChats(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  {
    chats && !currentChat && console.log("chats", chats);
    currentChat && console.log("currentChat", currentChat);
  }

  return (
    <div className="chat">
      <div className="leftSide">
        <div className="chatContainer">
          <h2>Chats</h2>
          <div className="chat-list">
            {chats.map((chat) => {
              return (
                <div
                  key={chat._id}
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
                  <Conversation data={chat} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* -------------------------------------- */}
      <div className="rightSide">
      <div
          onClick={() => {
            setChatScreen(false);
          }}
          className="close-tap-chat"
        >
          x
        </div>
        {currentChat && (
          <ChatBox
            chat={currentChat}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
