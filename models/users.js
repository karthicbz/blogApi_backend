const mangoose = require('mongoose');
const Schema = mangoose.Schema;

const UserSchema = new Schema({
    email:{type:String, required:true},
    username:{type:String, required:true, maxLength: 100},
    password:{type:String, required:true, maxLength: 100},
});

module.exports = mangoose.model('User', UserSchema);