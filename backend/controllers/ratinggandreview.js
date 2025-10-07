

const mongoose = require("mongoose");
const Ratingandreview = require("../models/Ratingandreview");
const Course = require("../models/Course");

exports.createrating = async (req, res) => {
  try {
    const userid = req.user.id; // fix: remove destructuring

    const { rating, review, courseId } = req.body;

    const coursedetail = await Course.findOne({
      _id: courseId,
      studentenrolled: { $elemMatch: { $eq: userid } }, // typo fix: $elematch → $elemMatch
    });

    if (!coursedetail) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in course",
      });
    }

    const alreadyreview = await Ratingandreview.findOne({
      user: userid,
      course: courseId,
    });

    if (alreadyreview) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a review for this course",
      });
    }

    const ratingreview = await Ratingandreview.create({
      rating,
      review,
      course: courseId,
      user: userid,
    });

    await Course.findByIdAndUpdate(
      courseId,
      { $push: { ratingandreview: ratingreview._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and review added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getaveragerating = async (req, res) => {
  try {
    const { courseId } = req.body; // fix: req.body.courseId → req.body

    const result = await Ratingandreview.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(courseId) } },
      {
        $group: {
          _id: null,
          averagerating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({ // fix typo: jsin → json
        success: true,
        averagerating: result[0].averagerating,
      });
    }

    return res.status(200).json({
      success: true,
      averagerating: 0,
      message: "No rating has been given yet",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getallratingandreview = async (req, res) => {
  try {
    const allreview = await Ratingandreview.find({})
      .sort({ rating: -1 })
      .populate({ path: "user", select: "firstname lastname email image" })
      .populate({ path: "course", select: "coursename" })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allreview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

