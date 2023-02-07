const { default: axios } = require("axios");
const express = require("express");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const jwt = require("jsonwebtoken")

router.get("/", catchAsync(async(req,res)=>{
    const {code} = req.query;
    const {data} = await getAccessToken(code)
    const {data: userData} = await getUserData(data.access_token)


    // Now seraching DB
    let user = await User.findOne({email: userData.email})


    if(user){ // For registered Users(sign in)
        const token = jwt.sign(
            {email: user.email},
            process.env.TOKEN_KEY,
            {
                expiresIn : "2h",
            },
        )

        res.cookie("token", token)
    }
    else{ // For new User(sign up)
        const user = await User.create({
            email: userData.email,
            name: userData.name,
            profilePic: userData.picture,
        })

        const token = jwt.sign(
            {email: user.email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }        
        )

        res.cookie("token", token)
    }

    if(process.env.NODE_ENV !== "production"){
        return res.redirect("http://localhost:3000")
      }
    return res.redirect("/chats");
}))

function getAccessToken(code){
    return axios.post("https://oauth2.googleapis.com/token",{
        client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_SECRET_API_KEY,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code',
          code,
    })
}

function getUserData(access_token){
    return axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}

module.exports = router