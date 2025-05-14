const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const fs = require("fs");

// Temporary store file on disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/";

    // Check if uploads folder already exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdir(uploadPath, { recursive: true }, (err) => {
        if (err) {
          return cb(err);
        }
        cb(null, uploadPath);
      });
    } else {
      cb(null, uploadPath);
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
exports.uploadFile = upload.single("file");

// Uploading to Cloudinary
exports.uploadFileToCloudinary = async (req, res) => {
  try {
    // No file uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });

    // Remove the file from the local server after uploading to Cloudinary
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: "File uploaded successfully",
      fileURL: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};