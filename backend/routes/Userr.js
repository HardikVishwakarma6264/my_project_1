const express = require("express");
const router=express.Router();

const{login,signup,sendotp,changepassword}=require("../controllers/Auth");
const{resetpassswordtoken,resetpassword}=require("../controllers/Resetpassword");
const {updateProfileImage }=require("../controllers/profilee");


const{auth}=require("../middlewares/auth");

//routes for login, signup, and authentication

router.post("/login",login);
router.post("/signup",signup);
router.post("/sendotp",sendotp);
router.post("/changepassword",auth,changepassword);



// reset password routes
router.post("/reset-password-token", resetpassswordtoken);
router.post("/reset-password", resetpassword);
router.post("/update-image",auth,updateProfileImage )


module.exports=router;