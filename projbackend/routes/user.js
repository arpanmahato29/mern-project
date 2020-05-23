const express = require("express");
const router = express.Router();

const {getUserById,getUser} = require("../controllers/user");
const {isSignedIn,isAdmin,isAuthenticated} = require("../controllers/authentication");

router.param("userId",getUserById);
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);

module.exports = router;
