const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "Owner", required: true },
  published: { type: Boolean, default: false, required: true },
  publishedOn: { type: Date, detault: Date.now },
});

PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

PostSchema.virtual("textTeaser").get(function () {
  return this.text.slice(0, 160);
});

module.exports = mangoose.model("Posts", PostSchema);
