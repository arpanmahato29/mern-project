const User = require("../models/user")
const {validationResult} = require("express-validator")
var expressJwt = require("express-jwt")
var jwt = require("jsonwebtoken")

exports.signup = (req,res) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0]
            
        })
    }

    const user = new User(req.body)
    user.save((err,user)=>{
        //console.log("EROOOOOOOOOOOOOOOOOOOOR" + err);
        
        if (err) {
             return res.status(400).json({
                 err : "NOT able to save user in DB"
             })
         }
        res.json({
            name : user.name,
            email : user.email,
            id : user._id
        });
    })
}

exports.signout = (req,res) =>{
    res.clearCookie("token")
    res.json({
        message:"User signout successfully"
    })
}

exports.signin = (req,res) => {
    
    const errors = validationResult(req)
    const {email, password} = req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0]
        })
    }

    User.findOne({email},(err,user) => {
        //console.log("ENTERED HERE");
        
        if(err || !user){
            return res.status(400).json({
                error: "USER email does not exist"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and password do no match"
            })
        }
        //create token
        const token = jwt.sign({_id:user._id},process.env.SECRET)
        //put token in cookie
        res.cookie("token",token);

        //send response to front end
        const {_id,name,email,role} = user
        return res.json({token,user:{_id,name,email,role}});
    })
}

