const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model("Comment" , commentSchema)