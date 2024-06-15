const express = require("express");
const userRouter = express.Router();
const { register, login, getUserById, unFollow } = require("../controllers/user");
const authentication = require("../middleware/authentication");


userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get("/userId", authentication, getUserById)
userRouter.put("/unFollow/:userId/:unFollowId", unFollow)



module.exports = { userRouter};