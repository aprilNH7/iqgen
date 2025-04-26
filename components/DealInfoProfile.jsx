import { Box, Typography } from '@mui/material';
import React from 'react';

const DealInfoProfile = ({ project }) => {
    // if (!project) return null; 

    return (
        <>
          { !project ?
            <Box className='deal-info-content' sx={{ 'backgroundImage': 'url(/images/deal-info-bg.png)' }}>
                <Box className='info-content'>
                    <Typography component='h2'>Astawa Plaza</Typography>
                    <Typography>223 Park St, Dallas, 75022</Typography>
                    <Typography component='span'>We do Solar, LLC (EPC , developer or Sales Org i.e. originator) </Typography> 
                </Box>
            </Box> : <Box className='deal-info-content' sx={{ 'backgroundImage': 'url(/images/deal-info-bg.png)' }}>
                <Box className='info-content'>
                    <Typography component='h2'>{project.projectName}</Typography>
                    <Typography>{project.address}</Typography>
                    <Typography component='span'>{project.title}</Typography> 
                </Box>
            </Box> }
            
        </>
    );
}

export default DealInfoProfile;