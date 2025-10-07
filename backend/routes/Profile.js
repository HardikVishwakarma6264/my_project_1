const express = require("express");
const router = express.Router();

const {
  updateprofile,
  deleteaccount,
  getalluserdetail,
  getenrolledcourse,
  instructordashboard
  
} = require("../controllers/profilee");
const { auth } = require("../middlewares/auth");

router.put("/updateprofile", auth, updateprofile);
router.delete("/deleteaccount", auth, deleteaccount);
router.get("/getalldetail", auth, getalluserdetail);
router.get("/getenrolledcourse",auth,getenrolledcourse);
router.get("/instructordashboard",auth,instructordashboard);


module.exports = router;
