const Project = require("../models/projectModel");
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const triggerWebhook = require('../utils/triggerWebhook');



//Adding Project
exports.createProject = async function (req, res) {
  try {
      const { projectName, clientContact } = req.body;

      if (!projectName || !clientContact?.email) {
          return res.status(400).json({ message: "Project name and client email are required" });
      }

      const existingProject = await Project.findOne({ projectName });
      if (existingProject) {
          return res.status(400).json({ message: "Project name already exists. Please choose a different name." });
      }

      const existingEmail = await Project.findOne({ "clientContact.email": clientContact.email });
      if (existingEmail) {
          return res.status(400).json({ message: "Client email is already associated with another project." });
      }

      const newProject = new Project({ ...req.body, status: 'Term Sheet / Pre-Approval Pending' });
      await newProject.save();
      await triggerWebhook(newProject._id, 'projectCreated', {
        projectName: newProject.projectName,
        createdBy: newProject.clientContact?.email,
        timestamp: new Date()
      });
      res.status(201).json({ message: "Project saved successfully", newProject });
  } catch (error) {
      console.error("Error saving project:", error);
      res.status(500).json({ message: "Error saving project", error: error.message });
  }
};
exports.updateProjectStatus = async (req, res) => {
  try {
      const { id, action } = req.body;

      const project = await Project.findById(id);
      if (!project) {
          return res.status(404).json({ message: "Project not found" });
      }

      switch (action) {
          case 'issueTermSheet':
              project.status = 'Term Sheet / Pre-Approval Issued';
              break;
          case 'submitFullPackage':
              project.status = 'Full Package Submitted';
              break;
          case 'validate':
              project.status = 'Validation Phase';
              break;
          case 'finalizeDrawSchedule':
              project.status = 'Draw Schedule Finalized';
              break;
          case 'releaseFunds':
              project.status = 'Funding Released / Project Mobilized';
              break;
          default:
              return res.status(400).json({ message: "Invalid action" });
      }

      await project.save();
      await triggerWebhook(project._id, 'projectStatusUpdated', {
        newStatus,
        updatedAt: new Date(),
        updatedBy: req.user?.id || 'system'
      });
      res.status(200).json({ message: "Project status updated successfully", project });
  } catch (error) {
      console.error("Error updating project status:", error);
      res.status(500).json({ message: "Internal Server Error", error });
  }
};
// Get all projects
exports.getAllProjects = async function (req, res) {
  try {
    const projects = await Project.find(); // Fetch all projects from DB
    const totalLeads = projects.length; // Count total projects (leads)

    res.status(200).json({ totalLeads, projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects", error: error.message });
  }
};
exports.getProjectMetrics = async function (req, res) {
  try {
      const projects = await Project.find();
      const totalRevenueBooked = projects.reduce((acc, project) => acc + (project.systemInfo.ppaRate * project.systemInfo.systemSizeKW), 0);
      const totalCapacityMW = projects.reduce((acc, project) => acc + project.systemInfo.systemSizeKW, 0) / 1000;

      const residentialProjects = projects.filter(project => project.type === 'Residential');
      const commercialProjects = projects.filter(project => project.type === 'Commercial');

      res.status(200).json({
          totalLeads: projects.length,
          totalRevenueBooked,
          totalCapacityMW,
          residential: {
              count: residentialProjects.length,
              revenue: residentialProjects.reduce((acc, proj) => acc + (proj.systemInfo.ppaRate * proj.systemInfo.systemSizeKW), 0)
          },
          commercial: {
              count: commercialProjects.length,
              revenue: commercialProjects.reduce((acc, proj) => acc + (proj.systemInfo.ppaRate * proj.systemInfo.systemSizeKW), 0)
          },
          projects
      });
  } catch (error) {
      console.error("Error fetching project metrics:", error);
      res.status(500).json({ message: "Error fetching project metrics", error: error.message });
  }
};

// Get project by ID
exports.getProjectById = async function (req, res) {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error });
  }
};

