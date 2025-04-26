import React, { useRef, useState } from 'react'
import { Box,Button } from '@mui/material'






const UploadBtn = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);


    const Uploadfile = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM10 13H7V11H10V13ZM14 13H11V11H14V13ZM10 16H7V14H10V16ZM14 16H11V14H14V16ZM10 19H7V17H10V19ZM14 19H11V17H14V19Z" fill="white"/>
        </svg>
      );

      const Uploadfolder = () => (        
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.1 10L4 18V8H21C21 7.46957 20.7893 6.96086 20.4142 6.58579C20.0391 6.21071 19.5304 6 19 6H12L10 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H19C19.9 20 20.7 19.4 20.9 18.5L23.2 10H6.1ZM19 18H6L7.6 12H20.6L19 18Z" fill="white"/>
        </svg>
      );

      
      const handleClick = () => {
        fileInputRef.current.click(); // Opens file dialog
    };

      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

  return (
    <Box className="upload-btn-conatiner">
      <Button onClick={handleClick} className="upload-btn" variant="contained" startIcon={<Uploadfile/>} disableRipple >
         Upload file
         <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
        />
        </Button>
        <Button onClick={handleClick} className="upload-btn" variant="contained" startIcon={<Uploadfolder/>} disableRipple >
         Upload folder
         <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
        />
      </Button>
    </Box>
  )
}

export default UploadBtn