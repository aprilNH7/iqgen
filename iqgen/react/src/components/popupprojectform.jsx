import { Box, TextField, Typography, IconButton, MenuItem, Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from "axios";




const Popupprojectform = ({ setPopup, onUpdate, epcUsers }) => {
  const [showfield, setShowfield] = useState("false")
  const [showfieldnew, setShowfieldnew] = useState("false")
  const [showdropdown, setDropdown] = useState("false")
  const [error, setError] = useState("");
  const [selectedEpc, setSelectedEpc] = useState("");







  const [formData, setFormData] = useState({
    projectName: "",
    address: "",
    title: "",
    clientContact: { name: "", number: "", email: "" },
    poc: { name: "", number: "", email: "" },
    epc: { name: "", insurance: "", license: "" },
    systemInfo: {
      currentRate: 0,
      ppaRate: 0,
      recValue: 0,
      epcInstall: 0,
      systemProduction: 0,
      systemSizeKW: 0,
      ppaTerm: 25,
      escalator: 0,
    },
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // Function to update state for nested objects
  const handleNestedChange = (e, parentKey) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [parentKey]: {
        ...formData[parentKey],
        [name]: value,
      },
    });
  };


  const handleSubmit = async () => {
    setError("");
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/create`, formData);
      // alert("Project saved successfully!");
      setPopup(false);
      onUpdate();
    } catch (error) {
      console.error("Error saving project:", error);
      let errorMessage = "Failed to save project. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.message || `Error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message;
      }

      setError(errorMessage);
    }
  };




  const Dropdown = [
    {
      name: "Maria1",
      Insurance: "lorem",
      License: "License"
    },
    {
      name: "Maria2",
      Insurance: "lorem",
      License: "License"
    },
    {
      name: "Maria3",
      Insurance: "lorem",
      License: "License"
    },
    {
      name: "Maria4",
      Insurance: "lorem",
      License: "License"
    }
  ]




  return (
    <>
      <Box className="popup-wrapper">
        <IconButton onClick={() => setPopup(false)} className='closebutton'>
          <CloseOutlinedIcon />
        </IconButton>
        {/* Display Error Message at the Top in Red */}
        {error && <Typography sx={{ color: "red", fontSize: "16px", marginBottom: "10px" }}>{error}</Typography>}

        <Typography component="h2">
          New Project Submission
        </Typography>
        <Box className="contact-client-info">
          <Typography component="h2">
            Site information:</Typography>
        </Box>
        <Box className="popup-inputs">
          <Box className="popup-row-input">
            <TextField fullWidth label="Project Name" name="projectName" onChange={handleChange} >
            </TextField>
            <TextField fullWidth label="Address" name="address" onChange={handleChange} >
            </TextField>
            <TextField fullWidth label="Title" name="title" onChange={handleChange} >
            </TextField>
          </Box>
          <Box className="contact-client-info">
            <Typography component="h2">
              Client Contact</Typography>
            <IconButton className="contact-add-btn" size="large" onClick={() => setShowfield(!showfield)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.2535 8.81453H11.4241V0.985107H8.81429V8.81453H0.984863V11.4243H8.81429V19.2538H11.4241V11.4243H19.2535V8.81453Z" fill="white" />
              </svg>
            </IconButton>
          </Box>
          {!showfield && <Box className="popup-row-input">
            <TextField fullWidth label="Name" name="name" value={formData.clientContact.name} onChange={(e) => handleNestedChange(e, "clientContact")} />
            <TextField fullWidth label="Number" name="number" value={formData.clientContact.number} onChange={(e) => handleNestedChange(e, "clientContact")} />
            <TextField fullWidth label="Email" name="email" value={formData.clientContact.email} onChange={(e) => handleNestedChange(e, "clientContact")} />
          </Box>}

          <Box className='or'>
            <Typography component='span'>or</Typography>
          </Box>
          <Box className="contact-client-info">
            <Typography component="h2">
              POC</Typography>
            <IconButton className="contact-add-btn" size="large" onClick={() => setShowfieldnew(!showfieldnew)} >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.2535 8.81453H11.4241V0.985107H8.81429V8.81453H0.984863V11.4243H8.81429V19.2538H11.4241V11.4243H19.2535V8.81453Z" fill="white" />
              </svg>
            </IconButton>
          </Box>
          {!showfieldnew && <Box className="popup-row-input">
            <TextField fullWidth label="Name" name="name" value={formData.poc.name} onChange={(e) => handleNestedChange(e, "poc")} />
            <TextField fullWidth label="Number" name="number" value={formData.poc.number} onChange={(e) => handleNestedChange(e, "poc")} />
            <TextField fullWidth label="Email" name="email" value={formData.poc.email} onChange={(e) => handleNestedChange(e, "poc")} />
          </Box>}
          <Box className="contact-client-info">
            <Typography component="h2">
              EPC</Typography>
            <IconButton className="contact-add-btn" size="large" onClick={() => setDropdown(!showdropdown)}>
              <svg width="20" height="20" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L5 5L10 0H0Z" fill="#ffffff" />
              </svg>
            </IconButton>
          </Box>
          {!showdropdown &&
            <Box className="epc-dropdown">
              <Box className="input-field-label">
              <label>Name</label>
              <TextField
                className="input-field-select"
                sx={{
                  "& .MuiSelect-select": {
                    padding: "10px",
                  },
                }}
                select
                fullWidth
                value={selectedEpc}
                onChange={(e) => {
                  const selectedUser = epcUsers.find(user => user._id === e.target.value);
                  setSelectedEpc(e.target.value);
                  setFormData({
                    ...formData,
                    epc: {
                      name: selectedUser?.firstName  || "",
                      insurance: selectedUser?.Insurance || "N/A",
                      license: selectedUser?.License || "N/A",
                    },
                  });
                }}
              >
                {epcUsers.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.firstName}
                     {/* {user.lastName} */}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
              <Box class='input-field-label'>
                <label>
                  Insurance
                </label>
                <TextField className='input-field-select'
                  sx={{
                    '& .MuiSelect-select': {
                      padding: '10px',
                    }
                  }}
                  label=""
                  select
                  fullWidth>
                  {Dropdown.map((option) => (
                    <MenuItem key={option.id} value={option}>
                      {option.Insurance}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box class='input-field-label'>
                <label>
                  License
                </label>
                <TextField className='input-field-select'
                  sx={{
                    '& .MuiSelect-select': {
                      padding: '10px',
                    }
                  }}
                  label=""
                  select
                  fullWidth>
                  {Dropdown.map((option) => (
                    <MenuItem key={option.id} value={option}>
                      {option.License}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          }
        </Box>
        <Typography sx={{ paddingTop: "20px" }} component="h2">System Information: </Typography>
        <Box className='project-stats-wrapper'>
          <Box className='project-stats'>
            <Box className='stats-box'>
              <Box className='stats-content'>

                <Typography component='h4'>
                  <TextField defaultValue={0} label="Current Rate" name="currentRate" type="number" value={formData.systemInfo.currentRate} onChange={(e) => handleNestedChange(e, "systemInfo")} sx={{ width: "100%", marginRight: "5px" }}>

                  </TextField>c/KWh
                </Typography>
              </Box>
            </Box>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'>
                  <TextField defaultValue={0} label="PPA Rate" name="ppaRate" type="number" value={formData.systemInfo.ppaRate} onChange={(e) => handleNestedChange(e, "systemInfo")} sx={{ width: "100%", marginRight: "5px" }}></TextField>c/KWh</Typography>
              </Box>
            </Box>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'>
                  <TextField defaultValue={0} label="REC Value" name="recValue" type="number" value={formData.systemInfo.recValue} onChange={(e) => handleNestedChange(e, "systemInfo")} sx={{ width: "100%", marginRight: "5px" }}></TextField>c/KWh</Typography>
              </Box>
            </Box>
          </Box>
          <Box className='project-stats'>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'>
                  $<TextField defaultValue={0} label="EPC Install" name="epcInstall" type="number" value={formData.systemInfo.epcInstall} onChange={(e) => handleNestedChange(e, "systemInfo")} sx={{ width: "100%", marginRight: "5px" }}>

                  </TextField>W</Typography>
              </Box>
            </Box>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'>
                  <TextField label="System Production" defaultValue={0} name="systemProduction" type="number" value={formData.systemInfo.systemProduction} onChange={(e) => handleNestedChange(e, "systemInfo")} sx={{ width: "100%", marginRight: "5px" }}></TextField>
                </Typography>
              </Box>
            </Box>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'>
                  <TextField label="System Size KW" defaultValue={0} name="systemSizeKW" type="number" value={formData.systemInfo.systemSizeKW} onChange={(e) => handleNestedChange(e, "systemInfo")} sx={{ width: "100%", marginRight: "5px" }}></TextField>
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className='project-stats'>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'><TextField label="PPA Term" defaultValue={25} name="ppaTerm" type="number" value={formData.systemInfo.ppaTerm} onChange={(e) => handleNestedChange(e, "systemInfo")} sx={{ width: "100%", marginRight: "5px" }}></TextField> Years</Typography>
              </Box>
            </Box>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'><TextField defaultValue={0} label="Escalator/Yr" name="escalator" type="number" value={formData.systemInfo.escalator} onChange={(e) => handleNestedChange(e, "systemInfo")} sx={{ width: "100%", marginRight: "5px" }}></TextField>%</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Button className='poup-up-btton' onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </>

  )
}

export default Popupprojectform

