const AWS = require("aws-sdk");
require("dotenv").config();
const triggerWebhook = require('../utils/triggerWebhook');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


const listS3Files = async (req, res) => {
  try {
    const { projectID } = req.query;

    if (!projectID) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: `${projectID}/`,
    };

    const data = await s3.listObjectsV2(params).promise();

    const files = [];
    const folders = new Set(); // Using Set to avoid duplicate folder names

    data.Contents.forEach((item) => {
      const key = item.Key.replace(`${projectID}/`, ""); // Remove project ID from key
      if (!key) return; // Skip root folder itself

      if (key.endsWith("/")) {
        folders.add(key.slice(0, -1)); // Remove trailing slash and add folder name
      } else {
        files.push({
          name: key.split("/").pop(),
          folder: key.includes("/") ? key.split("/")[0] : "Root",
          fileType: key.split(".").pop(),
          lastModified: item.LastModified,
          size: item.Size,
          isFolder: false,
        });

        if (key.includes("/")) {
          folders.add(key.split("/")[0]); // Ensure the parent folder is added
        }
      }
    });

    res.json({ folders: Array.from(folders), files });
  } catch (error) {
    console.error("Error fetching S3 files:", error);
    res.status(500).json({ message: "Error fetching S3 files", error });
  }
};





// const listS3Files = async (req, res) => {
//   try {
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//     };

//     const data = await s3.listObjectsV2(params).promise();

//     const files = data.Contents.map((item) => ({
//       name: item.Key.split("/").pop(),
//       folder: item.Key.includes("/") ? item.Key.split("/")[0] : "Root",
//       fileType: item.Key.split(".").pop(),
//       lastModified: item.LastModified,
//       size: item.Size,
//       isFolder: item.Key.endsWith("/"),
//     }));

//     const folders = [...new Set(files.filter(f => f.isFolder).map(f => f.folder))];

//     res.json({ folders, files });
//   } catch (error) {
//     console.error("Error fetching S3 files:", error);
//     res.status(500).json({ message: "Error fetching S3 files", error });
//   }
// };






const deleteFileFromS3 = async (req, res) => {
  const { fileName, projectId, folder } = req.body; // Get file name and project ID

  if (!fileName || !projectId || !folder) {
    return res.status(400).json({ error: "File name and project ID are required" });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${projectId}/${folder}/${fileName}`, // Delete from the correct project folder
  };

  try {
    await s3.headObject(params).promise(); // Check if file exists
    await s3.deleteObject(params).promise(); // Delete file
    await triggerWebhook(projectId, 'fileDeleted', {
      fileName,
      folder,
      deletedBy: req.user?._id || 'System',
      timestamp: new Date(),
    });
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    if (error.code === "NotFound") {
      return res.status(404).json({ error: "File not found in S3 bucket" });
    }
    res.status(500).json({ error: "Failed to delete file", details: error.message });
  }
};



// const deleteFileFromS3 = async (req, res) => {
//   const { fileName } = req.body; // File name to delete
//   console.log(fileName);

//   if (!fileName) {
//     return res.status(400).json({ error: "File name is required" });
//   }

//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: `package/${fileName}`, // Assuming files are inside 'package' folder
//   };

//   try {
//     await s3.headObject(params).promise(); // Check if file exists
//     await s3.deleteObject(params).promise(); // Delete file
//     res.status(200).json({ message: "File deleted successfully" });
//   } catch (error) {
//     if (error.code === "Not Found") {
//       return res.status(404).json({ error: "File not found in S3 bucket" });
//     }
//     res.status(500).json({ error: "Failed to delete file", details: error.message });
//   }
// };

module.exports = { listS3Files, deleteFileFromS3 };










// const listS3Files = async (req, res) => {
//   try {
//     const { projectID } = req.query;

//     if (!projectID) {
//       return res.status(400).json({ message: "Project ID is required" });
//     }

//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Prefix: `${projectID}/`,
//     };

//     const data = await s3.listObjectsV2(params).promise();

//     const files = [];
//     const folders = new Set(); // Using Set to avoid duplicate folder names

//     data.Contents.forEach((item) => {
//       const key = item.Key.replace(`${projectID}/`, ""); // Remove project ID from key
//       if (!key) return; // Skip root folder itself

//       if (key.endsWith("/")) {
//         folders.add(key.slice(0, -1)); // Remove trailing slash and add folder name
//       } else {
//         files.push({
//           name: key.split("/").pop(),
//           folder: key.includes("/") ? key.split("/")[0] : "Root",
//           fileType: key.split(".").pop(),
//           lastModified: item.LastModified,
//           size: item.Size,
//           isFolder: false,
//         });

//         if (key.includes("/")) {
//           folders.add(key.split("/")[0]); // Ensure the parent folder is added
//         }
//       }
//     });

//     res.json({ folders: Array.from(folders), files });
//   } catch (error) {
//     console.error("Error fetching S3 files:", error);
//     res.status(500).json({ message: "Error fetching S3 files", error });
//   }
// };