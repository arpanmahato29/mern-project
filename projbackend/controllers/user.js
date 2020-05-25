const Users = require("../models/user");



exports.getUserById = (req,res,next,id) => {
    Users.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user;
        next();
    }) ; 
};

exports.getUser = (req,res) => {
    //not accessable by the end users
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    Users.findByIdAndUpdate(
        {_id : req.profile._id},    //find the user
        {$set: req.body},           //update the selected field
        {new: true, userFindAndModify: false},  //compulsory parameters
        (err,user) =>{
            if(err) {
                return req.status(400).json({
                    error:"You are not authorized to update this user"
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            res.json(user)
        }
    )
}