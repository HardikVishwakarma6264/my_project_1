const Section = require("../models/Section");
const Course = require("../models/Course");
const Subsection=require("../models/Subsection");

/* ===================================================
....   CREATE SECTION
=================================================== */
exports.createsection = async (req, res) => {
  try {
    const { sectionname, courseid } = req.body;

    if (!sectionname || !courseid) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    // 1. Create new section
    const newsection = await Section.create({ sectionname });

    // 2. Push section _id in course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseid,
      { $push: { coursecontent: newsection._id } }, // ✅ Correct key
      { new: true }
    )
      .populate({
        path: "coursecontent", // ✅ Correct key
        populate: { path: "subsection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Section created successfully",
    });
  } catch (error) {
    console.error("CREATE_SECTION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Section not created, try again!",
    });
  }
};


/* ===================================================
....   UPDATE SECTION
=================================================== */
exports.updatesection = async (req, res) => {
  try {
    const { sectionname, sectionid } = req.body;

    if (!sectionid || !sectionname) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    await Section.findByIdAndUpdate(
      sectionid,
      { sectionname },
      { new: true }
    );

    const course = await Course.findOne({ coursecontent: sectionid }) // find course containing this section
      .populate({
        path: "coursecontent",
        populate: { path: "subsection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      data: course,
      message: "Section updated successfully",
    });
  } catch (error) {
    console.error("UPDATE_SECTION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Section update failed",
    });
  }
};


exports.deletesection = async (req, res) => {
  try {
    const { sectionid, courseid } = req.body;

    if (!sectionid || !courseid) {
      return res.status(400).json({
        success: false,
        message: "Please provide section id and course id",
      });
    }

    // 1. Find the section first
    const section = await Section.findById(sectionid);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // 2. Delete all subsections inside this section
    await Subsection.deleteMany({ _id: { $in: section.subsection } });

    // 3. Delete the section itself
    await Section.findByIdAndDelete(sectionid);

    // 4. Remove section reference from Course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseid,
      { $pull: { coursecontent: sectionid } },
      { new: true }
    )
      .populate({
        path: "coursecontent",
        populate: { path: "subsection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section and its subsections deleted successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("DELETE_SECTION ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Section could not be deleted",
    });
  }
};


