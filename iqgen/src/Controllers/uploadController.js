const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const Project = require('../models/projectModel');
const triggerWebhook = require('../utils/triggerWebhook');
require('dotenv').config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({ dest: 'uploads/' });

const uploadFileToS3 = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const { projectId, fieldName } = req.body;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Invalid Project ID" });
    }

    const objectId = new mongoose.Types.ObjectId(projectId);
    const fileContent = fs.readFileSync(req.file.path);

    // ✅ Save file inside 'projectId/package/' folder
    const fileKey = `${projectId}/package/${Date.now()}_${req.file.originalname}`;

    // Upload file to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
        Body: fileContent,
        ContentType: req.file.mimetype,
      })
    );

    fs.unlinkSync(req.file.path);

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    // ✅ Update Project with uploaded file URL
    const updatedProject = await Project.findByIdAndUpdate(
      objectId,
      { $set: { [`uploadedFiles.${fieldName}`]: fileUrl } },
      { new: true, upsert: true }
    );

    // ✅ Fetch updated project data after saving the file
    const project = await Project.findById(objectId);

    // ✅ Required fields to check
    const requiredFields = [
      "Last 12 Bills",
      "Design (Helioscope/ETB)",
      "Property Title and Tax Bill",
      "Bylaws",
      "3-year Financials",
      "Mortgage Statement",
      "Proof of High-Speed Internet",
      "Proof of Title",
      "Articles of Incorporation",
      "Government ID of Signors",
      "EPC SOQ & Contract",
    ];

    const uploadedFiles = project.uploadedFiles || {}; // Ensure it exists
    const uploadedKeys = Object.keys(uploadedFiles);

    // ✅ Determine the submission status
    const submissionStatus = requiredFields.every((field) =>
      uploadedKeys.includes(field)
    )
      ? "Full"
      : "Pending";

    // ✅ Update submissionStatus and activeStep (if submissionStatus is "Full")
    const updateFields = { submissionStatus };
    if (submissionStatus === "Full") {
      updateFields.activeStep = 2; // Move to step 2
    }

    await Project.findByIdAndUpdate(objectId, updateFields);
    await triggerWebhook(projectId, 'fileUpload', {
      fileName: req.file.originalname,
      uploadedBy: req.user?._id || 'System',
      timestamp: new Date(),
      fieldName,
      fileUrl
    });
    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl,
      submissionStatus,
      activeStep: updateFields.activeStep || project.activeStep, // Send updated step in response
    });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    res.status(500).json({ error: "File upload failed" });
  }
};



module.exports = { upload, uploadFileToS3 };










// const uploadFileToS3 = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   try {
//     const { projectId, fieldName } = req.body;
//     if (!mongoose.Types.ObjectId.isValid(projectId)) {
//       return res.status(400).json({ error: 'Invalid Project ID' });
//     }

//     const objectId = new mongoose.Types.ObjectId(projectId);

//     const fileContent = fs.readFileSync(req.file.path);
    
//     // ✅ Save file inside 'projectId/package/' folder
//     const fileKey = `${projectId}/package/${Date.now()}_${req.file.originalname}`;

//     // Upload file to S3
//     await s3.send(new PutObjectCommand({
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: fileKey,
//       Body: fileContent,
//       ContentType: req.file.mimetype,
//     }));

//     fs.unlinkSync(req.file.path);

//     const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

//     // ✅ Update Project with uploaded file URL
//     const updatedProject = await Project.findByIdAndUpdate(
//       objectId,
//       { $set: { [`uploadedFiles.${fieldName}`]: fileUrl } },
//       { new: true, upsert: true } // Ensures it creates the field if missing
//     );

//     // ✅ Fetch updated project data after saving the file
//     const project = await Project.findById(objectId);

//     // ✅ Required fields to check
//     const requiredFields = [
//       "Last 12 Bills", "Design (Helioscope/ETB)", "Property Title and Tax Bill",
//       "Bylaws", "3-year Financials", "Mortgage Statement",
//       "Proof of High-Speed Internet", "Proof of Title",
//       "Articles of Incorporation", "Government ID of Signors",
//       "EPC SOQ & Contract"
//     ];

//     const uploadedFiles = project.uploadedFiles || {}; // Ensure it exists
//     const uploadedKeys = Object.keys(uploadedFiles);

//     // ✅ Set submissionStatus based on whether all files are uploaded
//     const submissionStatus = requiredFields.every(field => uploadedKeys.includes(field)) ? "Full" : "Pending";

//     await Project.findByIdAndUpdate(objectId, { submissionStatus });

//     res.status(200).json({ message: 'File uploaded successfully', fileUrl, submissionStatus });

//   } catch (error) {
//     console.error('Error uploading to S3:', error);
//     res.status(500).json({ error: 'File upload failed' });
//   }
// };


// module.exports = { upload, uploadFileToS3 };