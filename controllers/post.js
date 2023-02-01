const Post = require("../models/post")

exports.getAllPosts = ()=>{
    return Post.find().sort({timestamp: -1})
} 

exports.markPostAsRead = (postId, userId)=>{
    return Post.findByIdAndUpdate(postId,
        { $set: { [`read.${userId}`]: true} },
        { new: true, upsert: true }
      )
}