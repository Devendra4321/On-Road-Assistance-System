const { Location } = require("../models/location");
const express = require("express");
const router = express.Router();
const auth = require("../helpers/jwt");
const razorpay = require("../paymentConfig.js");
const crypto = require("crypto");

// vendoremail  useremail  complaint mobile lat long status

router.get(`/`, async (req, res) => {
  const locationList = await Location.find();

  if (!locationList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(locationList);
});

router.get(`/:id`, async (req, res) => {
  const locationList = await Location.findById(req.params.id);
  if (!locationList) {
    res.status(500).json({ success: false });
  }
  res.send(locationList);
});

router.post("/", async (req, res) => {
  let location = new Location({
    vendoremail: req.body.vendoremail,
    useremail: req.body.useremail,
    complaint: req.body.complaint,
    mobile: req.body.mobile,
    lat: req.body.lat,
    long: req.body.long,
  });
  location.payableAmount = 100;
  location.paymentId = "";
  location = await location.save();

  if (!location) return res.status(400).send("the location cannot be created!");
  res.send(location);
});

router.put("/:id/status", async (req, res) => {
  const location = await Location.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!location) return res.status(400).send("the location cannot be created!");

  res.send(location);
});

router.put("/:id/paymentStatus", async (req, res) => {
  const location = await Location.findByIdAndUpdate(
    req.params.id,
    {
      paymentStatus: req.body.paymentStatus,
      paymentId: req.body.paymentId,
    },
    { new: true }
  );

  if (!location) return res.status(400).send("the location cannot be created!");

  res.send(location);
});

router.put("/map/:id", async (req, res) => {
  const location = await Location.findByIdAndUpdate(
    req.params.id,
    {
      lat: req.body.lat,
      long: req.body.long,
    },
    { new: true }
  );
  if (!location) return res.status(400).send("the business cannot be created!");

  res.send(location);
});

router.post("/paymentReceipt", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: Number(amount * 10),
    currency: "INR",
    receipt: `receipt# ${crypto.randomBytes(10).toString("hex")}`,
  };
  const order = await razorpay.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
});

router.post("/paymentVerify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.ROZARPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = generatedSignature === razorpay_signature;

  if (isAuthentic) {
    // res.status(200).json({ success: true, id: razorpay_payment_id });
    // res.redirect(
    //   `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
    // );
  } else {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