// Update project
exports.updateProject = async function (req, res) {
  try {
    const { id } = req.params;
    const { clientContact } = req.body;

    // First, find the project being updated
    const projectToUpdate = await Project.findById(id);
    if (!projectToUpdate) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the client email is being updated
    if (clientContact && clientContact.email) {
      // If the email is different from the existing one, perform the check
      if (clientContact.email !== projectToUpdate.clientContact.email) {
        const existingEmail = await Project.findOne({
          "clientContact.email": clientContact.email, _id: { $ne: id }
        });

        if (existingEmail) {
          return res.status(400).json({ message: "Client email is already associated with another project." });
        }
      }
    }

    // Proceed to update the project
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    await triggerWebhook(updatedProject._id, 'projectUpdated', {
      updatedFields: req.body,
      updatedAt: new Date(),
      updatedBy: req.user?.id || 'system'
    });

    res.status(200).json({ message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error: error.message });
  }
};


//Upload CSV
exports.uploadCSV = async function (req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = path.join(__dirname, '../../uploads/', req.file.filename);

  // Ensure file exists before reading
  if (!fs.existsSync(filePath)) {
    return res.status(500).json({ message: 'File not found, please try again.' });
  }

  const projects = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      projects.push({
        projectName: row.projectName || row["Project Name"],
        address: row.address || row["Address"],
        title: row.title || row["Title"],
        clientContact: {
          name: row.clientName || row["Client Name"],
          number: row.clientNumber || row["Client Number"],
          email: row.clientEmail || row["Client Email"]
        },
        poc: {
          name: row.pocName || row["POC Name"],
          number: row.pocNumber || row["POC Number"],
          email: row.pocEmail || row["POC Email"]
        },
        epc: {
          name: row.epcName || row["EPC Name"],
          insurance: row.epcInsurance || row["EPC Insurance"],
          license: row.epcLicense || row["EPC License"]
        },
        systemInfo: {
          currentRate: parseFloat(row.currentRate || row["Current Rate"]) || 0,
          ppaRate: parseFloat(row.ppaRate || row["PPA Rate"]) || 0,
          recValue: parseFloat(row.recValue || row["REC Value"]) || 0,
          epcInstall: parseFloat(row.epcInstall || row["EPC Install"]) || 0,
          systemProduction: parseFloat(row.systemProduction || row["System Production"]) || 0,
          systemSizeKW: parseFloat(row.systemSizeKW || row["System Size (KW)"]) || 0,
          ppaTerm: parseFloat(row.ppaTerm || row["PPA Term"]) || 0,
          escalator: parseFloat(row.escalator || row["Escalator"]) || 0
        },
        status: determineNextPhase(row),
        submissionStatus: 'Pending',
      });
    })
    .on('end', async () => {
      try {
        await Project.insertMany(projects);
        fs.unlinkSync(filePath); // Delete CSV file after processing
        res.status(200).json({ message: 'CSV data uploaded successfully', insertedCount: projects.length });
      } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ message: 'Error saving data' });
      }
    })
    .on('error', (error) => {
      console.error('CSV Processing Error:', error);
      res.status(500).json({ message: 'Error processing CSV file' });
    });
};




//Update-Steps
exports.updateProjectStep = async (req, res) => {
  try {
    const { id, action } = req.body;

    const project = await Project.findById(id);
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }

    switch (action) {
        case 'issueTermSheet':
            if (project.status === 'Term Sheet / Pre-Approval Pending') {
                project.status = 'Term Sheet / Pre-Approval Issued';
            }
            break;
        case 'submitFullPackage':
            if (project.status === 'Term Sheet / Pre-Approval Issued') {
                project.status = 'Full Package Submitted';
            }
            break;
        case 'validate':
            if (project.status === 'Full Package Submitted') {
                project.status = 'Validation Phase';
            }
            break;
        case 'finalizeDrawSchedule':
            if (project.status === 'Validation Phase') {
                project.status = 'Draw Schedule Finalized';
            }
            break;
        case 'releaseFunds':
            if (project.status === 'Draw Schedule Finalized') {
                project.status = 'Funding Released / Project Mobilized';
            }
            break;
        default:
            return res.status(400).json({ message: "Invalid action" });
    }

    await project.save();
    res.status(200).json({ message: "Project status updated successfully", project });
} catch (error) {
    console.error("Error updating project status:", error);
    res.status(500).json({ message: "Internal Server Error", error });
}
};


