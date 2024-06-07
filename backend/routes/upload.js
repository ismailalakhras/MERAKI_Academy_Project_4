const express = require("express")
const uploadRouter = express.Router()
const cloudinary = require("../utils/cloudinary")
const upload = require("../middleware/multer")


uploadRouter.post("/upload", upload.single("image"), (req, res) => {
    cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
            console.log(err)
            return res.status (500).json({
                success: false,
                message: "Error"
            })
        }

        res.status(200).json({
            success: true,
            message: "Uploaded",
            data: result
        })
    })
})

module.exports = uploadRouter