const asynchandler = require("express-async-handler");
const Posts = require("../models/posts");

exports.all_posts_get = asynchandler(async (req, res) => {
  const allPosts = await Posts.find({}, "title text publishedOn").exec();
  res.render("posts", { posts: allPosts });
});

exports.posts_create_get = asynchandler(async (req, res) => {});

exports.posts_create_post = asynchandler(async (req, res) => {});

exports.posts_update_get = asynchandler(async (req, res) => {});

exports.posts_update_post = asynchandler(async (req, res) => {});

exports.posts_delete_get = asynchandler(async (req, res) => {});

exports.posts_delete_post = asynchandler(async (req, res) => {});
