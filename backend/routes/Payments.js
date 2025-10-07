const express = require("express");
const router=express.Router();

const{capturepayment,verifypayment,sendpaymentsuccessmail}=require("../controllers/Payment");
const{auth,isstudent}=require("../middlewares/auth");

router.post("/capturepayment",auth,isstudent,capturepayment);
router.post("/verifypayment", auth, isstudent, verifypayment);

router.post("/paymentsuccessemail",auth,sendpaymentsuccessmail);

module.exports=router