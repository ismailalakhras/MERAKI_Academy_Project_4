const express = require("express")

const { createNewPost,
    getFollowingPosts,
    getPostById,
    deletePostById,
    updatePostById,
    createNewComment
} = require("../controllers/post")

const authentication = require("../middleware/authentication")


const postRouter = express.Router()



postRouter.post("/",authentication , createNewPost)

postRouter.get("/",authentication, getFollowingPosts)

postRouter.get("/search/:user_id", getPostById)

postRouter.delete("/delete/:post_id", deletePostById)

postRouter.put("/update/:post_id", updatePostById)

postRouter.post("/:post_id/comments", createNewComment)



module.exports = { postRouter }