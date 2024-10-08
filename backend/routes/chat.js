const express = require('express')
const { createChat, userChats, findChat } = require('../controllers/chat')

const chatRouter = express.Router()

chatRouter.post("/", createChat)
chatRouter.get("/:userId", userChats)
chatRouter.get("/find/:firstId/:secondId", findChat)

module.exports = chatRouter


//19:20