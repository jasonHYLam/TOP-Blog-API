const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, required: true},
    author: { type: Schema.Types.ObjectId, ref: "User"},
    likes: {type: Number, required: true, min: 0, max: 999, default: 0},
    published_status: {type: Boolean, default: false},
})

module.exports = mongoose.model('Post', PostSchema);