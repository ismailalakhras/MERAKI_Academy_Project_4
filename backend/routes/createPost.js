const express = require("express")
const createPostRouter = express.Router()
const cloudinary = require("../utils/cloudinary")
const upload = require("../middleware/multer")
const postModel = require("../models/post");


createPostRouter.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.data);
    cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: "Error"
            })
        }

        const { postContent } = req.body;

        const image = result.url

        const user = req.token.userId;
        const newPost = new postModel({
            post:postContent,
            image,
            user,
        });

        newPost
            .save()
            .then((newPost) => {
                res.status(201).json({
                    success: true,
                    message: `Post created`,
                    post: newPost,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: `Server Error`,
                    err: err.message,
                });
            });
    })
})

module.exports = createPostRouter