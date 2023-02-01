const express = require("express")
const catchAsync = require("../utils/catchAsync")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../models/user")

router.get('/get-user', catchAsync(async(req,res)=>{
    const {token} = req.cookies;
    if(token){
        const{email} = jwt.decode(token, process.env.TOKEN_KEY)
        const user = await User.findOne({email})
        return res.send(user);
    }
    else res.end();
}))

router.get("/logout", catchAsync(async(req,res)=>{
    req.cookies.token = null;
    return res.sendStatus(200);
}))

module.exports = router