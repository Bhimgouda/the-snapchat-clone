require("dotenv").config()
const express = require("express");
const app = express();
const server = require("http").createServer(app)
const io = require('socket.io')(server)
const { uploadToCloudinary } = require("./cloudinary");
const mongoose = require("mongoose");
const Post = require("./models/post");
const googleAuthRouter = require("./routes/googleAuth")
const userRouter = require("./routes/user")
const cookieParser = require("cookie-parser");
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

    socket.on('get-posts', async()=>{
        const posts = await getAllPosts()
        socket.emit('send-posts', posts)
    })
    
    socket.on('add-post', async(post)=>{
        const {url} = await uploadToCloudinary(post.imageUrl)
        post.imageUrl = url;
        const newPost = await Post.create(post);
        io.emit('update-posts', newPost)
    })
    
    socket.on("read-post", async(postId, userId)=>{
        await markPostAsRead(postId, userId)
    })
})

// -------------------------- Routes --------------------- //

app.use("/api/auth/google/callback", googleAuthRouter)
app.use("/api", userRouter)


// Error Handling Middleware

app.use((err,req,res,next)=>{
    const {message="Something went Wrong", status=500} = err;
    console.log(err.stack)
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