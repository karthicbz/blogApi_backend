const router = require("express").Router();
const OwnerController = require("../controller/ownerController");
const PostsController = require("../controller/postsController");

router.get("/owner", OwnerController.owner_show_login);

router.post("/owner/login", OwnerController.owner_login);

router.get("/owner/posts/logout", OwnerController.owner_logout);

router.get("/owner/posts", isAuthenticated, PostsController.all_posts_get);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/blog/owner");
}

module.exports = router;
