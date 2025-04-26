const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
  },
  description: { 
    type: String,
    required: true
  },
  dueDate: { 
    type: Date,
    required: true
  },
  status: { 
    type: String,
    enum: ['Pending', 'InProgress', 'Completed'],
    default: 'Pending'
  },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
const ProjectSchema = new mongoose.Schema({
  projectName: String,
  address: String,
  title: String,
  companyName: 
  { 
    type: String, 
    required: true 
  }, 
  projectType: {
    type: String,
    enum: ['Residential', 'Commercial'],
    required: true
  },
  clientContact: {
    name: String,
    number: String,
    email: String,
  },
  poc: {
    name: String,
    number: String,
    email: String,
  },
  epc: {
    name: String,
    insurance: String,
    license: String,
  },
  systemInfo: {
    currentRate: Number,
    ppaRate: Number,
    recValue: Number,
    epcInstall: Number,
    systemProduction: Number,
    systemSizeKW: Number,
    ppaTerm: Number,
    escalator: Number,
  },
  uploadedFiles: {
    type: Object,
    default: {}
  },
  status: {
    type: String,
    enum: [
      'Term Sheet / Pre-Approval Pending', 
      'Term Sheet / Pre-Approval Issued', 
      'Full Package Submitted', 
      'Validation Phase', 
      'Draw Schedule Finalized', 
      'Funding Released / Project Mobilized'
    ],
    default: 'Term Sheet / Pre-Approval Pending'
  },
  submissionStatus: {
    type: String,
    enum: ["Pending", "Full"],
    default: "Pending"
  },

  activeStep: { type: Number, default: 1 },
  currentStep: { type: Number, default: 1 },
  fundedDate: { type: Date, default: null },
});

module.exports = mongoose.model("Project", ProjectSchema);