//Update Steps after funded project
exports.updateSteps = async (req, res) => {
  try {
    const { step } = req.body;
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    project.currentStep = step; // Update active step in DB
    await project.save();

    res.json({ success: true, message: "Step updated successfully", project });
  } catch (error) {
    console.error("Error updating step:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Add Task to a Project
exports.addTaskToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, dueDate, assignedTo } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: "Missing required task details: title, description, and due date." });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const task = { title, description, dueDate, status: 'Pending', assignedTo };
    project.tasks.push(task);
    await project.save();

    res.status(201).json({ message: "Task added successfully", project });
  } catch (error) {
    console.error("Error adding task to project:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Update Task in a Project
exports.updateTaskInProject = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const { title, description, dueDate, status, assignedTo } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const task = project.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    // Update task details
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;
    task.assignedTo = assignedTo || task.assignedTo;
    
    await project.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task in project:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
function determineNextPhase(row)
{
  if (row.termSheetIssued === 'true' && row.fullPackageSubmitted !== 'true')
  {
      return 'Term Sheet / Pre-Approval Issued';
  }
  if (row.fullPackageSubmitted === 'true' && row.validationComplete !== 'true')
  {
      return 'Full Package Submitted';
  }
  if (row.validationComplete === 'true' && row.drawScheduleFinalized !== 'true')
  {
      return 'Validation Phase';
  }
  if (row.drawScheduleFinalized === 'true' && row.fundsReleased !== 'true')
  {
      return 'Draw Schedule Finalized';
  }
  if (row.fundsReleased === 'true')
  {
      return 'Funding Released / Project Mobilized';
  }
  return 'Term Sheet / Pre-Approval Pending';
}

exports.getDashboardSummary = async (req, res) => {
  try {
    const userId = req.session.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No session user" });
    }

    const projects = await Project.find({
      $or: [
        { "clientContact.id": userId },
        { "tasks.assignedTo": userId },
      ]
    });

    const requiredDocs = [
      "Last 12 Bills", "Design (Helioscope/ETB)", "Property Title and Tax Bill",
      "Bylaws", "3-year Financials", "Mortgage Statement", "Proof of High-Speed Internet",
      "Proof of Title", "Articles of Incorporation", "Government ID of Signors",
      "EPC SOQ & Contract"
    ];

    let totalProjects = projects.length;
    let totalTasks = 0;
    let completedTasks = 0;
    let pendingTasks = 0;
    let outstandingDocuments = 0;
    let recentMilestones = [];

    for (const project of projects) {
      const tasks = (project.tasks || []).filter(t => t.assignedTo?.toString() === userId);
      totalTasks += tasks.length;
      completedTasks += tasks.filter(t => t.status === 'Completed').length;
      pendingTasks += tasks.filter(t => t.status !== 'Completed').length;

      const uploaded = Object.keys(project.uploadedFiles || {});
      const missing = requiredDocs.filter(doc => !uploaded.includes(doc));
      if (missing.length > 0) {
        outstandingDocuments += 1;
      }

      recentMilestones.push({
        projectId: project._id,
        projectName: project.projectName,
        status: project.status,
        currentStep: project.currentStep || null,
        updatedAt: project.updatedAt || project.createdAt
      });
    }

    res.status(200).json({
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      outstandingDocuments,
      recentMilestones: recentMilestones.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5)
    });

  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};