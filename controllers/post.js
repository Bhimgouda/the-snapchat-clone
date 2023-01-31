const Post = require("../models/post")

exports.getAllPosts = ()=>{
    return Post.find().sort({timestamp: -1})
} 

exports.markPostAsRead = (postId)=>{
    return Post.findByIdAndUpdate(postId, {read: true})
}