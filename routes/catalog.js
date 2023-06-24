const router = require("express").Router();
const OwnerController = require("../controller/ownerController");
const PostsController = require("../controller/postsController");

router.get("/posts", PostsController.get_published_posts);

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

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/blog/owner");
}

module.exports = router;
