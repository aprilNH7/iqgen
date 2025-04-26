import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box, Typography } from '@mui/material'
import React from 'react'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));



const DashboardHeader = ({ projects }) => {

  // Calculate the total system size in kW
  const totalCapacityInstalled = projects?.reduce((acc, project) => {
    return acc + (project.systemInfo?.systemSizeKW || 0);
  }, 0).toLocaleString();

  // Calculate the total sales
  // const totalSales = projects?.reduce((acc, project) => {
  //   return acc + (project.systemInfo?.epcInstall || 0);
  // }, 0).toLocaleString();

  //calculate all project value for total sales 
  const totalSales = projects.reduce((sum, project) => {
    if (project?.systemInfo?.systemSizeKW && project?.systemInfo?.epcInstall) {
      return sum + project.systemInfo.systemSizeKW * project.systemInfo.epcInstall * 1000;
    }
    return sum;
  }, 0).toLocaleString();


  return (
    <>
      <Box className='dashboard-header'>
        <Box className='dashboard-title'>
          <Typography component='h1'>DashBoard</Typography>
          <Search className='dashboard-search'>
            <Box className='search-icon'>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3556 17.3658C18.8279 15.8961 19.7388 13.8641 19.7388 11.6194C19.7388 7.13518 16.1036 3.5 11.6194 3.5C7.13518 3.5 3.5 7.13518 3.5 11.6194C3.5 16.1036 7.13518 19.7388 11.6194 19.7388C13.8589 19.7388 15.8866 18.8321 17.3556 17.3658ZM17.3556 17.3658L20.5 20.5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </Box>
            <StyledInputBase
              className='search'
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>
        <Box className='dashboard-content'>
          <Box className='sales-card'>
            <Box className='sale-card'>
              <Box className='sale-title'>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="16" fill="black" />
                  <g clip-path="url(#clip0_1_1367)">
                    <path d="M13.6667 17.7778C13.6667 18.6369 14.3631 19.3333 15.2222 19.3333H16.6667C17.5871 19.3333 18.3333 18.5872 18.3333 17.6667C18.3333 16.7462 17.5871 16 16.6667 16H15.3333C14.4129 16 13.6667 15.2538 13.6667 14.3333C13.6667 13.4129 14.4129 12.6667 15.3333 12.6667H16.7778C17.6369 12.6667 18.3333 13.3631 18.3333 14.2222M16 11.6667V12.6667M16 19.3333V20.3333M22.6667 16C22.6667 19.6819 19.6819 22.6667 16 22.6667C12.3181 22.6667 9.33334 19.6819 9.33334 16C9.33334 12.3181 12.3181 9.33334 16 9.33334C19.6819 9.33334 22.6667 12.3181 22.6667 16Z" stroke="#F2F962" stroke-width="1.15919" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_1367">
                      <rect width="16" height="16" fill="white" transform="translate(8 8)" />
                    </clipPath>
                  </defs>
                </svg>
                <Typography>Total Sales</Typography>
              </Box>
              <Box className='sale-content'>
                <Typography component='h2'>${totalSales}</Typography>
                {/* <Typography>+1.03</Typography> */}
              </Box>
            </Box>
            <Box className='sale-card'>
              <Box className='sale-title'>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.272064" width="31.4559" height="31.4559" rx="15.7279" fill="black" />
                  <g clip-path="url(#clip0_1_1385)">
                    <path d="M13.474 17.7173C13.474 18.5472 14.1467 19.22 14.9766 19.22H16.3719C17.2611 19.22 17.9819 18.4992 17.9819 17.61C17.9819 16.7208 17.2611 16 16.3719 16H15.084C14.1948 16 13.474 15.2792 13.474 14.39C13.474 13.5008 14.1948 12.78 15.084 12.78H16.4793C17.3092 12.78 17.9819 13.4528 17.9819 14.2827M15.7279 11.814V12.78M15.7279 19.22V20.186M22.1679 16C22.1679 19.5567 19.2846 22.4399 15.7279 22.4399C12.1713 22.4399 9.288 19.5567 9.288 16C9.288 12.4433 12.1713 9.56006 15.7279 9.56006C19.2846 9.56006 22.1679 12.4433 22.1679 16Z" stroke="#DAFDCC" stroke-width="1.15919" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_1385">
                      <rect width="15.4559" height="15.4559" fill="white" transform="translate(8 8.27206)" />
                    </clipPath>
                  </defs>
                </svg>
                <Typography>Total Capacity Installed</Typography>
              </Box>
              <Box className='sale-content'>
                <Typography component='h2'>{totalCapacityInstalled} kW</Typography>
                {/* <Typography>+1.03</Typography> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DashboardHeader