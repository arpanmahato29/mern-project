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
                error : "please include all fields"
            })
        }
        
        let product = new Product(fields);

        //handle file
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "file size too big"
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