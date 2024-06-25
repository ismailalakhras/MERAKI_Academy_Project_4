const chatModel = require("../models/chat")

const createChat = (req, res) => {
    const { senderId, receiverId } = req.body;


    chatModel.findOne({
        members: { $all: [senderId, receiverId] }
    })
        .then(result => {
            if (!result) {
                const newChat = new chatModel({
                    members: [senderId, receiverId]
                })

                newChat
                    .save()
                    .then(result => {
                        res.status(200).json(result)
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
            } else {
                res.status(400).json("chat already exist")
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })



}



const userChats = (req, res) => {

    chatModel
        .find({
            members: { $in: [req.params.userId] }
        })
        .populate("members")

        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

const findChat = (req, res) => {

    chatModel.findOne({
        members: { $all: [req.params.firstId, req.params.secondId] }
    })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}





module.exports = { userChats, createChat, findChat }