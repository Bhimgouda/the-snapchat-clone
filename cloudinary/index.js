const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.uploadToCloudinary = async(req,res,next)=>{
    const {imageUrl} = req.body;
    const {url} = await cloudinary.v2.uploader.upload(imageUrl,{
        folder: "the-snapchat-clone",
        allowedFormats: ["jpeg", "png", "jpg"],
    })
    req.body.imageUrl = url;
    next()
}

