const Comments = require('../models/comments');
const Users = require('../models/users');
const Posts = require('../models/posts');
const DeletedComments = require('../models/deletedComments');
const asynchandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.comment_post = [
    body('postcomment', 'Invalid Post comment')
    .trim()
    .escape(),
    asynchandler(async(req, res)=>{
        const errors = validationResult(req);
        const decoded = jwt.verify(req.body.userId, process.env.JWT_SECRET);
        const newComment = new Comments({
            comment:req.body.postcomment,
            user: decoded.userId,
            commentedOn: Date.now(),
            postid: req.body.postId,
        })
        if(!errors.isEmpty()){
            res.json({'message':`${errors.errors[0].msg}`, 'status':'error'});
        }else{
            // await newComment.save();
            const isUserFound = await Users.findById(decoded.userId).exec();
            if(isUserFound){
                await newComment.save();
                res.json({'message':'Comment Saved', 'status':'success'});
            }else{
                res.json({'message':'user not found', 'status':'error'});
            }
        }
    }),
];

exports.all_post_comments = asynchandler(async(req, res)=>{
    const allComments = await Comments.find({postid:req.params.id}).populate('user').sort({commentedOn:-1}).exec();
    res.json(allComments);
});

//this route allows user to delete comment
exports.delete_comment_get = asynchandler(async(req, res)=>{
    const deleteComment = await Comments.findByIdAndRemove(req.params.commentId).exec();
    res.json({'message':'Comment deleted', 'status':'success'});
});

//this route allows owner to delete comment
//start here
exports.delete_comment_owner = asynchandler(async(req, res)=>{
    const [comment, posts, allPostComments] = await Promise.all([
        // Comments.findByIdAndUpdate(req.params.commentId, {comment:"[comment removed by admin]", user:'', commentedOn:''}).exec(),
        Comments.findById(req.params.commentId).populate('user', '_id').exec(),
        Posts.findById(req.params.postId).exec(),
        Comments.find({postid:req.params.postId}).populate('user', 'username').exec()
    ]);
    const dComment = new DeletedComments({
        comment: comment.comment,
        user: comment.user._id,
        commentedOn: comment.commentedOn,
        postid: req.params.postId,
    });
    await dComment.save();
    await Comments.findByIdAndUpdate(
        req.params.commentId, 
        {
            comment:"[comment removed by admin]", 
            user:comment.user._id, commentedOn:`${comment.commentedOn}`,
            removed: true,
        }).exec();
    res.render('view_post', {post:posts, comments:allPostComments});
})

exports.update_comment_post = [
    body('updatedComment', 'Unable to save updated comment')
    .trim()
    .escape(),
    asynchandler(async(req, res)=>{
        const commentFound = await Comments.findById(req.params.commentId).exec();
        if(commentFound){
            await Comments.findOneAndUpdate({_id:req.params.commentId}, {comment:req.body.updatedComment}).exec();
            res.json({'message':'Comment Updated', 'status':'success'});
        }else{
            res.json({'message':'Comment not found', 'status':'error'});
        }
    }),
];
