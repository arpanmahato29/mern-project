const express = require("express");
const router = express.Router();

const {getCategoryById,createCategory,getCategory,getAllCategories,updateCategory,removeCategory} = require("../controllers/category")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/authentication")
const {getUserById} = require("../controllers/user")

//params
router.param("userId",getUserById);
router.param("categoryId", getCategoryById);

//actual routes goes here
//create category route
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)
//read category routes
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategories)
//update category route
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)

//delete category route
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory)

module.exports = router;