const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")



exports.getProductById = (req,res,next,id) => {
    Product.findById(id)
     .populate("category") 
     .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error : "No such product available "
            })
        }
        req.product = product;
        next();
    })
}
//create product
exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm(keepExtensions = true);

    form.parse(req,(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error : "problem with file"
            })
        }
        //destructure the fields
        const {price,description,name,category,stock} = fields;
        
        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error : "All Fields Are Compulsory."
            })
        }
        
        let product = new Product(fields);

        //handle file
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "file size should not extend 2MB"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //save to the DB
        product.save((err,product) => {
            if(err){
                return res.status(400).json({
                    error : "saving tshirt in db failed"
                })
            }
            res.json(product);
        })
    })
}

exports.getProduct = (req,res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

//middleware
exports.photo = (req,res, next) => {
    if (req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

//delete controller
exports.deleteProduct = (req,res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: "Failed to delete the product"
            });
        }
        res.json({
            message:  `${deletedProduct.name} removed successfully`,
        })
    })
}

//update controller
exports.updateProduct = (req,res) => {
    let form = new formidable.IncomingForm(keepExtensions = true);

    form.parse(req,(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error : "problem with file"
            })
        }
        //updation code
        let product = req.product;
        product = _.extend(product,fields);

        //handle file
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "file size should not extend 2MB"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //save to the DB
        product.save((err,product) => {
            if(err){
                return res.status(400).json({
                    error : "updation of product failed"
                })
            }
            res.json(product);
        })
    })
}

//product listing
exports.getAllProducts = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find().select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit).exec((err, products) => {
        if(err) {
            return res.status(400).json({
                error: "NO product FOUND"
            })
        }
        res.json(products)
    })
}
//export all the categories present int the database
exports.getAllUniqueCategories = (req,res) => {
    Product.distinct("category",{},(err,category)=>{
        if(err) {
           return res.status(400).json({
               error: "No category found"
           }) 
        }
        res.json(category);
    })
}

//update stock and sold product (middleware)
exports.updateStock =(req,res,next) => {
    let myOperations = req.body.order.products.map(product => {
        return {
            updateOne: {
                filter: {_id:product._id},
                update: {$inc: {stock: -product.count,sold: +product.count}}
            }
        }
    });

    Product.bulkWrite(myOperations,{},(err,products) => {
        if(err) {
            return res.status(400).json({
                error: "Bulk operation failed"
            })
        }
        next();
    })
}