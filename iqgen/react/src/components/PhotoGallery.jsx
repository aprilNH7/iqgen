import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import axios from "axios";
import { useParams } from "react-router-dom";

const PhotoGallery = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchS3Data(id);
    }
  }, [id]);

  const fetchS3Data = async (projectID) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/get-s3-files?projectID=${projectID}`);
      const imageFiles = (response.data.files || []).filter(file => file.mimetype?.startsWith('image/'));
      setImages(imageFiles);
    } catch (error) {
      console.error("Error fetching image files:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="photo-wrapper" sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Project Photo Gallery
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : images.length === 0 ? (
        <Typography>No image files found for this project.</Typography>
      ) : (
        <Grid container spacing={2}>
          {images.map((file, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box
                component="img"
                src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${file.filename}`}
                alt={file.originalname || `image-${index}`}
                sx={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PhotoGallery;
