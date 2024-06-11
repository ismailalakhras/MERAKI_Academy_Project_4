import React from "react";
import "./CreatePost.css";

const CreatePost = ({setProfilePicScreen,setAddPostScreen}) => {
  return (
    <div>
      <div className="createPost">
        <div className="image">
          <img src={localStorage.getItem("profilePic")} alt="" />
          <div
            onClick={() => {
              setProfilePicScreen(true);
              
            }}
          >
            +
          </div>
        </div>
        <input onClick={()=>{setAddPostScreen(true)}} type="text" placeholder="Whats on your mind"  />
      </div>
    </div>
  );
};

export default CreatePost;
