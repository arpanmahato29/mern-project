const express = require('express')
const router = express.Router()
const {signout,signup,signin,isSignedIn} = require("../controllers/authentication")
const {check} = require("express-validator")

//name validator
let nameValidator = check("name").isLength({min:3}).withMessage("name should be atleast 3 character");
//email validator
let emailValidator = check("email").isEmail().withMessage("Email is required");
//password validator
let passwordValidator = check("password").isLength({min:5}).withMessage("password should be at least 5 character");

//signup route
router.post("/signup",[nameValidator,emailValidator,passwordValidator],signup)

//signin route
router.post("/signin",[emailValidator, passwordValidator],signin)


//signout route
router.get("/signout",signout)





module.exports = router