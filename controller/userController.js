const Users = require('../models/users');
const asynchandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.create_user_post = asynchandler(async(req, res)=>{
    bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUND))
    .then((hash)=>{
        const newUser = new Users({
            email: req.body.email,
            username: req.body.username,
            password: hash,
        })
        const isUserFound = Users.findOne({email:req.body.email}).exec();
        if(isUserFound){
            res.json({'message': 'Email id already found', 'status':'error'})
        }else{
            const user = newUser.save();
            const token = jwt.sign({userId: `${user._id}`}, process.env.JWT_SECRET);
            res.json({'message':`${token}`, 'status':'success'});
        }
    })
    .catch(err=>{
        res.json({'message':`${err}`, 'status':'error'});
    })
});