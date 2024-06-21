import axios from "axios";
import React, { useEffect, useState } from "react";

const ChatBox = ({ chat }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);

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
  }, [chat]);

  //   console.log("messages",messages);

  //   console.log("chatBox data", userData);
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
        <hr />

        {/* chat box messages */}

        <div className="chat-body"></div>
      </div>
    </>
  );
};

export default ChatBox;
