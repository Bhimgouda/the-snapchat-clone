const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.uploadToCloudinary = async(imageUrl)=>{
  return cloudinary.v2.uploader.upload(imageUrl,{
        folder: "the-snapchat-clone",
        allowedFormats: ["jpeg", "png", "jpg"],
    })
}

