const express = require("express");
const router = express.Router();

const {
  createcourse,
  showallcourses,
  getcoursedetail,
  accesscoursedetail,
  getInstructorCourses,
  editCourse,
  deleteCourse,
  getfulldetailofcourse,
  updatecourseprogress
} = require("../controllers/Courses");

const {
  createsection,
  updatesection,
  deletesection,
} = require("../controllers/sectionn");

const {
  createsubsection,
  updateSubsection,
  deleteSubsection,
} = require("../controllers/subbsection");

const {
  createcategory,
  showAllcategory,
  categorypagedetail,
} = require("../controllers/Category");

const {
  createrating,
  getaveragerating,
  getallratingandreview,
} = require("../controllers/ratinggandreview");

const { auth, isadmin, isstudent, isinstructor } = require("../middlewares/auth");

// -------------------- Course --------------------
router.post("/createcourse", auth, isinstructor, createcourse);
router.get("/showallcourses", showallcourses);
router.post("/getcoursedetail", getcoursedetail);
router.get("/courseaccessdetail/:courseid", accesscoursedetail);
router.post("/getfulldetailofcourse",auth,getfulldetailofcourse);
router.post("/updatecourseprogress",auth,isstudent,updatecourseprogress);

router.get("/getinstructorcourses", auth, isinstructor, getInstructorCourses);
router.put("/editcourse",auth,isinstructor,editCourse);
router.delete("/deletecourse",auth,isinstructor,deleteCourse)

// -------------------- Section --------------------
router.post("/createsection", auth, isinstructor, createsection);
router.put("/updatesection", auth, isinstructor, updatesection);
router.delete("/deletesection", auth, isinstructor, deletesection);

// -------------------- Subsection --------------------
router.post("/createsubsection", auth, isinstructor, createsubsection);
router.put("/updateSubsection", auth, isinstructor, updateSubsection);
router.delete(
  "/deletesubsection",
  auth,
  isinstructor,
  deleteSubsection
);

// -------------------- Category --------------------
router.post("/createcategory", auth, isadmin, createcategory);
router.get("/showallcategory", showAllcategory);
// router.post("/categorypagedetail", categorypagedetail);
router.post("/categorypagedetail", (req, res, next) => {
  console.log("Categorypagedetail route hit", req.body);
  next();
}, categorypagedetail);

// -------------------- Rating & Review --------------------
router.post("/createrating", auth, isstudent, createrating);
router.get("/getaveragerating", getaveragerating);
router.get("/getreview", getallratingandreview);

module.exports = router;
