import { Box, Typography, IconButton } from '@mui/material';
import React, { useState, useRef } from 'react';
import Avatar from '@mui/joy/Avatar';
import { styled, alpha } from '@mui/material/styles';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const Chatbox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  border: "1px solid #42434A33",
  display: "flex",
  borderRadius: "8px",
  alignItems: "center"
}));

const ConvoChatbox = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files && files.length > 0) {
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage('');
  };

  return (
    <Box className='convo-wrapper'>
      <Box className="convo-chat-wrapper">
        {chatMessages.map(msg => (
          <Box key={msg.id} className="convo-data">
            <Avatar src=''></Avatar>
            <Box className="covno-mssge">
              <Typography component='body1'>{msg.sender}</Typography>
              <Box className='convo-text'>
                <Box className="convo-bg-style">
                  <Typography component='body2'>{msg.text}</Typography>
                </Box>
                <Typography component='body1'>{msg.time}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Box className="searchbar">
        {selectedImages.map((imageUrl, index) => (
          <Box key={index} className="upload-file-preview">
            <img
              src={imageUrl}
              alt={`Preview ${index}`}
              style={{ maxWidth: '200px', maxHeight: '200px', margin: '5px', borderRadius: "15px" }}
            />
            <IconButton onClick={() => handleRemoveImage(index)} size="small" className='file-close'>
              <CloseIcon />
            </IconButton>
          </Box>
        ))}
        <Chatbox className='chatbox'>
          <input
            type='text'
            placeholder='Type here'
            className='chattext-input'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <IconButton onClick={handleClick} className='chat-file-upload'>
            <DriveFolderUploadIcon />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </IconButton>
          <Box className='chat-send-icon' onClick={handleSendMessage} style={{ cursor: 'pointer' }}>
            <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.578613 10C0.578613 4.48582 5.45595 0 11.4514 0C17.4469 0 22.3242 4.48582 22.3242 10C22.3242 15.5142 17.4469 20 11.4514 20C5.45595 20 0.578613 15.5142 0.578613 10ZM10.2791 14.7552L14.8094 10.5885C15.1637 10.2627 15.1637 9.73604 14.8094 9.41022L10.2791 5.24354C9.92484 4.91772 9.35219 4.91772 8.99793 5.24354C8.64367 5.56936 8.64367 6.09604 8.99793 6.42186L12.8877 9.99936L8.99789 13.5769C8.64363 13.9027 8.64363 14.4294 8.99789 14.7552C9.17457 14.9177 9.40655 14.9994 9.63849 14.9994C9.87047 14.9994 10.1024 14.9177 10.2791 14.7552Z" fill="#275021" />
            </svg>
          </Box>
        </Chatbox>
        <Box className='back-to-home-btn' mt={2}>
          <button onClick={() => navigate("/dashboard")}>Back to Home</button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConvoChatbox;