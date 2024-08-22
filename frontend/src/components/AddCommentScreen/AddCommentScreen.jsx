import React, { useContext, useState } from "react";
import "./AddCommentScreen.css";
import axios from "axios";
import { AppContext } from "../../App";

const AddCommentScreen = ({ setAddCommentScreen, }) => {
  const [comment, setComment] = useState("");

  const { token, setToken, toggle, setToggle } = useContext(AppContext);

  return (
    <div className="addCommentScreen">
      <div className="addCommentScreen-container">
        <div className="addCommentScreen-container-top">
          <div className="image">
            <img src={localStorage.getItem("profilePic")}></img>
          </div>
          <div className="userName">{localStorage.getItem("userName")}</div>
        </div>
        <div className="addCommentScreen-container-body">
          <textarea
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Add Comment"
          ></textarea>
        </div>
        <div className="addCommentScreen-container-bottom">
          <div
            onClick={() => {
              setAddCommentScreen(false);
            }}
            className="cancel-btn"
          >
            Cancel
          </div>
          <div
            onClick={() => {

                console.log(localStorage.getItem("postId"));
              axios
                .post(
                  `http://localhost:5001/posts/${
                    localStorage.getItem("postId")
                  }/comments`,
                  { comment },
                  {
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((result) => {
                  setAddCommentScreen(false);
                  setToggle(!toggle);
                  setComment("");
                  
                  console.log(result.data);
                })
                .catch((err) => {
                  console.log(err.response.data.message);
                });
            }}
            className="AddComment-btn"
          >
            Add Comment
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCommentScreen;
