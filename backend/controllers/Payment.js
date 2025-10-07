const mongoose = require("mongoose");
const { instance } = require("../config/razorrpay");
const Course = require("../models/Course");
const User = require("../models/User");
const crypto = require("crypto");
const CourseProgress=require("../models/Courseprogress");

const coursePurchaseTemplate = require("../mail/coursePurchaseTemplate");
const mailSender = require("../utils/mailsender");
const paymentSuccessTemplate=require("../mail/paymentSuccessTemplate");

// -------------------- CAPTURE PAYMENT --------------------
exports.capturepayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userid = req.user.id;

    if (!courses || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide course id(s)",
      });
    }

    let totalamount = 0;

    for (const course_id of courses) {
      const course = await Course.findById(course_id);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: `Course not found: ${course_id}`,
        });
      }

      const uid = new mongoose.Types.ObjectId(userid);
      if (course.studentenrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: `Already enrolled in ${course.coursename}`,
        });
      }

      totalamount += course.price;
    }

    const option = {
      amount: totalamount * 100, // in paise
      currency: "INR",
      receipt: Date.now().toString(),
    };

    const paymentresponse = await instance.orders.create(option);

    return res.json({
      success: true,
      order: paymentresponse,
    });
  } catch (error) {
    console.error("❌ Capture Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate order, try again!",
    });
  }
};

// -------------------- VERIFY PAYMENT --------------------
exports.verifypayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
    } = req.body;
    const userid = req.user.id;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userid
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed: missing fields",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectsignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectsignature === razorpay_signature) {
      await enrollstudent(courses, userid,res);
      return res.status(200).json({
        success: true,
        message: "Payment verified & enrollment successful",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment signature mismatch",
      });
    }
  } catch (error) {
    console.error("❌ Verify Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during payment verification",
    });
  }
};

// -------------------- ENROLL STUDENT --------------------
const enrollstudent = async (courses, userid,res) => {
  try {
    for (const courseid of courses) {
      const enrolledcourse = await Course.findOneAndUpdate(
        { _id: courseid },
        { $push: { studentenrolled: userid } },
        { new: true }
      );

      if (!enrolledcourse) {
        console.warn(`⚠️ Course not found: ${courseid}`);
        continue;
      }

      const progress = await CourseProgress.create({
  courseId: courseid,
  userId: userid,
  completedVideos: [], // ✅
});


      const enrolledStudent = await User.findByIdAndUpdate(
        userid,
        { $push: { courses: courseid ,
          courseprogress: progress._id,
         } },
        { new: true }
      );

      if (!enrolledStudent) {
        console.warn(`⚠️ User not found: ${userid}`);
        continue;
      }

      // Send Email
      const { title, body } = coursePurchaseTemplate(
        enrolledStudent.firstname,
        enrolledcourse.coursename
      );

      try {
        const emailresponses = await mailSender(
          enrolledStudent.email,
          title,
          body
        );
        console.log("✅ Email sent successfully:", emailresponses?.messageId);
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError.message);
      }
    }
  } catch (error) {
    console.error("❌ Enrollment Error:", error);
    throw new Error(error.message);
  }
};


exports.sendpaymentsuccessmail = async (req, res) => {
  try {
console.log("📩 Incoming Email Request:", req.body, "USER:", req.user);

    const { orderid, paymentid, amount } = req.body;
    const userid = req.user?.id;

    if (!orderid || !paymentid || !amount || !userid) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields for sending email",
      });
    }

    const enrolledStudent = await User.findById(userid);
    if (!enrolledStudent) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate email template
    const { title, body } = paymentSuccessTemplate(
      enrolledStudent.firstname,
      amount / 100, // paise → rupees
      orderid,
      paymentid
    );

    // Send email
    const emailResponse = await mailSender(enrolledStudent.email, title, body);
    console.log("✅ Payment Email sent:", emailResponse?.messageId);

    return res.status(200).json({
      success: true,
      message: "Payment success email sent",
    });
  } catch (err) {
    console.error("❌ Payment Email sending failed:", err.message);
    return res.status(500).json({
      success: false,
      message: "Could not send payment email",
    });
  }
};
