if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}


const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const { uploadToCloudinary } = require("./cloudinary");
const Post = require("./models/post");
const catchAsync = require("./utils/catchAsync");

const PORT = process.env.PORT
const dbUrl = process.env.MONGODB_URI

// -------------------------- Middlewares ----------------- //

// JSON body parser
app.use(express.json())

// -------------------------- Routes --------------------- //

app.post("/api/post", uploadToCloudinary, catchAsync(async(req,res)=>{
    const post = await Post.create(req.body);
    res.send(200);
    console.log(post)
}))



app.use((err,req,res,next)=>{
    const {message="Something went Wrong", status=500} = e;
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

app.listen(PORT, ()=>{
    console.log(`Server listening on PORT ${PORT}`)
})