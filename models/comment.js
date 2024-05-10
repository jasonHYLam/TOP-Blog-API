const opts = { toJSON: { virtuals: true } };
const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    timeStamp: { type: Date, required: true },
  },
  opts,
);

// better time display
CommentSchema.virtual("timeStampFormatted").get(function () {
  return DateTime.fromJSDate(this.timeStamp).toFormat("T dd/LL/yy");
});

module.exports = mongoose.model("Comment", CommentSchema);
