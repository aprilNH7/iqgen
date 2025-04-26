import { Box } from '@mui/material';
import React from 'react';
import ButtonNav from './dashboardbtnnav';
import DealMap from './DealMap';
import ProjectStats from './ProjectStats';
import ProjectValue from './ProjectValue';
import DealInfoProfile from './DealInfoProfile';

const DealInfo = ({ project, handleprojectedit, user }) => {
    return (
        <Box className='deal-info-wrapper'>
            <DealInfoProfile project={project} />
            <Box className='value-wrapper'>
                <Box className='left-wrapper'>
                    {/* Hide ProjectValue if user role is EPC */}
                    {user?.role !== "EPC" && <ProjectValue project={project} />}
                    {/* <ProjectValue project={project} /> */}
                    <ProjectStats project={project} />
                </Box>
                <Box className='right-wrapper'>
                    <DealMap />
                    <ButtonNav handleprojectedit={handleprojectedit} project={project} />
                </Box>
            </Box>
        </Box>
    );
};

export default DealInfo;
