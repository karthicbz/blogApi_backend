const Users = require('../models/users');
const asynchandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Comments = require('../models/comments');

exports.create_user_post = asynchandler(async(req, res)=>{
    // console.log(req.body.email);
    bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUND))
    .then(async (hash)=>{
        const newUser = new Users({
            email: req.body.email,
            username: req.body.username,
            password: hash,
        })
        const isUserFound = await Users.findOne({email:req.body.email}).exec();
        if(isUserFound){
            res.json({'message': 'Email id already found', 'status':'error'})
        }else{
            const user = await newUser.save();
            const token = jwt.sign({userId: `${user._id}`}, process.env.JWT_SECRET);
            res.json({'message':`${token}`, 'status':'success'});
        }
    })
    .catch(err=>{
        res.json({'message':`${err}`, 'status':'error'});
    })
});

exports.check_auth = asynchandler(async(req, res)=>{
    const user = await Users.findOne({username:req.body.username}).exec();
    if(user){
        const result = await bcrypt.compare(req.body.password, user.password);
        if(result === true){
            const token = jwt.sign({userId: `${user._id}`}, process.env.JWT_SECRET);
            res.json({'message':`${token}`, 'status':'success'});
        }else{
            res.json({'message':'Incorrect Password', 'status':'error'});
        }
    }else{
        res.json({'message':'User not found', 'status':'error'});
    }
});

exports.user_comments_get = asynchandler(async(req, res)=>{
    const comments = await Comments.find({user:req.params.id}).populate('user', '_id username').populate('postid').exec();
    res.render('user_detail', {title: 'Hello', comments:comments});
})