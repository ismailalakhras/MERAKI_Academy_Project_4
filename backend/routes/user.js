const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user");
const { upload } = require("../middleware/upload");


router.post("/register", upload, register);
router.post("/login", login);

module.exports = { userRouter: router };