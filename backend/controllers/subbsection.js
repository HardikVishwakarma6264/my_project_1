const Section = require("../models/Section");
const Subsection = require("../models/Subsection");
const {uploadToCloudinary} = require("../utils/imageuploder");
const fs = require("fs");




exports.createsubsection = async (req, res) => {
  try {
    const { sectionid, title, timeduration, description } = req.body;
    const video = req.files?.video;

    if (!sectionid || !timeduration || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    console.log("Uploading video:", video.name);

    // ✅ File size check (50 MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (video.size > MAX_SIZE) {
      return res.status(413).json({
        success: false,
        message: "Video size exceeds 50MB limit",
      });
    }

    // ✅ Supported formats
    const supportedFormats = ["mp4", "mov", "avi", "mkv"];
    const fileType = video.name.split(".").pop().toLowerCase();
    if (!supportedFormats.includes(fileType)) {
      return res.status(415).json({
        success: false,
        message: "Unsupported video format",
      });
    }

    // ✅ Upload video to Cloudinary
    const uploadResult = await uploadToCloudinary(video, process.env.FOLDER_NAME, "video");
    console.log("Cloudinary URL:", uploadResult.secure_url);

    // ✅ Create subsection
    const subsectionDetail = await Subsection.create({
      title,
      timeduration,
      description,
      videourl: uploadResult.secure_url,
    });

    // ✅ Update section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionid,
      { $push: { subsection: subsectionDetail._id } },
      { new: true }
    ).populate("subsection");

    return res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      updatedSection,
    });
  } catch (error) {
    console.error("Error creating subsection:", error);
    return res.status(500).json({
      success: false,
      message: "Section could not be created. Try again!",
      error: error.message,
    });
  }
};


exports.updateSubsection = async (req, res) => {
  try {
    const { subsectionid, title, timeduration, description } = req.body;
    const video = req.files?.videofile; // optional video

    if (!subsectionid) {
      return res.status(400).json({
        success: false,
        message: "Please provide subsection id",
      });
    }

    // Find the subsection
    const subsection = await Subsection.findById(subsectionid);
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    // Update fields
    if (title) subsection.title = title;
    if (timeduration) subsection.timeduration = timeduration;
    if (description) subsection.description = description;

    // If new video uploaded, update cloudinary
    // If new video uploaded, update cloudinary
if (video) {
  const uploadDetail = await uploadToCloudinary(
    video,
    process.env.FOLDER_NAME,
    "video"    // 👈 important
  );
  subsection.videourl = uploadDetail.secure_url;
}


    await subsection.save();

    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      subsection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while updating subsection",
    });
  }
};

exports.deleteSubsection = async (req, res) => {
  try {
    const { subsectionid, sectionid } = req.body;

    if (!subsectionid || !sectionid) {
      return res.status(400).json({
        success: false,
        message: "Please provide subsection id and section id",
      });
    }

    // 1. Delete subsection
    const deletedSubsection = await Subsection.findByIdAndDelete(subsectionid);
    if (!deletedSubsection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    // 2. Remove its reference from Section
    const updatedsection = await Section.findByIdAndUpdate(
      sectionid,
      { $pull: { subsection: subsectionid } },
      { new: true }
    ).populate("subsection");

    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: updatedsection,   // ✅ yaha `data` key use karo
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while deleting subsection",
    });
  }
};

