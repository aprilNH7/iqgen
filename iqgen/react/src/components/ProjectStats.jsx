import { Avatar, Box, IconButton, Typography } from '@mui/material';
import React from 'react';

const dollorimg = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M19.3621 7.5C19.497 7.66067 19.6249 7.8275 19.7453 8C20.5361 9.13383 20.9999 10.5128 20.9999 12C20.9999 13.4872 20.5361 14.8662 19.7453 16C19.6249 16.1725 19.497 16.3393 19.3621 16.5M10.5 8.5C11.8807 8.5 13 9.2835 13 10.25M10.5 8.5C9.11929 8.5 8 9.2835 8 10.25C8 11.2165 9.11929 12 10.5 12M10.5 8.5V7.25M10.5 8.5V12M10.5 12C11.8807 12 13 12.7835 13 13.75C13 14.7165 11.8807 15.5 10.5 15.5M10.5 12V15.5M10.5 15.5C9.11929 15.5 8 14.7165 8 13.75M10.5 15.5V16.75M18 12C18 16.1421 14.6421 19.5 10.5 19.5C6.35786 19.5 3 16.1421 3 12C3 7.85786 6.35786 4.5 10.5 4.5C14.6421 4.5 18 7.85786 18 12Z" stroke="#282930" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
)

const statusup = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" fill="white"/>
    <path d="M5.7334 15.125V13.4" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M10 15.125V11.675" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M14.2666 15.125V9.94167" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M14.2667 4.875L13.8834 5.325C11.7584 7.80833 8.9084 9.56667 5.7334 10.3583" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M11.825 4.875H14.2666V7.30833" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.50008 18.3333H12.5001C16.6667 18.3333 18.3334 16.6667 18.3334 12.5V7.50001C18.3334 3.33334 16.6667 1.66667 12.5001 1.66667H7.50008C3.33341 1.66667 1.66675 3.33334 1.66675 7.50001V12.5C1.66675 16.6667 3.33341 18.3333 7.50008 18.3333Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    )

const circleIcon = (
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.4799 4.16666C5.64147 4.56575 4.88843 5.13121 4.26718 5.83187C3.48089 6.71866 2.93164 7.79279 2.67126 8.95292C2.41087 10.113 2.44792 11.3209 2.77893 12.4626C3.10993 13.6043 3.72397 14.6421 4.56312 15.4783C5.40227 16.3144 6.43887 16.9212 7.57512 17.2414C8.71137 17.5617 9.90981 17.5848 11.0574 17.3087C12.205 17.0326 13.2639 16.4662 14.1342 15.6631C14.8432 15.0089 15.408 14.215 15.7953 13.3333" stroke="#282930" stroke-width="1.5" stroke-linecap="round"/>
<path d="M16.1948 10.8333C16.9711 10.8333 17.6123 10.1998 17.4835 9.43421C17.3783 8.8084 17.2024 8.19498 16.9584 7.60591C16.5346 6.5827 15.9134 5.65298 15.1302 4.86984C14.3471 4.0867 13.4174 3.46549 12.3942 3.04166C11.8051 2.79766 11.1917 2.62183 10.5659 2.51655C9.80033 2.38776 9.16675 3.02899 9.16675 3.80529L9.16675 9.42772C9.16675 10.204 9.79606 10.8333 10.5724 10.8333H16.1948Z" stroke="#282930" stroke-width="1.5"/>
</svg>
)

const calendericon = (
<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="18" height="20" fill="white"/>
<path d="M15.7499 3.3125H14.2874V2.625C14.2874 2.25 14.0062 1.90625 13.6405 1.90625C13.2749 1.90625 12.9937 2.21875 12.9937 2.625V3.3125H4.97803V2.625C4.97803 2.25 4.69678 1.90625 4.33115 1.90625C3.96553 1.90625 3.68428 2.21875 3.68428 2.625V3.3125H2.2499C1.29365 3.3125 0.478027 4.1875 0.478027 5.28125V16.1563C0.478027 17.2188 1.26553 18.125 2.2499 18.125H15.7499C16.7062 18.125 17.5218 17.25 17.5218 16.1563V5.25C17.5218 4.1875 16.7062 3.3125 15.7499 3.3125ZM1.77178 9.125H4.1624V12.2188H1.77178V9.125ZM5.42803 9.125H8.38115V12.2188H5.42803V9.125ZM8.38115 13.625V16.6875H5.42803V13.625H8.38115ZM9.64678 13.625H12.5999V16.6875H9.64678V13.625ZM9.64678 12.2188V9.125H12.5999V12.2188H9.64678ZM13.8374 9.125H16.228V12.2188H13.8374V9.125ZM2.2499 4.71875H3.7124V5.375C3.7124 5.75 3.99365 6.09375 4.35928 6.09375C4.7249 6.09375 5.00615 5.78125 5.00615 5.375V4.71875H13.0499V5.375C13.0499 5.75 13.3312 6.09375 13.6968 6.09375C14.0624 6.09375 14.3437 5.78125 14.3437 5.375V4.71875H15.7499C16.0312 4.71875 16.2562 4.96875 16.2562 5.28125V7.71875H1.77178V5.28125C1.77178 4.96875 1.96865 4.71875 2.2499 4.71875ZM1.77178 16.125V13.5938H4.1624V16.6563H2.2499C1.96865 16.6875 1.77178 16.4375 1.77178 16.125ZM15.7499 16.6875H13.8374V13.625H16.228V16.1563C16.2562 16.4375 16.0312 16.6875 15.7499 16.6875Z" fill="black"/>
</svg>
)


