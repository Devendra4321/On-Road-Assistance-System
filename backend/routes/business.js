const { Business } = require("../models/business");
const express = require("express");
const router = express.Router();
const auth = require("../helpers/jwt");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

// name description mechanicname service available  locality address city mobile

router.get(`/`, async (req, res) => {
  const businessList = await Business.find();

  if (!businessList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(businessList);
});

router.get(`/:id`, async (req, res) => {
  const businessList = await Business.findById(req.params.id);

  if (!businessList) {
    res.status(500).json({ success: false });
  }
  res.send(businessList);
});

router.post("/", upload.single("image"), async (req, res) => {
  let business = new Business({
    vendoremail: req.body.vendoremail,
    name: req.body.name,
    mechanicname: req.body.mechanicname,
    service: req.body.service,
    available: req.body.available,
    locality: req.body.locality,
    address: req.body.address,
    city: req.body.city,
    mobile: req.body.mobile,
    status: req.body.status,
  });
  business = await business.save();

  if (!business) return res.status(400).send("the business cannot be created!");
  res.send(business);
});

router.post("/upload/:id", upload.single("image"), async (req, res) => {
  if (req.file) {
    let url = req.file.path;
    let filename = req.file.originalname;
    let business = await Business.findById(req.params.id);

    business.image = { url, filename };
    business.save();

    res.status(200).json({
      message: "Image uploaded successfully",
      url: req.file.path,
    });
  } else {
    res.status(400).json({
      message: "Failed to upload image",
    });
  }
});

router.delete("/:id", auth, (req, res) => {
  Business.findByIdAndRemove(req.params.id)
    .then((business) => {
      if (business) {
        return res
          .status(200)
          .json({ success: true, message: "the business is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "business not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.put("/:id", async (req, res) => {
  const business = await Business.findByIdAndUpdate(
    req.params.id,
    {
      vendoremail: req.body.vendoremail,
      name: req.body.name,
      mechanicname: req.body.mechanicname,
      service: req.body.service,
      available: req.body.available,
      locality: req.body.locality,
      address: req.body.address,
      city: req.body.city,
      mobile: req.body.mobile,
    },
    { new: true }
  );

  if (!business) return res.status(400).send("the business cannot be created!");

  res.send(business);
});

router.put("/map/:id", async (req, res) => {
  const business = await Business.findByIdAndUpdate(
    req.params.id,
    {
      lat: req.body.lat,
      long: req.body.long,
    },
    { new: true }
  );

  if (!business) return res.status(400).send("the business cannot be created!");

  res.send(business);
});

router.put("/status/:id", auth, async (req, res) => {
  const business = await Business.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!business) return res.status(400).send("the business cannot be created!");

  res.send(business);
});

module.exports = router;
