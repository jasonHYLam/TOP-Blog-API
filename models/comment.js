const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: { type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref: "User"},
    post: { type: Schema.Types.ObjectId, ref: "Post"},
    parentComment: { type: Schema.Types.ObjectId, ref: "Comment"},
    timeStamp: { type: Date, required: true}
})

module.exports = mongoose.model('Comment', CommentSchema);