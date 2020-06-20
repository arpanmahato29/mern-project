const express = require("express")
const router = express.Router()
const {check} = require("express-validator")

//controllers
const {getProductById,createProduct,getProduct,photo,updateProduct,deleteProduct,getAllProducts,getAllUniqueCategories} = require("../controllers/product")
const {isSignedIn,isAdmin,isAuthenticated} = require("../controllers/authentication")
const {getUserById} = require("../controllers/user")

//all params
router.param("userId",getUserById);
router.param("productId",getProductById);

//all the actual routes
//create route
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);
//read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId",photo);
//update route
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);
//delete route
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);

//listing route
router.get("/products",getAllProducts);

router.get("/products/categories",getAllUniqueCategories);

module.exports = router;