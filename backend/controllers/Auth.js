const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/Otp");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailsender");
require("dotenv").config();
const Profile = require("../models/Profile");
const otpMailTemplate = require("../mail/loginotp");

const Passwordupdatemail = require("../mail/passwordupdate");

exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // check if user already exists
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(409).json({
        success: false,
        message: "User already registered",
      });
    }

    // generate OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    // console.log("OTP GENERATED ->", otp);

    // check uniqueness
    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }

    // save otp
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Saved:", otpBody);

    const { title, body } = otpMailTemplate(otp);
    const mailResponse=await mailSender(email, title, body);

    if (!mailResponse) {
  return res.status(500).json({
    success: false,
    message: "Failed to send OTP email. Please try again.",
  });
}
    // send response
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp: otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
      accounttype,
      contactnumber,
      otp,
    } = req.body;

    console.log("Received Body: ", req.body);
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !confirmpassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "all fiels are required",
      });
    }

    if (password != confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "password do not match !",
      });
    }

    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({
        success: false,
        message: "email already registered, try another email !",
      });
    }

    // Find most recent OTP stored for the user
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 }) // createdAt ko descending order me sort karo (latest OTP sabse pehle)
      .limit(1); // sirf ek hi OTP lao (latest wala)

    console.log(recentOtp);

    // Validate OTP
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP NOT Found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //hash password
    const hashpasword = await bcrypt.hash(password, 10);

    const profiledetail = await Profile.create({
      gender: null,
      dateofbirth: null,
      about: null,
      contactnumber: null,
    });

    const user = await User.create({
      firstname,
      lastname,
      email,
      contactnumber,
      password: hashpasword,
      additionaldetail: profiledetail._id,
      accounttype,
      image: `http://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname} `,
    });

    return res.status(200).json({
      success: true,
      message: "user registered successfulty",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user cannot registyerd , please try again !",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const user = await User.findOne({ email }).populate("additionaldetail");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please signup",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      accounttype: user.accounttype,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failed, please try again!",
    });
  }
};

exports.changepassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.id;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: "New password and confirm password do not match" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: "Old password is incorrect" });
    }

    if (await bcrypt.compare(newPassword, user.password)) {
      return res.status(400).json({ success: false, message: "New password cannot be same as old password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // const { title, body } = otpMailTemplate(otp);
    // await mailSender(email, title, body);

    try {
  const { title, body } = Passwordupdatemail(
    user.firstname,
    "Hardik Notion",
    "https://hardiknotion.com/support"
  );

  await mailSender(user.email, title, body);
} catch (emailError) {
  console.log("Email send failed:", emailError.message);
}




    return res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in change password:", error.message);
    return res.status(500).json({ success: false, message: "Password not changed, try again!" });
  }
};




