if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}
const express = require("express");
const app = express();
const { uploadToCloudinary } = require("./cloudinary");

const PORT = process.env.PORT

// -------------------------- Middlewares ----------------- //

// JSON body parser
app.use(express.json())

// -------------------------- Routes --------------------- //

app.post("/api/post", uploadToCloudinary, async(req,res)=>{
    console.log(req.body.imageUrl)
    res.send()
})

app.listen(PORT, ()=>{
    console.log(`Server listening on PORT ${PORT}`)
})