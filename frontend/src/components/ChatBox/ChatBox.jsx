import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import PostTimestamp from "../PostTimestamp";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef();

  messages && console.log("messages", messages);
  console.log("receiveMessage", receiveMessage);

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat.Id) {
      setMessages([...messages, receiveMessage]);
    }
  console.log("receiveMessage", receiveMessage);

  }, [receiveMessage]);

  useEffect(() => {
    const userId = chat?.members?.find(
      (ele) => ele._id !== localStorage.getItem("userId")
    );
    setUserData(userId);
  }, [chat]);

  useEffect(() => {
    chat &&
      axios
        .get(`http://localhost:5000/message/${chat._id}`)
        .then((result) => {
          setMessages(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [chat, newMessage, receiveMessage ]);

  // scroll to the last messsage

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="chatBox-container">
        {/* chat box header */}

        <div className="chat-header">
          <div className="follower">
            <div className="image">
              <img src={userData && userData.profileImage} alt="" />
            </div>
            <div className="userName">
              <span>
                {userData?.firstName} {userData?.lastName}
              </span>
            </div>
          </div>

         
        </div>

        {/* chat box messages */}

        <div className="chat-body">
          {messages.map((message) => {
            return (
              <>
                <div
                  key={message._id}
                  className={
                    message.senderId._id === localStorage.getItem("userId")
                      ? "times own"
                      : "times"
                  }
                >
                  <PostTimestamp timestamp={message.createdAt} />
                </div>
                <div
                  ref={scroll}
                  className={
                    message.senderId._id === localStorage.getItem("userId")
                      ? "message own"
                      : "message"
                  }
                >
                  <div className="content">{message.text}</div>
                </div>
              </>
            );
          })}
        </div>

        {/* chat sender  */}
      </div>
      <div className="chat-sender">
        <div
          onClick={() => {
            newMessage &&
              axios
                .post(`http://localhost:5000/message`, {
                  senderId: localStorage.getItem("userId"),
                  text: newMessage,
                  chatId: chat._id,
                })
                .then((result) => {
                  setMessages([...messages, result.data]);
                  setNewMessage("");

                  const receiverId = chat?.members?.find(
                    (ele) => ele._id !== localStorage.getItem("userId")
                  );

                  setSendMessage({ ...result.data, receiverId });
                })
                .catch((err) => {
                  console.log(err.response.data.message);
                });
          }}
          className="send"
        >
          Send
        </div>
        <InputEmoji
          value={newMessage}
          onChange={(text) => {
            setNewMessage(text);
          }}
        />
      </div>
    </>
  );
};

export default ChatBox;
