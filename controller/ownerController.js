const asynchandler = require("express-async-handler");
const LocalStrategy = require("passport-local").Strategy;
const Owner = require("../models/owner");
const passport = require("passport");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    // console.log(`username: ${username}`);
    try {
      const user = await Owner.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      if (user.password !== password) {
        return done(done, false, { message: "Password doesn't match" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await Owner.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

exports.owner_show_login = asynchandler(async (req, res) => {
  res.render("login");
});

exports.owner_login = passport.authenticate("local", {
  successRedirect: "/blog/owner/posts",
  failureRedirect: "/blog/owner",
});

exports.owner_logout = asynchandler(async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/blog/owner");
  });
});

exports.owner_all_posts = asynchandler(async (req, res) => {
  res.send("All posts page not implemented");
});

exports.posts_create_get = asynchandler(async (req, res) => {});

exports.posts_create_post = asynchandler(async (req, res) => {});

exports.posts_update_get = asynchandler(async (req, res) => {});

exports.posts_update_post = asynchandler(async (req, res) => {});

exports.posts_delete_get = asynchandler(async (req, res) => {});

exports.posts_delete_post = asynchandler(async (req, res) => {});
