const mangoose = require("mongoose");
const Schema = mangoose.Schema;
const DateTime = require("luxon").DateTime;

const PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "Owner", required: true },
  published: { type: Boolean, default: false, required: true },
  publishedOn: { type: Date, default: Date.now }},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true},
  });

PostSchema.virtual("url").get(function () {
  return `/blog/owner/posts/${this._id}`;
});

PostSchema.virtual("textTeaser").get(function () {
  return this.text.slice(0, 160) + "...";
});

PostSchema.virtual("formatedDateTime").get(function () {
  return DateTime.fromJSDate(this.publishedOn).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mangoose.model("Posts", PostSchema);