const thundericon = (
<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.16655 6.39348L5.51541 6.31349L5.46809 0.70593C5.51763 -0.0604102 5.00006 -0.413982 4.45808 0.753126L0.296019 8.37653C-0.18311 9.21326 -0.115825 9.50444 0.758141 9.59563H4.45512L4.55198 14.8536C4.53941 15.9815 4.9764 16.5815 5.61523 15.1992L9.81944 7.4118C10.1758 6.82945 10.0279 6.41108 9.16655 6.39348Z" fill="black"/>
</svg>
)

const boundIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.83333 4.16667C5.83333 5.08714 5.08714 5.83333 4.16667 5.83333M5.83333 4.16667C5.83333 3.24619 5.08714 2.5 4.16667 2.5C3.24619 2.5 2.5 3.24619 2.5 4.16667C2.5 5.08714 3.24619 5.83333 4.16667 5.83333M5.83333 4.16667H14.1667M4.16667 5.83333V14.1667M5.83333 15.8333C5.83333 16.7538 5.08714 17.5 4.16667 17.5C3.24619 17.5 2.5 16.7538 2.5 15.8333C2.5 14.9129 3.24619 14.1667 4.16667 14.1667M5.83333 15.8333C5.83333 14.9129 5.08714 14.1667 4.16667 14.1667M5.83333 15.8333H14.1667M15.8333 5.83333C16.7538 5.83333 17.5 5.08714 17.5 4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5C14.9129 2.5 14.1667 3.24619 14.1667 4.16667M15.8333 5.83333C14.9129 5.83333 14.1667 5.08714 14.1667 4.16667M15.8333 5.83333V14.1667M14.1667 15.8333C14.1667 16.7538 14.9129 17.5 15.8333 17.5C16.7538 17.5 17.5 16.7538 17.5 15.8333C17.5 14.9129 16.7538 14.1667 15.8333 14.1667M14.1667 15.8333C14.1667 14.9129 14.9129 14.1667 15.8333 14.1667" stroke="#282930" stroke-width="1.5"/>
   </svg>

)


