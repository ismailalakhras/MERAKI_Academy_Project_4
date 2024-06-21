import React, { useEffect, useState } from "react";

const Conversation = ({ data }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find(
      (ele) => ele._id !== localStorage.getItem("userId")
    );
    setUserData(userId);
  }, []);
  console.log("userData", userData);

  return (
    <>
      <div className="follower-conversation">
        <div className="online-dot"></div>
        <div className="image">
          <img src={userData && userData.profileImage} alt="" />
        </div>
        <div className="userName">
          <span>
            {userData?.firstName} {userData?.lastName}
          </span>
          <span className="online">Online</span>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Conversation;
