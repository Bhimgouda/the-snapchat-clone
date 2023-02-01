const mongoose = require("mongoose");
const {Schema} = mongoose;

const postSchema = new Schema({
    imageUrl: String,
    username: String,
    timestamp: String,
    profilePic: String,
    read: {
        type: Object,
        default: {}
    }
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;