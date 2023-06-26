const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DateTime = require("luxon").DateTime;


const CommentsSchema = new Schema({
    comment:{type:String, required:true, maxLength:10000},
    user:{type:Schema.Types.ObjectId, ref:"User", required:true},
    commentedOn:{type:Date, default:Date.now},
    postid:{type:Schema.Types.ObjectId, ref: "Posts", required:true}},{
        toObject:{virtuals:true},
        toJSON:{virtuals:true},
});

CommentsSchema.virtual("formatedDateTime").get(function () {
    return DateTime.fromJSDate(this.commentedOn).toLocaleString(
      DateTime.DATETIME_MED
    );
});

module.exports = mongoose.model("Comments", CommentsSchema);