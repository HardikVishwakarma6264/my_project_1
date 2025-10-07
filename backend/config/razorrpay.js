const Razorpay = require("razorpay");

exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,       // ✅ backend .env me jo likha hai
  key_secret: process.env.RAZORPAY_SECRET,
});
