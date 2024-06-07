const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = (req, res, next) => {
  // Configure multer for file uploads
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images"); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix); // Set a unique filename for the uploaded file
    },
  });

  const multerUpload = multer({ storage }).single("profileImage");

  multerUpload(req, res, function (err) {
    if (err) {
      // Handle multer upload error
      return res.status(400).json({
        success: false,
        message: "File upload failed",
        error: err.message,
      });
    }
    next();
  });
};

module.exports = { upload, cloudinary };