var express = require('express')
var router = express.Router()
const {signout,signup,signin,isSignedIn} = require("../controllers/authentication")
const {check} = require("express-validator")

router.post("/signup",[
    check("name").isLength({min:3}).withMessage("name should be atleast 3 character"),
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({min:5}).withMessage("password should be at least 5 character")
],signup)


router.post("/signin",[
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({min:1}).withMessage("password field is empty")
],signin)

router.get("/signout",signout)




module.exports = router