const ProjectStats = ({ project }) => {

    // if (!project) return;





    return (
    <>
 
      {!project ?   
         <Box className='project-stats-wrapper'>
         {/* <Typography component='h3'>Project ID: {project._id}</Typography>  */}
        {/* <IconButton className='project-stats-link' aria-label="link">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.23217 5.28595H14.5473C14.6394 5.28595 14.714 5.36057 14.714 5.45262V11.7678M14.6652 5.33477L5.28589 14.714" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </IconButton> */}

        <Box className='project-stats'>
            <Box className='stats-box'>
                <Avatar className='stats-image' alt="Current Rate" >
                  {dollorimg}
                </Avatar>
                <Box className='stats-content'>
                    <Typography component='h4'>NA c/KWh</Typography>
                    <Typography component='span'>Current Rate</Typography>
                </Box>
            </Box>

            <Box className='stats-box'>
                <Avatar className='stats-image' alt="PPA Rate">
                 {circleIcon}
                </Avatar>
                <Box className='stats-content'>
                    <Typography component='h4'>NA c/KWh</Typography>
                    <Typography component='span'>PPA Rate</Typography>
                </Box>
            </Box>
            
            <Box className='stats-box'>
                <Avatar className='stats-image' alt="REC Value">
                {dollorimg}
                </Avatar>
                <Box className='stats-content'>
                    <Typography component='h4'>$Na</Typography>
                    <Typography component='span'>REC Value</Typography>
                </Box>
            </Box>
        </Box>

        <Box className='project-stats'>
            <Box className='stats-box'>
                <Avatar className='stats-image' alt="EPC Install Cost" >{dollorimg}</Avatar>                    
                <Box className='stats-content'>
                    <Typography component='h4'>$ NA /W</Typography>
                    <Typography component='span'>EPC Install</Typography>
                </Box>
            </Box>
            <Box className='stats-box'>
                <Avatar className='stats-image' alt="System Production" >{thundericon}</Avatar>
                <Box className='stats-content'>
                    <Typography component='h4'>{"NA" }</Typography>
                    <Typography component='span'>System Production</Typography>
                </Box>
            </Box>
            <Box className='stats-box'>
                <Avatar className='stats-image' alt="System Size" >{boundIcon}</Avatar>                   
                <Box className='stats-content'>
                    <Typography component='h4'>{"NA"}</Typography>
                    <Typography component='span'>System Size KW</Typography>
                </Box>
            </Box>
        </Box>

        <Box className='project-stats'>
            <Box className='stats-box'>
                <Avatar className='stats-image' alt="PPA Term" >{calendericon}</Avatar>
                <Box className='stats-content'>
                    <Typography component='h4'>{"NA"} years</Typography>
                    <Typography component='span'>PPA Term</Typography>
                </Box>
            </Box>
            <Box className='stats-box'>
                <Avatar className='stats-image' alt="Escalator" >
                  {statusup}    
                </Avatar>
               <Box className='stats-content'>
                    <Typography component='h4'>{"NA"}%</Typography>
                    <Typography component='span'>Escalator</Typography>
                </Box>
            </Box>
        </Box>
    </Box> :
    <Box className='project-stats-wrapper'>
    <Typography component='h3'>Project ID: {project._id}</Typography>
    {/* <IconButton className='project-stats-link' aria-label="link">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.23217 5.28595H14.5473C14.6394 5.28595 14.714 5.36057 14.714 5.45262V11.7678M14.6652 5.33477L5.28589 14.714" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    </IconButton> */}

    <Box className='project-stats'>
        <Box className='stats-box'>
            <Avatar className='stats-image' alt="Current Rate" >
              {dollorimg}
            </Avatar>
            <Box className='stats-content'>
                <Typography component='h4'>{project.systemInfo.currentRate}c/KWh</Typography>
                <Typography component='span'>Current Rate</Typography>
            </Box>
        </Box>

        <Box className='stats-box'>
            <Avatar className='stats-image' alt="PPA Rate">
             {circleIcon}
            </Avatar>
            <Box className='stats-content'>
                <Typography component='h4'>{project.systemInfo.ppaRate} c/KWh</Typography>
                <Typography component='span'>PPA Rate</Typography>
            </Box>
        </Box>
        
        <Box className='stats-box'>
            <Avatar className='stats-image' alt="REC Value">
            {dollorimg}
            </Avatar>
            <Box className='stats-content'>
                <Typography component='h4'>${project.systemInfo.recValue}</Typography>
                <Typography component='span'>REC Value</Typography>
            </Box>
        </Box>
    </Box>

    <Box className='project-stats'>
        <Box className='stats-box'>
            <Avatar className='stats-image' alt="EPC Install Cost" >{dollorimg}</Avatar>                    
            <Box className='stats-content'>
                <Typography component='h4'>${project.systemInfo.epcInstall}/W</Typography>
                <Typography component='span'>EPC Install</Typography>
            </Box>
        </Box>
        <Box className='stats-box'>
            <Avatar className='stats-image' alt="System Production" >{thundericon}</Avatar>
            <Box className='stats-content'>
                <Typography component='h4'>{project.systemInfo.systemProduction }</Typography>
                <Typography component='span'>System Production</Typography>
            </Box>
        </Box>
        <Box className='stats-box'>
            <Avatar className='stats-image' alt="System Size" >{boundIcon}</Avatar>                   
            <Box className='stats-content'>
                <Typography component='h4'>{project.systemInfo.systemSizeKW }</Typography>
                <Typography component='span'>System Size KW</Typography>
            </Box>
        </Box>
    </Box>

    <Box className='project-stats'>
        <Box className='stats-box'>
            <Avatar className='stats-image' alt="PPA Term" >{calendericon}</Avatar>
            <Box className='stats-content'>
                <Typography component='h4'>{project.systemInfo.ppaTerm} years</Typography>
                <Typography component='span'>PPA Term</Typography>
            </Box>
        </Box>
        <Box className='stats-box'>
            <Avatar className='stats-image' alt="Escalator" >
              {statusup}    
            </Avatar>
           <Box className='stats-content'>
                <Typography component='h4'>{project.systemInfo.escalator }%</Typography>
                <Typography component='span'>Escalator</Typography>
            </Box>
        </Box>
    </Box>
    </Box> }
    </>
    );
};

export default ProjectStats;