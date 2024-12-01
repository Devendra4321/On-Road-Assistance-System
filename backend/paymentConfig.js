const Razorpay = require("razorpay");

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.ROZARPAY_ID,
  key_secret: process.env.ROZARPAY_SECRET,
});

module.exports = razorpay;