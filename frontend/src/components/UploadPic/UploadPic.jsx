import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";

const UploadPic = () => {
  const [file, setFile] = useState("");
  const { token, setToken } = useContext(AppContext);

  return (
    <div className="uploadPic">
      <div className="uploadPic-container">
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
        <button
          onClick={() => {
            const formData = new FormData();
            console.log(formData);

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
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          upload
        </button>
      </div>
    </div>
  );
};

export default UploadPic;
