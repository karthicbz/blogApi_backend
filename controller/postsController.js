const asynchandler = require("express-async-handler");
const Posts = require("../models/posts");
const Owner = require("../models/owner");
const { body, validationResult } = require("express-validator");

exports.all_posts_get = asynchandler(async (req, res) => {
  const allPosts = await Posts.find({}, "title text publishedOn").exec();
  res.render("posts", { posts: allPosts });
});

exports.single_post_get = asynchandler(async(req, res)=>{
  const getPost = await Posts.findById(req.params.id).exec();
  res.render('view_post', {post:getPost});
})

exports.posts_create_get = asynchandler(async (req, res) => {
  res.render("create_post", {
    returnedTitle: "",
    returnedText: "",
    errors: "",
  });
});

exports.posts_create_post = [
  body("posttitle", "Post name must be 3 characters length")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("posttext", "Post must be alteast 160 characters length")
    .trim()
    .isLength({ min: 120 }),
  asynchandler(async (req, res) => {
    const errors = validationResult(req);
    const getOwner = await Owner.findOne().exec();
    // console.log(getOwner._id);
    const newPost = new Posts({
      title: req.body.posttitle,
      text: req.body.posttext,
      owner: getOwner._id,
      published: false,
      publishedOn: Date.now(),
    });
    if (!errors.isEmpty()) {
      console.log(errors.errors[0].msg);
      res.render("create_post", {
        returnedTitle: req.body.posttitle,
        returnedText: req.body.posttext,
        errors: errors.errors,
      });
    } else {
      const post = await newPost.save();
      res.redirect(post.url);
    }
  }),
];

exports.posts_update_get = asynchandler(async (req, res) => {
  const post = await Posts.findById(req.params.id).exec();
  res.render('create_post', {returnedTitle:post.title, returnedText:post.text, errors:''});
});

exports.posts_update_post = [
  body("posttitle", "Post name must be 3 characters length")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("posttext", "Post must be alteast 160 characters length")
    .trim()
    .isLength({ min: 120 }),
  asynchandler(async (req, res) => {
    const errors = validationResult(req);
    const getOwner = await Owner.findOne().exec();
    const updatePost = new Posts({
      title: req.body.posttitle,
      text: req.body.posttext,
      owner: getOwner._id,
      published:false,
      publishedOn: Date.now(),
      _id: req.params.id,
    })
    if(!errors.isEmpty()){
      res.render('create_post', {
        returnedTitle:req.body.posttitle,
        returnedText:req.body.posttext,
        errors:errors.errors,
      });
    }else{
      const updatedPost = await Posts.findByIdAndUpdate(req.params.id, updatePost, {}).exec();
      res.redirect(updatedPost.url);
    }
  })
];

exports.posts_delete_get = asynchandler(async (req, res) => {
  const post = await Posts.findByIdAndRemove(req.params.id).exec();
  res.redirect('/blog/owner/posts');
});

exports.posts_delete_post = asynchandler(async (req, res) => {});
