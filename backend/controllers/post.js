const postModel = require("../models/post")
const userModel = require("../models/user");



const createNewPost = (req, res) => {

    const { post, image } = req.body;

    const user = req.token.userId;
    const newPost = new postModel({
        post,
        image,
        user,
    });

    newPost
        .save()
        .then((result) => {
            res.status(201).json({
                success: true,
                message: `Post created`,
                post: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err.message,
            });
        });
}

const getFollowingPosts = (req, res) => {
    const userId = req.token.userId;
    console.log(userId);

    userModel
        .findById({ _id: userId }, "following -_id")
        .populate("following")
        .then((result) => {

            if (!result.following.length) {
                return res.status(404).json({
                    success: false,
                    message: `The user : ${userId} has not followed anyone`,
                });
            }

            postModel.find({ user: result.following })
                .then(posts => {
                    if (!posts.length) {
                        return res.status(404).json({
                            success: false,
                            message: `The user : ${userId} follows people who have not published any post`,
                        });
                    }

                    res.status(200).json({
                        success: true,
                        message: `All the posts available for the user : ${userId}`,
                        posts: posts,
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        message: `Server Error`,
                        err: err.message,
                    });
                })
        })
        .catch(err => {
            console.log(err);
        })
}

const getPostById = (req, res) => {

}

const deletePostById = (req, res) => {

}

const updatePostById = (req, res) => {

}

const createNewComment = (req, res) => {

}

module.exports = {
    createNewPost,
    getFollowingPosts,
    getPostById,
    deletePostById,
    updatePostById,
    createNewComment
}