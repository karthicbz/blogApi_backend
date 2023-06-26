const Comments = require('../models/comments');
const Users = require('../models/users');
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