const express = require("express")
const uploadRouter = express.Router()
const cloudinary = require("../utils/cloudinary")
const upload = require("../middleware/multer")
const userModel = require("../models/user");


uploadRouter.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.data);
    cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: "Error"
            })
        }

        const userId = req.token.userId;
        userModel
            .findByIdAndUpdate({ _id: userId }, { profileImage: result.url }, { new: true })
            .then((user) => {
                res.status(200).json({
                    success: true,
                    message: "Uploaded",
                    data: result,
                    user: user
                })
            })
            .catch(err => res.json(err))
    })
})

module.exports = uploadRouter