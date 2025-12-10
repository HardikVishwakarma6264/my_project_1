const Course = require("../models/Course");
const Tag = require("../models/categoryy");
const User = require("../models/User");
const {uploadToCloudinary} = require("../utils/imageuploder");
const CourseProgress = require("../models/Courseprogress");
const SubSection=require("../models/Subsection");






exports.updatecourseprogress = async (req, res) => {
  const { courseId, subsectionId } = req.body;
  const userId = req.user.id;

  try {
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({ success: false, message: "Invalid subsection" });
    }

    let courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      return res.status(404).json({ success: false, message: "Course progress does not exist" });
    }

    // total lectures count
    const course = await Course.findById(courseId).populate("coursecontent.subsection");
    const totalLectures = course.coursecontent.reduce(
      (acc, sec) => acc + (sec.subsection?.length || 0),
      0
    );

    // if already completed
    if (courseProgress.completedVideos.includes(subsectionId)) {
      const percent = Math.round((courseProgress.completedVideos.length / totalLectures) * 100);
      return res.status(200).json({
        success: true,
        alreadyCompleted: true,
        message: "Subsection already marked as completed",
        progressPercentage: percent,
        data: courseProgress,
      });
    }

    // add new completion
    courseProgress.completedVideos.push(subsectionId);
    await courseProgress.save();

    const percent = Math.round((courseProgress.completedVideos.length / totalLectures) * 100);

    return res.status(200).json({
      success: true,
      alreadyCompleted: false,
      message: "Lecture marked as completed",
      progressPercentage: percent,
      data: courseProgress,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};




exports.createcourse = async (req, res) => {
  try {
    const {
      coursename,
      coursedescription,
      whatwillyoulearn,
      price,
      tag,
      category,
      status,
      instruction,
    } = req.body;

    const thumbnail = req.files.thumbnail;

    if (
      !coursename ||
      !coursedescription ||
      !whatwillyoulearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "all field are required",
      });
    }

    const userid = req.user.id;

    // instructor user h yaha pe
    const instructordetail = await User.findById(userid);
    // console.log("instructordetail:", instructordetail);

    if (!instructordetail) {
      return res.status(404).json({
        success: false,
        message: "instructor detail not found",
      });
    }

    const categorydetail = await Tag.findById(category);
    if (!categorydetail) {
      return res.status(404).json({
        success: false,
        message: "category detail not found",
      });
    }

    const thumbnailimage = await uploadToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newcourse = await Course.create({
      coursename,
      coursedescription,
      instructor: instructordetail._id,
      whatwillyoulearn: whatwillyoulearn,
      price,
      tag: tag,
      thumbnail: thumbnailimage.secure_url,
      category: categorydetail._id,
      status,
      instruction,
    });

    //addnew course to user schema

    await User.findByIdAndUpdate(
      {
        _id: instructordetail._id,
      },
      {
        $push: {
          courses: newcourse._id,
        },
      },
      { new: true }
    );

    //update the tag ka schema

    await Tag.findByIdAndUpdate(
      category,
      {
        $push: {
          course: newcourse._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "course created successfully",
      data: newcourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "course does not created",
    });
  }
};

exports.showallcourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        coursename: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingandreviews: true,
        studentsenrolled: true,
      }
    )
      .populate("instructor") // instructor ka pura object laane ke liye
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

exports.getcoursedetail = async (req, res) => {
  try {
    const { courseId } = req.body;

    const coursedetail = await Course.findById(courseId)
      .populate({ path: "instructor", populate: { path: "additionaldetail" } })
      .populate("category")
      .populate("ratingandreview")
      .populate({ path: "coursecontent", populate: { path: "subsection" } })
      .exec();

    if (!coursedetail) {
      return res.status(400).json({
        success: false,
        message: `couls not find the course with ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "course data fetch successfuy",
      data: coursedetail,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.accesscoursedetail = async (req, res) => {
  try {
    const { courseid } = req.params;

    const coursedetail = await Course.findById(courseid)
      .populate({ path: "instructor", populate: { path: "additionaldetail" } })
      .populate("category")
      .populate("ratingandreview")
      .populate({ path: "coursecontent", populate: { path: "subsection" } })
      .exec();

    if (!coursedetail) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ID ${courseid}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course data fetched successfully",
      data: coursedetail,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const instructorCourses = await Course.find({ instructor: instructorId })
      .populate("category")
      .populate({
        path: "coursecontent",
        populate: {
          path: "subsection",
          select: "timeduration",
        },
      })
      // ⭐ populate ratings here
      .populate({
        path: "ratingandreview",
        select: "rating review user", // include any fields you need
      })
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Instructor courses fetched successfully",
      data: instructorCourses,
    });
  } catch (error) {
    console.error("Error fetching instructor courses:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch instructor courses",
    });
  }
};






exports.editCourse = async (req, res) => {
  try {
    const { courseid } = req.body;  // ✅ frontend se formData me "courseid" aa rha hai
    if (!courseid) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Course find karo
    const course = await Course.findById(courseid);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // ✅ Thumbnail update agar file aayi ho
    if (req.files && req.files.thumbnail) {
      const thumbnail = req.files.thumbnail;
      const uploadedImage = await uploadToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = uploadedImage.secure_url;
    }

    // ✅ Fields update karne ke liye allowed fields
    const updatableFields = [
      "coursename",
      "coursedescription",
      "whatwillyoulearn",
      "price",
      "tag",
      "category",
      "instruction",
      "status",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        // JSON parse only if array/object field hota
        if (field === "tag" || field === "instruction") {
          try {
            course[field] = JSON.parse(req.body[field]);
          } catch (err) {
            course[field] = req.body[field]; // fallback string
          }
        } else {
          course[field] = req.body[field];
        }
      }
    });

    // Save updated course
    await course.save();

    // ✅ Populate karke bhejna (frontend ke liye complete data)
    const updatedCourse = await Course.findById(courseid)
      .populate({
        path: "instructor",
        populate: {
          path: "additionaldetail",
        },
      })
      .populate("category")
      .populate("ratingandreview")
      .populate({
        path: "coursecontent",
        populate: {
          path: "subsection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseid } = req.body;
    const userid = req.user.id;

    if (!courseid) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Find the course to delete
    const course = await Course.findById(courseid);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if the logged-in user is the instructor of this course
    if (course.instructor.toString() !== userid) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this course",
      });
    }

    // Delete the course
    await Course.findByIdAndDelete(courseid);

    // Remove course id from user's courses array
    await User.findByIdAndUpdate(userid, {
      $pull: { courses: courseid },
    });

    // Remove course id from tag's course array
    await Tag.findByIdAndUpdate(course.category, {
      $pull: { course: courseid },
    });

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
};

exports.getfulldetailofcourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // ✅ Fetch course details
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionaldetail" },
      })
      .populate("category")
      .populate("ratingandreview")
      .populate({
        path: "coursecontent",
        populate: { path: "subsection" },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Course not found with id: ${courseId}`,
      });
    }

    // ✅ Fetch user's progress for this course
    const courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });

    // ✅ Calculate total duration of all subsections
    let totalDurationInSeconds = 0;
    courseDetails.coursecontent.forEach((section) => {
      section.subsection.forEach((sub) => {
        const duration = parseInt(sub.timeduration);
        totalDurationInSeconds += isNaN(duration) ? 0 : duration;
      });
    });

    const convertSecondsToDuration = (totalSeconds) => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    };

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    // ✅ Send proper response
    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgress?.completedVideos || [], // ✅ array
      },
    });
  } catch (error) {
    console.error("Error in getFullCourseDetails:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching course details",
      error: error.message,
    });
  }
};







