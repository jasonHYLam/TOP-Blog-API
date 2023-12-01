const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: { type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref: "User"},
    childComments: [],
})

module.exports = mongoose.model('Comment', CommentSchema);