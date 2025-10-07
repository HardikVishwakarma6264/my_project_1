const passwordreset = require("../mail/passwordreset");
const User = require("../models/User");
const mailsender = require("../utils/mailsender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");

exports.resetpassswordtoken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not exist , try another email !",
      });
    }

    const token = crypto.randomUUID();

    const updatedetail = await User.findOneAndUpdate(
      { email },
      { token: token, resetpasswordexpire: Date.now() + 5*60*1000 },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    const { title, body } = passwordreset({
      name: user.firstname,
      resetLink: url,
      expiresInMinutes: 5,
    });

    await mailsender(email, title, body);

    return res.json({
      success: true,
      message:
        "email send successfully, please check email and change password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong, while reset password and send mail",
    });
  }
};

exports.resetpassword = async (req, res) => {
  try {
    const { password, confirmpassword, token } = req.body;

    if (password != confirmpassword) {
      return res.json({
        success: false,
        message: "password not matching",
      });
    }

    const userdetail = await User.findOne({ token });

    if (!userdetail) {
      return res.json({
        success: false,
        message: "token is missing",
      });
    }

    if (!userdetail.resetpasswordexpire || userdetail.resetpasswordexpire < Date.now()) {
      return res.json({
        success: false,
        message: "token is expire, please regenerate token !",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "password not updated, something went wrong !",
    });
  }
};
