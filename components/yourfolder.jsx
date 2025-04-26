import React, { useRef, useEffect, useState } from 'react'
import { Box, Button, Typography, ButtonGroup, IconButton, FormControl, InputLabel, MenuItem, Menu } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

const Yourfolder = ({ handleCloseaction, actionbtn, handleOpenction, showfolder, btnblock, files, folders }) => {
  const sliderRef = useRef(null);


  useEffect(() => {
    const slider = sliderRef.current;
    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = (e) => {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const stopDragging = () => {
      mouseDown = false;
    };

    const move = (e) => {
      e.preventDefault();
      if (!mouseDown) {
        return;
      }
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    };

    if (slider) { // Check if sliderRef is attached to a DOM node
      slider.addEventListener('mousemove', move, false);
      slider.addEventListener('mousedown', startDragging, false);
      slider.addEventListener('mouseup', stopDragging, false);
      slider.addEventListener('mouseleave', stopDragging, false);

      // Cleanup event listeners on component unmount
      return () => {
        slider.removeEventListener('mousemove', move, false);
        slider.removeEventListener('mousedown', startDragging, false);
        slider.removeEventListener('mouseup', stopDragging, false);
        slider.removeEventListener('mouseleave', stopDragging, false);
      };
    }
  }, [])


  
  return (
    <Box className='folder-wrapper' sx={{ paddingBottom: showfolder ? "88px" : "0" }}>
      <Box className="file-preview">
        <Box className="file-heading">
          <Typography component="h2">Your folders | {folders.length} Folders</Typography>
          <Typography component="body1">Click on a folder to view the files / Sub folders inside</Typography>
        </Box>

      </Box>
      <Box className={btnblock ? "folders-show" : "folder-show-block"} ref={sliderRef}>
        {folders?.map(item => (
          <Box key={item.id} className={btnblock ? 'folder-apperance' : "folder-apperance-block"}>
            {/* <Box className={btnblock ? "options-folder" : "options-folder-block"}>
              <IconButton onClick={handleOpenction}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10Z" fill="black" fill-opacity="0.51" />
                </svg>
              </IconButton>
              <Menu
                sx={{ mt: '45px', display: "flex" }}
                id={item.id}
                anchorEl={actionbtn}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(actionbtn)}
                onClose={handleCloseaction}
              >
                <MenuItem>
                  <IconButton>
                    <BorderColorRoundedIcon />
                  </IconButton>
                </MenuItem>
                <MenuItem>
                  <IconButton>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </MenuItem>
              </Menu>
            </Box> */}
            <Box className="folder-image">
              <Box>
                <svg width="71" height="68" viewBox="0 0 71 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.00537109 12H55.2378C63.5221 12 70.2378 18.7157 70.2378 27V53C70.2378 61.2843 63.5221 68 55.2378 68H15.0054C6.7211 68 0.00537109 61.2843 0.00537109 53V12Z" fill="black" />
                  <path d="M0.00537109 15C0.00537109 6.71573 6.7211 0 15.0054 0H22.5946C30.8788 0 37.5946 6.71573 37.5946 15V18H0.00537109V15Z" fill="black" />
                </svg>
              </Box>
            </Box>
            <Box className={btnblock ? "folder-data" : "folder-data-block"}>
              <Typography component="h2">
                {item}
              </Typography>
              {/* <Typography component='body1'>
                {item.files || "0 files"} | {item.totalFolders || "0 folders"}
              </Typography> */}
            </Box>
          </Box>
        ))}
      </Box>


    </Box>
  )
}


export default Yourfolder;