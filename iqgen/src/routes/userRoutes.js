const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleLogin, facebookLogin, getUserDetails, getAllUsers, updateUserDetails, uploadProfileImage, forgotPassword, resetPassword } = require('../Controllers/userController');
const { createProject, getAllProjects, getProjectById, updateProject, uploadCSV, updateProjectStep, updateSteps, addTaskToProject, updateTaskInProject, getProjectMetrics } = require("../Controllers/projectController");
const { upload, uploadFileToS3 } = require('../Controllers/uploadController');
const uploads = require('../middleware/upload');
const Webhook = require('../models/Webhook');
const { listS3Files, deleteFileFromS3 } = require("../Controllers/s3Controller");
const { getDashboardSummary } = require('../Controllers/projectController');
router.post('/webhook', async (req, res) => {
    const { companyId, url, triggers } = req.body;
  
    try {
      let config = await Webhook.findOneAndUpdate(
        { companyId },
        { url, triggers },
        { new: true, upsert: true }
      );
      res.status(200).json({ success: true, config });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Server error' });
    }
});


//Login Route
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin)
router.post('/facebook-login', facebookLogin)

//Forgot Password
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


//User details
router.get("/detail", getUserDetails);
router.get("/users", getAllUsers);


//Create Projet Route
router.post("/create", createProject);
router.get("/projects", getAllProjects);
router.get("/projects/:id", getProjectById);
router.get("/projects/metrics", getProjectMetrics);
// Task management routes for projects
router.post("/projects/:projectId/tasks", addTaskToProject);
router.put("/projects/:projectId/tasks/:taskId", updateTaskInProject);
router.get('/dashboard-summary', getDashboardSummary);
//Update project
router.put("/projects-update/:id", updateProject);

// Upload files Route
router.post('/upload', upload.single('file'), uploadFileToS3);

//Upload CSV file
router.post('/upload-csv', upload.single('file'), uploadCSV);

//Update User
router.put("/update-user", updateUserDetails);

// Route to handle profile image upload
router.post('/upload-profile', uploads.single('profileImage'), uploadProfileImage);

//Get-S3-files
router.get("/get-s3-files", listS3Files);
router.delete("/delete-file", deleteFileFromS3);


//Update-Steps
router.put("/projects/:id/update-step", updateProjectStep);
router.put("/projects/:id/update-steps", updateSteps);










// Logout- Session
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.clearCookie("connect.sid"); // Clear session cookie
        res.status(200).json({ message: "Logged out successfully" });
    });
});



module.exports = router;
