import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

const Conversation = ({ data }) => {
  const { onlineUsers, setOnlineUsers } = useContext(AppContext);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find(
      (ele) => ele._id !== localStorage.getItem("userId")
    );
    setUserData(userId);
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div className="online-dot"></div>
        <div className="image">
          <img src={userData && userData.profileImage} alt="" />
        </div>
        <div className="userName">
          <span>
            {userData?.firstName} {userData?.lastName}
          </span>

          {console.log(
            "onlineUsersssss",
            onlineUsers.find((ele) => ele.userId === userData?._id)
          )}
          <span
            className={
              onlineUsers.find((ele) => ele.userId === userData?._id)
                ? "online"
                : "offline"
            }
          >
          
          </span>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Conversation;
