import React from "react";

const PostTimestamp = ({ timestamp }) => {
  const postDate = new Date(timestamp);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - postDate.getTime();

  let formattedTimestamp;
  if (timeDiff < 60000) {
    // أقل من دقيقة
    formattedTimestamp = "now";
  } else if (timeDiff < 3600000) {
    // أقل من ساعة
    const minutes = Math.floor(timeDiff / 60000);
    formattedTimestamp = `${minutes} minutes ago`;
  } else if (timeDiff < 86400000) {
    // أقل من يوم
    const hours = Math.floor(timeDiff / 3600000);
    formattedTimestamp = `${hours} hours ago`;
  } else if (timeDiff < 31536000000) {
    // أقل من سنة
    const days = Math.floor(timeDiff / 86400000);
    formattedTimestamp = `${days} days ago `;
  } else {
    const years = Math.floor(timeDiff / 31536000000);
    formattedTimestamp = `${years} years ago `;
  }

  return <span>{formattedTimestamp}</span>;
};

export default PostTimestamp;

