import { Box, Typography } from '@mui/material'
import React from 'react'

const DashboardStats = ({ pendingSubmissions, fullSubmissions, approved, funded }) => {
    // if (!projects) return null;


    return (
        <>
            <Box className='dasboard-stats-box'>
                <Box className='stats-box lead'>
                    <Typography component='h2'>Leads</Typography>
                    <Typography>
                        ${pendingSubmissions.reduce((acc, p) => acc + p.systemInfo.epcInstall, 0)} | {pendingSubmissions.length} Deals
                    </Typography>
                </Box>
                <Box className='stats-box submissions'>
                    <Typography component='h2'>Full Submissions</Typography>
                    <Typography>
                        ${fullSubmissions.reduce((acc, p) => acc + p.systemInfo.epcInstall, 0)} | {fullSubmissions.length} Deals
                    </Typography>
                </Box>
                <Box className='stats-box approved'>
                    <Typography component='h2'>Approved</Typography>
                    <Typography>
                        ${approved.reduce((acc, p) => acc + p.systemInfo.epcInstall, 0)} | {approved.length} Deals
                    </Typography>
                </Box>
                <Box className='stats-box funded'>
                    <Typography component='h2'>Funded</Typography>
                    <Typography>
                        ${funded.reduce((acc, p) => acc + p.systemInfo.epcInstall, 0)} | {funded.length} Deal
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default DashboardStats;
