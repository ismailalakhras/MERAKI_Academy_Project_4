const express = require("express");
const userRouter = express.Router();
const { register, login, getUserById } = require("../controllers/user");
const authentication = require("../middleware/authentication");


userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get("/userId", authentication, getUserById)



module.exports = { userRouter};