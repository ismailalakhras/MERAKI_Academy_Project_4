const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;
  const profileImage = "https://images.app.goo.gl/VzLmVTfuoVnxUi6d8";

  const user = new userModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    profileImage :"https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg",
    following: []
  });

  user.save()
    .then((result) => {
      // Add the user's ID to the 'following' array
      userModel.findByIdAndUpdate(
        result._id,
        { $push: { following: result._id } },
        { new: true }
      )
        .then((updatedUser) => {
          res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: updatedUser
          });
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
          });
        });
    })
    .catch(err => {
      if (err.keyPattern) {
        res.status(409).json({
          success: false,
          message: "The email already exists"
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Server error",
          error: err.message
        });
      }
    });
};

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  userModel
    .findOne({ email })
    .then(async (result) => {

      if (!result) {
        return res.status(403).json({
          success: false,
          message: `The email doesn't exist or The password you’ve entered is incorrect`,
        });
      }
      try {

        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          userName: result.firstName,
          country: result.country,
          profilePic: result.profileImage
        };

        const options = {
          expiresIn: "600m",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};


const getUserById = (req, res) => {

  const userId = req.token.userId;
  userModel
    .findById({ _id: userId })
    .populate("followers following")
    .then(result => {
      res.status(200).json({
        success: true,
        message: "user",
        user: result
      });
    })
    .catch(err => res.json(err))
}





module.exports = {
  register,
  login,
  getUserById,
};