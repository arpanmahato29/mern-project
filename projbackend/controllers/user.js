const Users = require("../models/user");
const Order = require("../models/order")



exports.getUserById = (req,res,next,id) => {
    Users.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user found in DATABASE"
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
    req.body.email = req.body.email.toLowerCase(); //make all the characters to small case
    if(req.body.hasOwnProperty("name")){
        //capitalize name
        req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1).toLowerCase();
    }
    if(req.body.hasOwnProperty("lastname")){
        //capitalize lastname
        req.body.lastname = req.body.lastname.charAt(0).toUpperCase() + req.body.lastname.slice(1).toLowerCase();
    }
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
            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user)
        }
    )
}
//pulling info from order model
//order placed by a perticular user using req.profile.id
exports.userPurchaseList = (req,res) => {
    Order.find({user : req.profile._id})
    .populate("user","_id name")
    .exec((err,order) => {
        if(err){
            return res.status(400).json({
                error : "No order in this account"
            })
        }
        return res.json(order);
    })
}

exports.pushOrderInPurchaseList = (req,res,next) => {
    let purchaseList = [];
    req.body.order.products.forEach(product => {
        purchaseList.push({
            _id: product._id,
            name : product.name,
            description : product.description,
            category: product.category,
            quantity: product.quantity,
            amount : req.body.order.amount,
            transaction_id : req.body.order.transaction_id
        })
    });

    //store this in DB
    Users.findOneAndUpdate(
        {_id:req.profile._id},
        {$push:{purchases:purchaseList}},
        {new:true}, //when new is true database send back the updated data
        (err,purchases) => {
            if(err) {
                return res.status(400).json({
                    error:"Unable to save purchase list"
                })
     
           }
           next()
        }
    )
}