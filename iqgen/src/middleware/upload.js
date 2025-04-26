const multer = require("multer");
const path = require("path");

// Set Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save in 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with timestamp
    const uniqueName = `${Date.now()}.png`;
    cb(null, uniqueName);
  }
});

// File Filter - Only Allow Images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, and PNG files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
