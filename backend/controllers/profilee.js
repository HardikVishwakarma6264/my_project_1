const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadToCloudinary } = require("../utils/imageuploder");
const accountDeletionEmail =require("../mail/accountdelete");
const mailSender=require("../utils/mailsender");
const CourseProgress=require("../models/Courseprogress");
const convertSecondsToDuration=require("../utils/convertSecondsToDuration");


exports.updateprofile = async (req, res) => {
  try {
    const { dateofbirth, about, contactnumber, gender } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is missing",
      });
    }

    // Find user with profile populated
    const userDetails = await User.findById(userId).populate("additionaldetail");
    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const profileDetails = userDetails.additionaldetail;
    if (!profileDetails) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    // Update profile fields
    if (dateofbirth !== undefined) profileDetails.dateofbirth = dateofbirth;
    if (about !== undefined) profileDetails.about = about;
    if (gender !== undefined) profileDetails.gender = gender;
    if (contactnumber !== undefined) profileDetails.contactnumber = contactnumber;

    await profileDetails.save();

    // Optionally return updated user with profile
    const updatedUser = await User.findById(userId).populate("additionaldetail");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


exports.deleteaccount = async (req, res) => {
  try {
    const userId = req.user.id;

    // ✅ Find the user
    const user = await User.findById(userId).populate("additionaldetail");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const email = user.email;
    const userName = user.firstname || "User";

    // ✅ Remove user from enrolled courses
    const enrolledCourses = user.courses;
    if (enrolledCourses && enrolledCourses.length > 0) {
      for (const courseId of enrolledCourses) {
        await Course.findByIdAndUpdate(courseId, {
          $pull: { studentsEnrolled: userId },
        });
      }
    }

    // ✅ Delete Profile
    if (user.additionaldetail) {
      await Profile.findByIdAndDelete(user.additionaldetail._id);
    }

    // ✅ Delete User
    await User.findByIdAndDelete(userId);

    // ✅ Send email notification
    try {
  const { title, body } = accountDeletionEmail({
    name: user.firstname,
    supportLink: "https://hardiknotion.com/support"
  });

  await mailSender(user.email, title, body);
} catch (emailError) {
  console.error("Error sending account deletion email:", emailError);
}

    return res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    console.error("Delete Account Error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

exports.getalluserdetail = async (req, res) => {
  try {
    const id = req.user.id;

    const userdetail = await User.findById(id)
      .populate("additionaldetail")
      .exec();

    return res.status(200).json({
      success: true,
      message: "user data fetch",
      userdetail,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.updateProfileImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ success: false, message: "No image file uploaded" });
    }

    const file = req.files.image;

    // Upload to Cloudinary
    const uploadedImage = await uploadToCloudinary(file, "profile-images");

    // Update DB
    const userId = req.user.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: uploadedImage.secure_url },
      { new: true }
    );

    return res.status(200).json({
  success: true,
  message: "Image uploaded successfully",
  url: updatedUser.image,  // ✅ Add this
  data: updatedUser,
});

  } catch (error) {
    console.error("Update Image Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// controllers/courseController.js

exports.getenrolledcourse = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Find the user & populate courses → sections → subsections
    let user = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "coursecontent",        // matches Course model key
          populate: { path: "subsection" },
        },
      })
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User not found with id: ${userId}`,
      });
    }

    const courses = user.toObject().courses;

    // 2️⃣ For each enrolled course compute duration & completion %
    for (const course of courses) {
      let totalSeconds = 0;
      let totalSubsections = 0;

      for (const sec of course.coursecontent) {
        totalSeconds += sec.subsection.reduce(
          (acc, sub) => acc + parseInt(sub.timeduration || 0, 10),
          0
        );
        totalSubsections += sec.subsection.length;
      }

      course.totalDuration = convertSecondsToDuration(totalSeconds);

      // find the student’s progress document
      const progress = await CourseProgress.findOne({
        courseId: course._id,
        userId,
      }).lean();

      const completedCount = progress ? progress.completedVideos.length : 0;

      course.progressPercentage =
        totalSubsections === 0
          ? 100
          : Math.round((completedCount / totalSubsections) * 10000) / 100;

      // ✅ include completed video ids so frontend checkboxes can default to checked
      course.completedVideos = progress ? progress.completedVideos : [];
    }

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (err) {
    console.error("getEnrolledCourses error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.instructordashboard=async(req,res)=>{
  try{
    const coursedetails=await Course.find({instructor:req.user.id});

    const coursedata=coursedetails.map((course)=>{
      const totalstudentenrolled=course.studentenrolled.length
      const totalamountgernerated=totalstudentenrolled*course.price

      const coursedatawithstatus={
        _id:course._id,
        coursename:course.coursename,
        coursedesc:course.coursedescription,
        totalstudentenrolled,
        totalamountgernerated,
      }
      return coursedatawithstatus
    })
    res.status(200).json({
      courses:coursedata
    });

  }catch(error){
    console.error(error);
    res.status(500).json({
      message:"internal server error"
    });
  }
}



