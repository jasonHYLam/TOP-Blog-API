const opts = { toJSON: { virtuals: true } };
const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, required: true},
    author: { type: Schema.Types.ObjectId, ref: "User"},
    likes: {type: Number, required: true, min: 0, max: 999, default: 0},
    published_status: {type: Boolean, default: false},
}, opts)

// better time display
PostSchema.virtual('dateFormatted').get(function() {
    return DateTime.fromJSDate(this.date).toFormat('dd/LL/yy')
})

module.exports = mongoose.model('Post', PostSchema);