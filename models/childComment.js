const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChildCommentSchema = new Schema({
    text: { type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref: "User"},
    parentComment: { type: Schema.Types.ObjectId, ref: "Comment"},
    timeStamp: { type: Date, required: true}
});

module.exports = mongoose.model('ChildComment', ChildCommentSchema);