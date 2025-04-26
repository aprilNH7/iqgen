import React, { useState, useRef } from 'react';
import { Box, TextField, Typography, IconButton, Button } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import axios from 'axios';




function FileUploadTextField({ label, onFileSelect }) {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

  const handleTextFieldClick = () => {
    inputRef.current.click();
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    onFileSelect(label, file);
  };

  return (
    <Box className="popup-field-uploadfiles">
      <TextField fullWidth label={label} value={fileName} InputProps={{ readOnly: true }} />
      <input ref={inputRef} type="file" style={{ display: 'none' }} onChange={handleInputChange} />
      <DriveFolderUploadIcon onClick={handleTextFieldClick} className='upload-icon-popupfornm' />
    </Box>
  );
}

const Formsubmission = ({ setPopopen, project, onUpdate }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    systemSize: '',
    ppw: '',
    files: {},
  });

  const handleFileSelect = (field, file) => {
    setFormData((prevData) => ({
      ...prevData,
      files: { ...prevData.files, [field]: file },
    }));
  };





  // const handleSave = async () => {
  //   setError("");

  //   const uploadUrls = {};
  //   const fileEntries = Object.entries(formData.files);

  //   if (fileEntries.length === 0) {
  //     setError('Please select at least one file to upload.');
  //     return;
  //   }

  //   try {
  //     let submissionStatus = "Pending";

  //     for (const [field, file] of fileEntries) {
  //       const formData = new FormData();
  //       formData.append('file', file);
  //       formData.append('fieldName', field);
  //       formData.append('projectId', project._id);

  //       const response = await axios.post('http://98.83.66.76:5002/api/upload', formData, {
  //         headers: { 'Content-Type': 'multipart/form-data' },
  //       });

  //       uploadUrls[field] = response.data.fileUrl;
  //       submissionStatus = response.data.submissionStatus;
  //     }

  //     // console.log('Uploaded File URLs:', uploadUrls);
  //     alert(`Files uploaded successfully`);
  //     setPopopen(false);
  //   } catch (error) {
  //     console.error('Error uploading files:', error);
  //     setError('File upload failed! Please try again.');
  //   }
  // };



  const handleSave = async () => {
    setError("");
    setSubmitting(true); // ✅ Show "Submitting..." in button
    const uploadUrls = {};
    const fileEntries = Object.entries(formData.files);

    if (fileEntries.length === 0) {
        setError("Please select at least one file to upload.");
        setSubmitting(false); // Reset submit button
        return;
    }

    try {
        let submissionStatus = "Pending"; // Default
        let activeStep = project.activeStep || 1; // Default step

        for (const [field, file] of fileEntries) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("fieldName", field);
            formData.append("projectId", project._id);

            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            uploadUrls[field] = response.data.fileUrl;
            submissionStatus = response.data.submissionStatus;
            activeStep = response.data.activeStep || activeStep;
        }

        onUpdate(); // Refresh data after upload
        alert(`Files uploaded successfully`);
        setPopopen(false);
    } catch (error) {
        console.error("Error uploading files:", error);
        setError("File upload failed! Please try again.");
    } finally {
        setSubmitting(false); // ✅ Re-enable button after upload
    }
};



  return (
    <Box className="popup-wrapper">
      <IconButton onClick={() => setPopopen(false)} className='closebutton'>
        <CloseOutlinedIcon />
      </IconButton>
      <Typography component="h2">Submission we need:</Typography>
      {/* Display Error Message at the Top in Red */}
      {error && <Typography sx={{ color: "red", fontSize: "16px", marginTop: "10px", marginBottom: "10px" }}>{error}</Typography>}

      {/* <Box className="popup-row-input">
        <TextField fullWidth label="System Size" value={formData.systemSize} onChange={(e) => setFormData({ ...formData, systemSize: e.target.value })} />
        <TextField fullWidth label="PPW" value={formData.ppw} onChange={(e) => setFormData({ ...formData, ppw: e.target.value })} />
      </Box> */}
      
      <Box className="popup-row-input">
        <FileUploadTextField label="Last 12 Bills" onFileSelect={handleFileSelect} />
        <FileUploadTextField label="Design (Helioscope/ETB)" onFileSelect={handleFileSelect} />
      </Box>
      <Box className="popup-row-input">
        <FileUploadTextField label="Property Title and Tax Bill" onFileSelect={handleFileSelect} />
        <FileUploadTextField label="Bylaws" onFileSelect={handleFileSelect} />
      </Box>
      <Box className="popup-row-input">
        <FileUploadTextField label="3-year Financials" onFileSelect={handleFileSelect} />
        <FileUploadTextField label="Mortgage Statement" onFileSelect={handleFileSelect} />
      </Box>
      <Box className="popup-row-input">
        <FileUploadTextField label="Proof of High-Speed Internet" onFileSelect={handleFileSelect} />
        <FileUploadTextField label="Proof of Title" onFileSelect={handleFileSelect} />
      </Box>
      <Box className="popup-row-input">
        <FileUploadTextField label="Articles of Incorporation" onFileSelect={handleFileSelect} />
        <FileUploadTextField label="Government ID of Signors" onFileSelect={handleFileSelect} />
      </Box>
      <Box className="popup-row-input">
        <FileUploadTextField label="EPC SOQ & Contract" onFileSelect={handleFileSelect} />
      </Box>
      <Button className="poup-up-btton" onClick={handleSave}  disabled={submitting} variant="contained" color="primary">
      {submitting ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
};

export default Formsubmission;
