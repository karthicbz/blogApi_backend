const router = require("express").Router();
const OwnerController = require("../controller/ownerController");
const PostsController = require("../controller/postsController");
const UserController = require("../controller/userController");
const CommentController = require("../controller/CommentsController");

router.get("/posts", PostsController.get_published_posts);

router.post("/posts/user/new", UserController.create_user_post);

router.post("/posts/login/auth", UserController.check_auth);

router.get("/owner", OwnerController.owner_show_login);

router.post("/owner/login", OwnerController.owner_login);

router.get("/owner/posts/logout", OwnerController.owner_logout);

router.get("/owner/posts", isAuthenticated, PostsController.all_posts_get);

router.get("/owner/posts/new", isAuthenticated, PostsController.posts_create_get);

router.post("/owner/posts/new", isAuthenticated, PostsController.posts_create_post);

router.get("/owner/posts/:id/edit", isAuthenticated, PostsController.posts_update_get);

router.post("/owner/posts/:id/edit", isAuthenticated, PostsController.posts_update_post);

router.get("/owner/posts/:id/delete", isAuthenticated, PostsController.posts_delete_get);

router.get("/owner/posts/:id/publish", isAuthenticated, PostsController.post_publish);

router.get("/owner/posts/:id/unpublish", isAuthenticated, PostsController.post_unpublish);

router.get("/owner/posts/:id", isAuthenticated, PostsController.single_post_get);

//this will route to the view which will show user and all their comment details
router.get("/owner/users/:id", isAuthenticated, UserController.user_comments_get);

router.get("/posts/:id", PostsController.single_post_json);

//all comments by postid
router.get("/posts/:id/comments", CommentController.all_post_comments);

//save new comment
router.post("/posts/:id/comment/new", CommentController.comment_post);

//deletes user comment
router.get("/posts/:postId/comments/:commentId/delete", CommentController.delete_comment_get);

//updated user comment
router.post("/posts/comments/:commentId/update", CommentController.update_comment_post);

//route for owner to delete comment
router.get("/owner/posts/:postId/comments/:commentId/delete", CommentController.delete_comment_owner);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/blog/owner");
}

module.exports = router;
