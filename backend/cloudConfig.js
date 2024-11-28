const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "OnRoadAssistanceSystem",
    allowredFormats: ["png", "jpg", "jpeg"],
    public_id: (req, file) => Date.now(), // Generate unique public IDs
  },
});

module.exports = {
  cloudinary,
  storage,
};
