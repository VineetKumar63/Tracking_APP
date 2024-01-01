const express = require('express')
const User = new express.Router();

const {userSignup, userSignin} = require ("../Controller/userController.js")

User.post("/signup", userSignup)
User.post('/signin/:mobile',userSignin)

module.exports = { User}