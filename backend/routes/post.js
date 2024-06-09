const express = require("express")

const { createNewPost,
    getFollowingPosts,
    getPostsByUserId,
    deletePostById,
    updatePostById,
    createNewComment,
    addLikeToPost,
    getUserById
} = require("../controllers/post")

const authentication = require("../middleware/authentication")


const postRouter = express.Router()



postRouter.post("/",authentication , createNewPost)

postRouter.get("/",authentication, getFollowingPosts)

postRouter.get("/search/:user_id", getPostsByUserId)

postRouter.delete("/delete/:post_id", deletePostById)

postRouter.put("/update/:post_id", updatePostById)

postRouter.post("/:post_id/comments",authentication, createNewComment)

postRouter.post("/:post_id/like",authentication, addLikeToPost)

postRouter.get("/userId",authentication, getUserById)







module.exports = { postRouter }