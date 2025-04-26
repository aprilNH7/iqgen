import { Box, Typography,Button, IconButton } from '@mui/material'
import React from 'react'
import Avatar from '@mui/joy/Avatar';

const Convoparticipants = () => {
  return (
    <Box className="praticipants-wrapper">
         <Box className='praticipants'>
                <Typography component='h2'>12 participants</Typography>
                <Button variant="plain" class="praticipant-btn">See All</Button>
         </Box>
          <Box className="pracicipant-box">
            <Box className="pracicipant-data">
             <Avatar src=''>
             </Avatar>
            <Box className="pracicipant-mssge">
             <Typography component='body1'>Niles Peppertrout</Typography>
             <Typography component='body2'>Sorry! I am busy.</Typography>
            </Box>
             </Box>
             <Box className="pracicipant-data">
             <Avatar src=''>
             </Avatar>
            <Box className="pracicipant-mssge">
             <Typography component='body1'>Jason Response</Typography>
             <Typography component='body2'>At work</Typography>
            </Box>
             </Box>
             <Box className="pracicipant-data">
             <Avatar src=''>
             </Avatar>
            <Box className="pracicipant-mssge">
             <Typography component='body1'>Niles Peppertrout</Typography>
             <Typography component='body2'>Sorry! I am busy.</Typography>
            </Box>
             </Box>
             <Box className="pracicipant-data">
             <Avatar src=''>
             </Avatar>
            <Box className="pracicipant-mssge">
             <Typography component='body1'>Jason Response</Typography>
             <Typography component='body2'>At home</Typography>
            </Box>
             </Box>
          </Box>
          <Box className='praticipants'>
                <Typography component='h2'>shared media</Typography>
                <Button variant="plain" class="praticipant-btn">See All</Button>
         </Box>
         <Box className="pracicipant-box">
            <Box className="pracicipant-data">
             <IconButton>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="50" height="50" rx="25" fill="#275021"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M27 15H19C17.8954 15 17 15.8954 17 17V33C17 34.1046 17.8954 35 19 35H31C32.1046 35 33 34.1046 33 33V21L27 15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M27 15V21H33" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M29 26H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M29 30H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23 22H22H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
             </IconButton>
            <Box className="pracicipant-mssge">
             <Typography component='body1'>Report.pdf</Typography>
             <Typography component='body2'>1,6 Mb</Typography>
            </Box>
             </Box>
             <Box className="pracicipant-data">
             <IconButton>
             <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
             <rect width="50" height="50" rx="25" fill="#275021"/>
             <rect x="17" y="17" width="18" height="18" rx="2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             <circle cx="22.5" cy="22.5" r="1.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             <path d="M35 29L30 24L19 35" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
             </IconButton>
            <Box className="pracicipant-mssge">
             <Typography component='body1'>Design Photo.png</Typography>
             <Typography component='body2'>1,2 Mb</Typography>
            </Box>
             </Box>
             <Box className="pracicipant-data">
             <IconButton>
             <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="25" fill="#275021"/>
            <path d="M22 31V18L34 16V29" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="19" cy="31" r="3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="31" cy="29" r="3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
             </IconButton>
            <Box className="pracicipant-mssge">
             <Typography component='body1'>Audio.zip</Typography>
             <Typography component='body2'>1,8 Mb</Typography>
            </Box>
             </Box>
             <Box className="pracicipant-data">
             <IconButton>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="25" fill="#275021"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M36 20L29 25L36 30V20V20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="14" y="18" width="15" height="14" rx="2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
             </IconButton>
            <Box className="pracicipant-mssge">
             <Typography component='body1'>Funny.mp4</Typography>
             <Typography component='body2'>1,3 Mb</Typography>
            </Box>
             </Box>
          </Box>
    </Box>
  )
}

export default Convoparticipants