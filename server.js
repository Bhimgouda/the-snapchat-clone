if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}


const express = require("express");
const app = express();
const server = require("http").createServer(app)
const io = require('socket.io')(server)
const { uploadToCloudinary } = require("./cloudinary");
const mongoose = require("mongoose");
const Post = require("./models/post");
const catchAsync = require("./utils/catchAsync");
const googleAuthRouter = require("./routes/googleAuth")
const userRouter = require("./routes/user")
const cookieParser = require("cookie-parser");
const path = require("path");
const { getAllPosts, markPostAsRead } = require("./controllers/post");


const PORT = process.env.PORT
const dbUrl = process.env.MONGODB_URI


// -------------------------- Middlewares ----------------- //

// JSON body parser
app.use(express.json())

// To parse cookies
app.use(cookieParser())

// ----------------------- REALTIME SOCKET.IO DUPLEX CONNECTION ---------------------- //

io.on("connection", async(socket)=>{
    const posts = await getAllPosts()
    socket.emit("send-posts", posts)
    socket.on('get-posts', async()=>{
        const posts = await getAllPosts()
        socket.emit('send-posts', posts)
    })
    
    socket.on('add-post', async(post)=>{
        const {url} = await uploadToCloudinary(post.imageUrl)
        post.imageUrl = url;
        await Post.create(post);
        const posts = await getAllPosts()
        io.emit('update-posts', posts)
    })
    
    socket.on("read-post", async(postId)=>{
        await markPostAsRead(postId)
        const posts = await getAllPosts();
        socket.emit('update-posts', posts)
    })


})

// -------------------------- Routes --------------------- //

app.use("/api/auth/google/callback", googleAuthRouter)
app.use("/api", userRouter)

// app.post("/api/post", uploadToCloudinary, catchAsync(async(req,res)=>{
//     const post = await Post.create(req.body);
//     res.send(200);
//     console.log(post)
// }))

app.use((err,req,res,next)=>{
    const {message="Something went Wrong", status=500} = err;
    console.log(message)
    res.status(status).send(message);
})

mongoose.set("strictQuery", false)
mongoose.connect(dbUrl)
.then(()=>{
    console.log('Connected to DB successfully')
})
.catch((e)=>{
    console.log(e)
})

server.listen(PORT, ()=>{
    console.log(`Server listening on PORT ${PORT}`)
})