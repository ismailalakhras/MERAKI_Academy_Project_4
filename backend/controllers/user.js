const { cloudinary } = require("../middleware/upload");
const usersModel = require("../models/user");


const register = async (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;
  const profileImage = req.file;


  // Upload profile image to Cloudinary
  const result = await cloudinary.uploader
    .upload(profileImage.path)
    .catch((error) => { console.log(error) });

    console.log(result);

  const user = new usersModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    profileImage:  result.secure_url , // Save the Cloudinary image URL in profileImage key
  });

  user.save()
    .then(() => {
      
      res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: savedUser,
      })
    })
    .catch(err => {
      if (err.keyPattern) {
        res.status(409).json({
          success: false,
          message: "The email already exists",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Server error",
          error: err.message,
        });
      }
    })
};

const login = (req, res) => {
  // Implementation for login route
};

module.exports = {
  register,
  login,
};