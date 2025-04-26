import { Box } from '@mui/material'
import React from 'react'
import DealInfoProfile from './DealInfoProfile'
import ProjectStats from './ProjectStats'
import DealMap from './DealMap'

const ConstructionFlowInfo = ({ project, user }) => {
    return (
        <>
            <Box className='deal-info-wrapper'>
                <DealInfoProfile  project={project}/>
                <Box className='value-wrapper'>
                    <Box className='left-wrapper'>
                        <ProjectStats project={project}/>
                    </Box>
                    <Box className='right-wrapper'>
                        <DealMap />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ConstructionFlowInfo;