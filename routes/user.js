const express = require("express")
const catchAsync = require("../utils/catchAsync")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../models/user")

router.get('/get-user', catchAsync(async(req,res)=>{
    const {token} = req.cookies;
    const{email} = jwt.decode(token)
    const user = await User.findOne({email})
    res.send(user);
}))

module.exports = router