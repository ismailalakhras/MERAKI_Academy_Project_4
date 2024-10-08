const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        post: { type: String },
        // createdAt: { type: Date, default: Date.now() },
        image: { type: String },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model("Post", postSchema)

