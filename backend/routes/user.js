const express = require("express");
const userRouter = express.Router();
const { register, login, getUserById, unFollow ,follow,getAllUsers} = require("../controllers/user");
const authentication = require("../middleware/authentication");


userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get("/userId", authentication, getUserById)
userRouter.put("/unFollow/:unFollowId",authentication, unFollow)
userRouter.put("/follow/:followId",authentication, follow)


userRouter.get("/", getAllUsers)



module.exports = { userRouter};