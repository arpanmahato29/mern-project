const express = require("express")
const router = express.Router()

//controllers
const {getProductById,createProduct} = require("../controllers/product")
const {isSignedIn,isAdmin,isAuthenticated} = require("../controllers/authentication")
const {getUserById} = require("../controllers/user")


//all params
router.param("userId",getUserById);
router.param("productId",getProductById);

//all the actual routes
//TODO: add checker to the routes
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)


module.exports = router;