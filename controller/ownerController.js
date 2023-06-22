const asynchandler = require('express-async-handler');

exports.owner_login = asynchandler(async(req, res)=>{
    res.render('login');
})