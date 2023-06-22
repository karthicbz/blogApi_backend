const mangoose = require('mangoose');
const Schema = mangoose.Schema;

const CommentsSchema = new Schema({
    comment:{type:String, required:true, maxLength:10000},
    user:{type:Schema.Types.ObjectId, ref:"User", required:true},
    commentedOn:{type:Date, default:Date.now},
    postid:{type:Schema.Types.ObjectId, ref: "Posts", required:true},
});

module.exports = mangoose.model("Comments", CommentsSchema);