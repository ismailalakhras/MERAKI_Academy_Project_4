import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../../App";

const UploadPic = () => {
  const inputRef = useRef(null);

  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  const { token, toggle, setToggle } = useContext(AppContext);

  return (
    <div className="uploadPic">
      <div
        onClick={() => {
          inputRef.current.click();
        }}
        className="uploadPic-container"
      >
        {image ? (
          <div>
            <img
              className="image-after"
              src={URL.createObjectURL(image)}
              alt=""
            />
          </div>
        ) : (
          <div>
            <img src={require("../../pic/no-img.png")} alt="" />
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setImage(e.target.files[0]);
          }}
        />
      </div>
      <button
        onClick={() => {
          const formData = new FormData();

          formData.append("image", file);
          axios
            .post(
              "http://localhost:5000/images/upload",

              formData,

              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((result) => {
              console.log(result);
              setToggle(!toggle);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        upload
      </button>
    </div>
  );
};

export default UploadPic;
