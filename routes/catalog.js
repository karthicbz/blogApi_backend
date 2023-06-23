const router = require("express").Router();
const Owner = require("../controller/ownerController");

router.get("/owner", Owner.owner_show_login);

router.post("/owner/login", Owner.owner_login);

router.get("/owner/posts/logout", Owner.owner_logout);

router.get("/owner/posts", isAuthenticated, Owner.owner_all_posts);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/blog/owner");
}

module.exports = router;
