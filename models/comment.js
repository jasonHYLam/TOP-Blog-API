const opts = { toJSON: { virtuals: true } };
const mongoose = require('mongoose');

const ChildComment = require('./childComment');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: { type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref: "User"},
    post: { type: Schema.Types.ObjectId, ref: "Post"},
    parentComment: { type: Schema.Types.ObjectId, ref: "Comment"},
    timeStamp: { type: Date, required: true}
}, opts);

CommentSchema.virtual('childComments').get(function() {
    return ChildComment.find({ parentComment: this._id })
    .exec(function(err, user) {
    })
})

module.exports = mongoose.model('Comment', CommentSchema);