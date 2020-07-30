const express = require("express");
const router = express.Router();
//controllers
const {getUserById,getUser, updateUser,userPurchaseList} = require("../controllers/user");
const {isSignedIn,isAdmin,isAuthenticated} = require("../controllers/authentication");
//params
router.param("userId",getUserById);

//routes
//get user
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
//update user
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);

router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);


module.exports = router;
