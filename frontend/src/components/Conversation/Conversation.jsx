import React, { useEffect, useState } from "react";

const Conversation = ({ data }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find(
      (id) => id !== localStorage.getItem("userId")
    );
    console.log("userId",userId);
   
  },[]);

  return <div>Conversation</div>;
};

export default Conversation;
