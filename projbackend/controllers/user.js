const Users = require("../models/user");
const Order = require("../models/order")



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
        {new: true, useFindAndModify: false},  //compulsory parameters
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

exports.userPurchaseList = (req,res) => {
    Order.find({user : req.profile._id})
    .populate("user","_id name")
    .exec((err,order) => {
        if(err){
            return res.status(400).json({
                error : "No order on this account"
            })
        }
        return res.json(order);
    })
}

exports.pushOrderInPurchaseList = (req,res,next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name : product.name,
            description : product.description,
            category: product.category,
            quantity: product.quantity,
            amount : req.boy.order.amount,
            transaction_id : req.body.transaction_id
        })
    });

    //store this in DB
    Users.findOneAndUpdate(
        {_id:req.profile._id},
        {$push:{purchases:purchases}},
        {new:true},
        (err,purchases) => {
            if(err) {
                return res.status(400).json({
                    error:"Unable to save perchase list"
                })
     
           }
           next()
        }
    )
}