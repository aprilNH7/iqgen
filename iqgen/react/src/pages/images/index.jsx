import React from "react";
import MainHeader from "../../components/mainHeader";
import { Box } from "@mui/material";
import PhotoGallery from "../../components/PhotoGallery";

const ImageDashboard = () => {
    return (
        <> 
            <MainHeader />
            <Box sx={{ padding: 2 }}>
                <PhotoGallery />
            </Box>
        </>
    );
};

export default ImageDashboard;
