import { Box, TextField, Typography, IconButton, MenuItem, Avatar, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from "axios";





const Popupprojectformedit = ({ setPopupcommercial, project, onUpdate, epcUsers }) => {
  const [showfield, setShowfield] = useState("false");
  const [showfieldnew, setShowfieldnew] = useState("false");
  const [showdropdown, setDropdown] = useState("false");
  const [message, setMessage] = useState('');
  const [selectedEpc, setSelectedEpc] = useState("");



  const [formData, setFormData] = useState({
    projectName: "",
    address: "",
    title: "",
    clientName: "",
    clientNumber: "",
    clientEmail: "",
    pocName: "",
    pocNumber: "",
    pocEmail: "",
    currentRate: "",
    ppaRate: "",
    recValue: "",
    epcInstall: "",
    systemProduction: "",
    systemSize: "",
    ppaTerm: "",
    escalatorYr: "",
    epc: {
      name: "",
      insurance: "",
      license: "",
  }
  });


  useEffect(() => {
    if (project) {
      setFormData({
        projectName: project.projectName || "",
        address: project.address || "",
        title: project.title || "",
        clientName: project.clientContact.name || "",
        clientNumber: project.clientContact.number || "",
        clientEmail: project.clientContact.email || "",
        pocName: project.poc.name || "",
        pocNumber: project.poc.number || "",
        pocEmail: project.poc.email || "",
        currentRate: project.systemInfo.currentRate || "",
        ppaRate: project.systemInfo.ppaRate || "",
        recValue: project.systemInfo.recValue || "",
        epcInstall: project.systemInfo.epcInstall || "",
        systemProduction: project.systemInfo.systemProduction || "",
        systemSize: project.systemInfo.systemSizeKW || "",
        ppaTerm: project.systemInfo.ppaTerm || "",
        escalatorYr: project.systemInfo.escalator || "",
        epc: {
          name: project.epc?.name || "",
          insurance: project.epc?.insurance || "N/A",
          license: project.epc?.license || "N/A",
        },
      });
  
      // Preselect EPC from existing project data
      const selectedEpcUser = epcUsers.find(user => user.firstName === project.epc?.name);
      if (selectedEpcUser) {
        setSelectedEpc(selectedEpcUser._id);
      }
    }
  }, [project, epcUsers]);  // Include epcUsers in dependency array
  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async () => {
    try {
      const updatedData = {
        projectName: formData.projectName,
        address: formData.address,
        title: formData.title,
        clientContact: {
          name: formData.clientName,
          number: formData.clientNumber,
          email: formData.clientEmail
        },
        poc: {
          name: formData.pocName,
          number: formData.pocNumber,
          email: formData.pocEmail
        },
        epc: {
          name: formData.epc?.name || "",
          insurance: formData.epc?.insurance || "N/A",
          license: formData.epc?.license || "N/A",
      },
        systemInfo: {
          currentRate: formData.currentRate,
          ppaRate: formData.ppaRate,
          recValue: formData.recValue,
          epcInstall: formData.epcInstall,
          systemProduction: formData.systemProduction,
          systemSizeKW: formData.systemSize,
          ppaTerm: formData.ppaTerm,
          escalator: formData.escalatorYr
        }
      };

      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/projects-update/${project._id}`, updatedData);
      setPopupcommercial(false);
      onUpdate();
    } catch (error) {
      console.error("Error updating project:", error);
      // alert("Failed to update project.");
      setMessage(error.response.data.message);
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
        <Box className="top-popup">
          <IconButton onClick={() => setPopupcommercial(false)} className='closebutton'>
            <CloseOutlinedIcon />
          </IconButton>
          {/* Display Error Message at the Top in Red */}
          {message && <Typography sx={{ color: "red", fontSize: "16px", marginBottom: "10px" }}>{message}</Typography>}

          <Typography component="h2">
            Edit Project Settings
          </Typography>
        </Box>
        <Box className="contact-client-info">
          <Typography component="h2">
            Site information:</Typography>
        </Box>
        <Box className="popup-inputs">
          <Box className="popup-row-input">
            <TextField fullWidth label="Project Name" name="projectName" value={formData.projectName} onChange={handleChange}>
            </TextField>
            <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange}>
            </TextField>
            <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange}>
            </TextField>
          </Box>
          <Box onClick={() => setShowfield(!showfield)} className="contact-client-info">
            <Typography component="h2">
              Client Contact</Typography>
            <IconButton className="contact-add-btn" size="large" onClick={() => setShowfield(!showfield)}>
              {showfield ? <AddIcon /> : <RemoveIcon />}
            </IconButton>
          </Box>
          {!showfield && <Box className="popup-row-input">
            <TextField fullWidth label="Name" name="clientName" value={formData.clientName} onChange={handleChange}>
            </TextField>
            <TextField fullWidth label="Number" name="clientNumber" value={formData.clientNumber} onChange={handleChange}>
            </TextField>
            <TextField fullWidth label="Email" name="clientEmail" value={formData.clientEmail} onChange={handleChange}>
            </TextField>
          </Box>}

          <Box className='or'>
            <Typography component='span'>or</Typography>
          </Box>
          <Box onClick={() => setShowfieldnew(!showfieldnew)} className="contact-client-info">
            <Typography component="h2">
              POC</Typography>
            <IconButton className="contact-add-btn" size="large" onClick={() => setShowfieldnew(!showfieldnew)} >
              {showfieldnew ? <AddIcon /> : <RemoveIcon />}
            </IconButton>
          </Box>
          {!showfieldnew && <Box className="popup-row-input">
            <TextField fullWidth label="Name" name="pocName" value={formData.pocName} onChange={handleChange}>
            </TextField>
            <TextField fullWidth label="Number" name="pocNumber" value={formData.pocNumber} onChange={handleChange}>
            </TextField>
            <TextField fullWidth label="Email" name="pocEmail" value={formData.pocEmail} onChange={handleChange}>
            </TextField>
          </Box>}


          <Box onClick={() => setDropdown(!showdropdown)} className="contact-client-info">
            <Typography component="h2">
              EPC</Typography>
            <IconButton className="contact-add-btn" size="large" onClick={() => setDropdown(!showdropdown)}>
              {showdropdown ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
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
                        name: selectedUser?.firstName || "",
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
                  <TextField defaultValue={0} label="Current Rate" name="currentRate" type="number" value={formData.currentRate} onChange={handleChange} sx={{ width: "100%", marginRight: "5px" }}>
                  </TextField>c/KWh
                </Typography>
              </Box>
            </Box>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'>
                  <TextField defaultValue={0} label="PPA Rate" name="ppaRate" type="number" value={formData.ppaRate} onChange={handleChange} sx={{ width: "100%", marginRight: "5px" }}></TextField>c/KWh</Typography>
              </Box>
            </Box>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'>
                  <TextField defaultValue={0} label="REC Value" name="recValue" type="number" value={formData.recValue} onChange={handleChange} sx={{ width: "100%", marginRight: "5px" }}></TextField>c/KWh</Typography>
              </Box>
            </Box>
          </Box>
          <Box className='project-stats'>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'>
                  $<TextField defaultValue={0} label="EPC Install" name="epcInstall" type="number" value={formData.epcInstall} onChange={handleChange} sx={{ width: "100%", marginRight: "5px" }}>
                  </TextField>W</Typography>
              </Box>
            </Box>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'>
                  <TextField label="System Production" name="systemProduction" type="number" value={formData.systemProduction} onChange={handleChange} defaultValue={0} sx={{ width: "100%", marginRight: "5px" }}></TextField>
                </Typography>
              </Box>
            </Box>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'>
                  <TextField label="System Size KW" name="systemSize" type="number" value={formData.systemSize} onChange={handleChange} defaultValue={0} sx={{ width: "100%", marginRight: "5px" }}></TextField>
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className='project-stats'>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'><TextField label="PPA Term " name="ppaTerm" type="number" value={formData.ppaTerm} onChange={handleChange} defaultValue={25} sx={{ width: "100%", marginRight: "5px" }}></TextField> Years</Typography>
              </Box>
            </Box>
            <Box className='stats-box'>
              <Box className='stats-content'>
                <Typography component='h4'><TextField defaultValue={0} label="Escalator/Yr" name="escalatorYr" type="number" value={formData.escalatorYr} onChange={handleChange} sx={{ width: "100%", marginRight: "5px" }}></TextField>%</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Button className='poup-up-btton' onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </>

  )
}

export default Popupprojectformedit;


