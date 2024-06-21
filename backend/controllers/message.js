const messageModel = require('../models/message')

const addMessage = (req, res) => {
    const { chatId, senderId, text } = req.body

    const newMessage = new messageModel({
        chatId, senderId, text
    })

    newMessage
        .save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

const getMessage = (req, res) => {

    const { chatId } = req.params

    messageModel
        .find({ chatId })
        .populate("senderId")
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

module.exports = { addMessage, getMessage }