const postModel = require("../models/post")
const userModel = require("../models/user");
const commentModel = require("../models/comment")



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
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    })
}

const getPostsByUserId = (req, res) => {
  let id = req.params.user_id;
  postModel
    .find({ user: id })
    .populate("user", "firstName -_id")
    .exec()
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          success: false,
          message: `The user=> ${id} has no posts`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the posts for the user: ${id} `,
        post: post,
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

const deletePostById = (req, res) => {
  const id = req.params.post_id;
  postModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The post with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Post deleted`,
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

const updatePostById = (req, res) => {
  const id = req.params.post_id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key] == "" && delete filter[key];
  });
  postModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((newPost) => {
      if (!newPost) {
        return res.status(404).json({
          success: false,
          message: `The post with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `post updated`,
        post: newPost,
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

const createNewComment = (req, res) => {

  const id = req.params.post_id
  const { comment } = req.body
  const commenter = req.token.userId

  postModel
    .findOne({ _id: id })
    .then(post => {
      const newComment = new commentModel({ comment, commenter })
      newComment
        .save()
        .then(commentResult => {
          post.comments.push(commentResult._id)
          post.save()
          res.status(201).json({
            success: true,
            message: commentResult.comment,
            comment: commentResult
          })
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            message: "Server Error",
            err: err
          })
        })

    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err
      })
    })

}

const addLikeToPost = (req, res) => {
  const userId = req.token.userId
  const postId = req.params.post_id

  postModel.findOne({ _id: postId })
    .then(post => {

      if (post.likes.includes(userId)) {
        const index = post.likes.indexOf(userId)
        post.likes.splice(index, 1)
        post.save()
        return res.status(200).json({
          success: true,
          message: "unlike",
          post : post
        })
      }

      post.likes.push(userId)
      post.save()

      return res.status(201).json({
        success: true,
        message: "like",
        post : post
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err
      })
    })
}



module.exports = {
  createNewPost,
  getFollowingPosts,
  getPostsByUserId,
  deletePostById,
  updatePostById,
  createNewComment,
  addLikeToPost
}