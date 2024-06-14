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
  // console.log(userId);

  userModel
    .findById({ _id: userId }, "following  _id")
    .populate("following")
    .then((result) => {
      if (!result.following.length) {
        // console.log(result);
        return res.status(404).json({
          success: false,
          message: `The user : ${userId} has not followed anyone`,
        });
      }

      postModel.find({ user: result.following })
        .populate("user", "firstName lastName profileImage ")
        .then(posts => {
          // console.log(posts);
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


const getCommentsByPostId = (req, res) => {

  let id = req.params.post_id;
  postModel
    .findOne({ _id: id })
    .populate({
      path: 'comments',
      populate: {
        path: 'commenter'
      },
    })
    .exec()
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          success: false,
          message: `there is no comments`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the comments for the post: ${id} `,
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
          post: post
        })
      }

      post.likes.push(userId)
      post.save()

      return res.status(201).json({
        success: true,
        message: "like",
        post: post
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


const deleteCommentById = (req, res) => {
  const comment_id = req.params.comment_id;
  const post_id = req.params.post_id;


  // --------------------------------
  // --------------------------------


  postModel.findById({ _id: post_id })
    .then(post => {
      const index = post.comments.indexOf(comment_id);
      if (index !== -1) {
        post.comments.splice(index, 1);
        post.save()
          .then(() => {
            res.status(200).json({
              success: true,
              message: `Comment deleted`,
            });
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              message: `Error saving post after comment deletion`,
              error: err.message,
            });
          });
      } else {
        res.status(404).json({
          success: false,
          message: `The comment with id => ${comment_id} not found in the post`,
        });
      }
    })


}


module.exports = {
  createNewPost,
  getFollowingPosts,
  getPostsByUserId,
  deletePostById,
  updatePostById,
  createNewComment,
  addLikeToPost,

  getCommentsByPostId,
  deleteCommentById
}