import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../../App";
import "./addPostScreen.css";

// const AddPostScreen = ({ setAddPostScreen }) => {
//   const inputRef = useRef(null);

//   const [file, setFile] = useState("");
//   const [image, setImage] = useState("");
//   const [postContent, setPostContent] = useState("");

//   const { token, toggle, setToggle } = useContext(AppContext);

//   return (
//     <div className="uploadPic">
//       <div className="uploadPic-container-parent">
//         <div
//           onClick={() => {
//             inputRef.current.click();
//           }}
//           className="uploadPic-container"
//         >
//           {image ? (
//             <div>
//               <img src={URL.createObjectURL(image)} alt="" />
//             </div>
//           ) : (
//             <div>
//               <img src={require("../../pic/no-img.png")} alt="" />
//             </div>
//           )}

//           <input
//             ref={inputRef}
//             type="file"
//             onChange={(e) => {
//               setFile(e.target.files[0]);
//               setImage(e.target.files[0]);
//             }}
//           />
//         </div>
//         <textarea
//           value={postContent}
//           onChange={(e) => {
//             setPostContent(e.target.value);
//           }}
//           //   onClick={() => {
//           //     setStatusError("");
//           //   }}
//           name="Description"
//           id=""
//         ></textarea>
//         <div className="button">
//           <button
//             onClick={() => {
//               const formData = new FormData();

//               formData.append("image", file);
//               formData.append("postContent", postContent);
//               axios
//                 .post(
//                   "http://localhost:5000/createPost/upload",
//                   formData,

//                   {
//                     headers: {
//                       Authorization: `Bearer ${token}`,
//                     },
//                   }
//                 )
//                 .then((result) => {
//                   console.log(result.data.post);

//                   setToggle(!toggle);
//                   setAddPostScreen(false);
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                 });
//             }}
//           >
//             save
//           </button>
//           <button
//             onClick={() => {
//               setAddPostScreen(false);
//             }}
//           >
//             cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const AddPostScreen = ({ setAddPostScreen }) => {
  const inputRef = useRef(null);

  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [postContent, setPostContent] = useState("");

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
            <img src={require("../../pic/logo.png")} alt="" />
          </div>
          <div className="userName">Xxxxxx</div>
        </div>
        <div className="addPost_container-textArea">
          <textarea
            value={postContent}
            onChange={(e) => {
              setPostContent(e.target.value);
            }}
            
            placeholder="whats on your mind"
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
            <img className="no-img" src={require("../../pic/no-img.png")} alt="" />
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
            onClick={() => {
              const formData = new FormData();

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
                  console.log(result.data.post);

                  setToggle(!toggle);
                  setAddPostScreen(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Post
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPostScreen;
