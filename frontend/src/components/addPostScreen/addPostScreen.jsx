import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../../App";
import "./addPostScreen.css";

const AddPostScreen = ({ setAddPostScreen }) => {
  const inputRef = useRef(null);

  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [postContent, setPostContent] = useState("");

  const [loader, setLoader] = useState(false);

  const { token, toggle, setToggle } = useContext(AppContext);
  return (
    <div className="screenPage">
      <div className="addPost_container">
        <div className="addPost_container-top">
          <div className="title">create post</div>
          <div
            onClick={() => {
              setAddPostScreen(false);
            }}
            className="x"
          >
            X
          </div>
        </div>
        <div className="addPost_container-user">
          <div className="image">
            <img src={localStorage.getItem("profileImage")} alt="" />
          </div>
          <div className="userName">{localStorage.getItem("userName")}</div>
        </div>
        <div className="addPost_container-textArea">
          <textarea
            value={postContent}
            onChange={(e) => {
              setPostContent(e.target.value);
            }}
            placeholder={`whats on your mind , ${localStorage.getItem(
              "firstName"
            )}`}
            name="Whats on your mind"
          ></textarea>
        </div>
        <div
          onClick={() => {
            inputRef.current.click();
          }}
          className="addPost_container-image"
        >
          {image ? (
            <img src={URL.createObjectURL(image)} alt="" />
          ) : (
            <img
              className="no-img"
              src={require("../../pic/no-img.png")}
              alt=""
            />
          )}

          <input
            ref={inputRef}
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setImage(e.target.files[0]);
            }}
          />

          {/* <img src={require("../../pic/logo.png")} alt="" /> */}
        </div>

        <div className="addPost_container-button">
          <div
            onClick={(e) => {
              console.log("xxxxxxxxxxxxx");
              const formData = new FormData();
              setLoader(true);

              formData.append("image", file);
              formData.append("postContent", postContent);
              axios
                .post(
                  "http://localhost:5000/createPost/upload",
                  formData,

                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((result) => {
                  window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: "smooth",
                  });
                  console.log(result.data.post);

                  setToggle(!toggle);
                  setAddPostScreen(false);
                  setLoader(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            className={loader && "unClick"}
          >
            Post
          </div>
        </div>
        {loader && <div class="loader"></div>}
      </div>
    </div>
  );
};

export default AddPostScreen;
