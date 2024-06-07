const usersModel = require("../models/user");


const register = async (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;

  const user = new usersModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password
  });

  user.save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: result,
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