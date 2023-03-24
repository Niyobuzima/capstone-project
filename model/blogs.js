const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
    },
    date:{
        type: String,
        default : Date.now,
    },
    cloudinary_id: {
        type: String,
    },
});

const blog = mongoose.model('blogs',blogSchema);

module.exports = blog;
