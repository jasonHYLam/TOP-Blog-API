const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    comments: [],
    date: {type: Date, required: true},
    likes: {type: Number, required: true, min: 0, max: 999},
    published_status: Boolean,

})

module.exports = mongoose.model('Post', PostSchema);