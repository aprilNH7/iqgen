import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Button, Typography, ButtonGroup, IconButton, FormControl, InputLabel, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import ToggleOnRoundedIcon from "@mui/icons-material/ToggleOnRounded";
import ToggleOffRoundedIcon from "@mui/icons-material/ToggleOffRounded";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import axios from "axios";
import Swal from "sweetalert2";




const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  minWidth: "255px",
  width: "11%",
  border: "1px solid #42434A33",
  display: "flex",
  borderRadius: "8px",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: "20px",
    transition: theme.transitions.create("width"),
    width: "80%",
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


const FilesTable = ({ Togglebtn, handleCloseaction, actionbtn, handleOpenction, handleshow, files, folders, onUpdate, project }) => {
  const [value, setValue] = useState(0);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({}); // Store checked state for each item
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null); // Track which menu is open


  // Filter files based on searchQuery
  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Extract unique folders and file types
  const uniqueFolders = [...new Set(files.map((item) => item.folder))];
  const uniqueFileTypes = [
    ...new Set(files.filter((item) => !item.isFolder).map((item) => item.fileType).filter(Boolean)),
  ];


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setCheckedAll(isChecked);

    const newCheckedItems = {};
    files.forEach((item) => {
      newCheckedItems[item.name] = isChecked; // Select or deselect all
    });

    setCheckedItems(newCheckedItems);
  };


  const handleCheckItem = (itemId) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = {
        ...prevCheckedItems,
        [itemId]: !prevCheckedItems[itemId], // Toggle checkbox state
      };

      // If all items are checked, update `checkedAll`
      const allChecked = files.every((item) => newCheckedItems[item.name]);
      setCheckedAll(allChecked);

      return newCheckedItems;
    });
  };


  // const handleDeleteFile = async (fileName) => {
  //   try {
  //     const response = await axios.delete("http://localhost:5000/api/delete-file", {
  //       data: { fileName },
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200) {
  //       onUpdate();
  //       handleOpenction(false);
  //       alert("File deleted successfully!");
  //       // setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  //     } else {
  //       alert(response.data.error || "Failed to delete file");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting file:", error);
  //     // alert(error.response?.data?.error || "Error deleting file. Please try again.");
  //   }
  // };

  const handleMenuOpen = (event, file) => {
    setMenuAnchor(event.currentTarget);
    setSelectedFile(file); // Store selected file details
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedFile(null);
  };



  // const handleDeleteFile = async () => {
  //   if (!selectedFile) {
  //     console.error("No file selected for deletion");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.delete("http://98.83.66.76:5002/api/delete-file", {
  //       data: {
  //         folder: selectedFile.folder,
  //         fileName: selectedFile.name,
  //         projectId: project._id,
  //       },
  //       headers: { "Content-Type": "application/json" },
  //     });
  
  //     if (response.status === 200) {
  //       onUpdate(project._id); 
  //       handleMenuClose();
  //       alert("File deleted successfully!");
  //     } else {
  //       alert(response.data.error || "Failed to delete file");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting file:", error);
  //     alert("Error deleting file. Please try again.");
  //   }
  // };
 
 
  const handleDeleteFile = async () => {  
    handleMenuClose();
  
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/delete-file`, {
            data: {
              folder: selectedFile.folder,
              fileName: selectedFile.name,
              projectId: project._id,
            },
            headers: { "Content-Type": "application/json" },
          });
  
          if (response.status === 200) {
            onUpdate(project._id);
            // Swal.fire("Deleted!", "Your file has been deleted.", "success");
          } else {
            Swal.fire("Error", response.data.error || "Failed to delete file", "error");
          }
        } catch (error) {
          console.error("Error deleting file:", error);
          // Swal.fire("Error", "Error deleting file. Please try again.", "error");
        }
      }
    });
  };



  // const handleDeleteFile = async (folder, fileName) => {
  //   try {
  //     const response = await axios.delete("http://localhost:5000/api/delete-file", {
  //       data: { 
  //         folder,
  //         fileName,
  //         projectId: project._id,
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200) {
  //       onUpdate();
  //       handleOpenction(false);
  //       alert("File deleted successfully!");
  //     } else {
  //       alert(response.data.error || "Failed to delete file");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting file:", error);
  //     alert("Error deleting file. Please try again.");
  //   }
  // };




  // const dropdownIcon = () => (
  //   <svg
  //     width="24"
  //     height="24"
  //     viewBox="0 0 24 24"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <path
  //       d="M18.5 9L12.5 15L6.5 9"
  //       stroke="black"
  //       stroke-opacity="0.38"
  //       stroke-width="2"
  //       stroke-linecap="round"
  //       stroke-linejoin="round"
  //     />
  //   </svg>
  // );




  return (
    <Box sx={{ width: "100%" }}>
      <Box className="file-preview">
        <Box className="file-heading">
          <Typography component="h2">Your files | {files.length} Files</Typography>
          <Typography component="body1">
            Click on a file to preview the file
          </Typography>
        </Box>
      </Box>

      <Box className="table-filters">

        <Box className="filter-area">
          {/* Location Dropdown */}
          {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }} className="dropdown-select">
            <InputLabel id="location-select-label" sx={{ color: "#00000070" }}>
              Location
            </InputLabel>
            <Select labelId="location-select-label" id="location-select" IconComponent={dropdownIcon}>
              <MenuItem value=""><em>None</em></MenuItem>
              {uniqueFolders.map((folder, index) => (
                <MenuItem key={index} value={folder}>{folder}</MenuItem>
              ))}
            </Select>
          </FormControl> */}

          {/* File Type Dropdown */}
          {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }} className="dropdown-select">
            <InputLabel id="file-type-select-label" sx={{ color: "#00000070" }}>
              File Type
            </InputLabel>
            <Select labelId="file-type-select-label" id="file-type-select" IconComponent={dropdownIcon}>
              <MenuItem value=""><em>None</em></MenuItem>
              {uniqueFileTypes.map((type, index) => (
                <MenuItem key={index} value={type}>{`.${type}`}</MenuItem>
              ))}
            </Select>
          </FormControl> */}

          {/* Modified Dropdown (Static for now) */}
          {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }} className="dropdown-select">
            <InputLabel id="modified-select-label" sx={{ color: "#00000070" }}>
              Modified
            </InputLabel>
            <Select labelId="modified-select-label" id="modified-select" IconComponent={dropdownIcon}>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={110}>12</MenuItem>
              <MenuItem value={210}>111</MenuItem>
              <MenuItem value={130}>1111</MenuItem>
            </Select>
          </FormControl> */}
        </Box>

        {/* Search Input */}
        <Search className="table-search">
          <StyledInputBase
            className="search"
            inputProps={{ "aria-label": "search" }}
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Box className="search-icon">
            <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="9.19912" cy="7.48904" rx="7.45552" ry="6.42361" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.5185 15.5185L14.4646 12.0257" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Box>
        </Search>
      </Box>



      <Box class="tabs-layout">
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="table-tabs"
        >
          <Tab className="tab-show" label="All files" {...a11yProps(0)} />
          {/* <Tab className="tab-show" label="Files and folders" {...a11yProps(1)} />
          <Tab className="tab-show" label="Important" {...a11yProps(2)} />
          <Tab className="tab-show" label="Recent" {...a11yProps(3)} /> */}
        </Tabs>
      </Box>




      <CustomTabPanel className="table-custome-file" value={value} index={0}>
        {filteredFiles.length > 0 ? (

          <table class="filesTable-layout">
            <thead>
              <tr>
                <th class="table-head-input" data-label="Select All">
                  <input
                    type="checkbox"
                    id="checkbtn-121"
                    checked={checkedAll}
                    onChange={handleCheckAll}
                    style={{ display: "none" }}
                  />
                  <label class="table-checkbox" htmlFor="checkbtn-121">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      shape-rendering="geometricPrecision"
                      text-rendering="geometricPrecision"
                      image-rendering="optimizeQuality"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      viewBox="0 0 512 459.53"
                    >
                      <path
                        fill="#fff"
                        fill-rule="nonzero"
                        d="M9.38 212.26l91.05-1.2c1.9-.01 3.69.53 5.19 1.49 32.96 19.01 62.2 42.95 87.35 71.5 33.32-54.09 68.94-103.63 106.55-149.04C339.7 86.5 382.32 42.5 426.98 2.46a9.464 9.464 0 016.33-2.41L502.67 0c8.53 0 12.23 9.31 6.73 16.26-61.47 68.29-117.32 139.05-167.78 212a2075.014 2075.014 0 00-135.99 226.12c-2.4 4.65-8.14 6.49-12.79 4.09a9.476 9.476 0 01-4.35-4.63C146.26 363.35 86.92 286.45 4.14 229.6c-7.67-5.25-3.96-17.2 5.24-17.34z"
                      />
                    </svg>
                  </label>
                </th>
                <th class="table-heading">File name</th>
                <th class="table-heading">Location (Folder)</th>
                <th class="table-heading">File type</th>
                {/* <th class="table-heading">Important</th> */}
                <th class="table-heading">Modified</th>
              </tr>
            </thead>
            <tbody>

              {filteredFiles
                .filter((item) => !item.isFolder)
                .map((item, index) => (
                  <tr key={index}>
                    <td class="table-data">
                      <input
                        type="checkbox"
                        name="tablecheckbox"
                        id={item.name}  // Use name as the key
                        style={{ display: "none" }}
                        checked={checkedItems[item.name] || false} // Use item.name instead of item.id
                        onChange={() => handleCheckItem(item.name)} // Pass item.name
                      />

                      <label class="table-checkbox" htmlFor={item.name}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          shape-rendering="geometricPrecision"
                          text-rendering="geometricPrecision"
                          image-rendering="optimizeQuality"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          viewBox="0 0 512 459.53"
                        >
                          <path
                            fill="#fff"
                            fill-rule="nonzero"
                            d="M9.38 212.26l91.05-1.2c1.9-.01 3.69.53 5.19 1.49 32.96 19.01 62.2 42.95 87.35 71.5 33.32-54.09 68.94-103.63 106.55-149.04C339.7 86.5 382.32 42.5 426.98 2.46a9.464 9.464 0 016.33-2.41L502.67 0c8.53 0 12.23 9.31 6.73 16.26-61.47 68.29-117.32 139.05-167.78 212a2075.014 2075.014 0 00-135.99 226.12c-2.4 4.65-8.14 6.49-12.79 4.09a9.476 9.476 0 01-4.35-4.63C146.26 363.35 86.92 286.45 4.14 229.6c-7.67-5.25-3.96-17.2 5.24-17.34z"
                          />
                        </svg>
                      </label>
                    </td>

                    <td class="table-data" data-label="File name">
                      {item.name}
                    </td>
                    <td className="table-data" data-label="Location (Folder)">
                      {item.folder}
                    </td>
                    <td className="table-data" data-label="File type">
                      {item.fileType ? `.${item.fileType}` : (item.isFolder ? "Folder" : "Unknown")}
                    </td>
                    {/* <td class="table-data" data-label="Important">
                      <Togglebtn />
                    </td> */}
                    <td className="table-data" data-label="Modified">
                      {new Date(item.lastModified).toLocaleDateString()}
                    </td>

                    {/* <td class="table-data" data-label="action">
                      <IconButton onClick={(event) => handleMenuOpen(event, item)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10Z"
                            fill="black"
                            fill-opacity="0.51"
                          />
                        </svg>
                      </IconButton>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={menuAnchor}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        keepMounted
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        open={Boolean(menuAnchor)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem>
                          <IconButton>
                            <BorderColorRoundedIcon />
                          </IconButton>
                        </MenuItem>
                        
                        <MenuItem onClick={handleDeleteFile}>
                          <IconButton>
                            <DeleteOutlineOutlinedIcon />
                          </IconButton>
                        </MenuItem>
                      </Menu>

                    </td> */}


                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <Typography
            sx={{ textAlign: "center", marginTop: "20px", color: "#888" }}> No records available </Typography>
        )}
      </CustomTabPanel>


      {/* <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Three2
      </CustomTabPanel> */}
    </Box>
  );
};

export default FilesTable;