import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React from 'react';



// const TopSaleCategory = ({ projects }) => {
//     if (!projects || projects.length === 0) return null;

//     // Calculate total project values
//     const totalValue = projects.reduce((sum, project) => {
//         if (project?.systemInfo?.systemSizeKW && project?.systemInfo?.epcInstall) {
//             return sum + project.systemInfo.systemSizeKW * project.systemInfo.epcInstall * 1000;
//         }
//         return sum;
//     }, 0);

//     // Categorize project values
//     let residentialValue = 0;
//     let commercialValue = 0;

//     projects.forEach(project => {
//         if (project?.systemInfo?.systemSizeKW && project?.systemInfo?.epcInstall) {
//             const projectValue = project.systemInfo.systemSizeKW * project.systemInfo.epcInstall * 1000;
//             if (projectValue < 10000) {
//                 residentialValue += projectValue;
//             } else {
//                 commercialValue += projectValue;
//             }
//         }
//     });

//     // Calculate percentages
//     const residentialPercentage = totalValue > 0 ? ((residentialValue / totalValue) * 100).toFixed(2) : 0;
//     const commercialPercentage = totalValue > 0 ? ((commercialValue / totalValue) * 100).toFixed(2) : 0;
//     const otherPercentage = 0;

//     return (
//         <Box className='top-sale-box'>
//             <Box className='sale-title'>
//                 <Box className='title'>
//                     <Typography component='h2'>Top Sale Category</Typography>
//                     <Tooltip title='Info' placement='top'>
//                         <IconButton className='info-tooltip' sx={{ p: 0 }}>
//                             <InfoOutlinedIcon />
//                         </IconButton>
//                     </Tooltip>
//                 </Box>
//             </Box>
//             <Typography className='last-days'>Last 30 days</Typography>
//             <Box className='scroll-new-category'>
//                 <Box className='sale-stats'>
//                     <Box className='stats'>
//                         <Typography component='h2'>${totalValue.toLocaleString()}</Typography>
//                     </Box>
//                 </Box>
//                 <Box className='stats-bars'>
//                     <Box className='bar residential' width={`${residentialPercentage}%`}></Box>
//                     <Box className='bar commercial' width={`${commercialPercentage}%`}></Box>
//                     <Box className='bar other' width={`${otherPercentage}%`}></Box>
//                 </Box>
//                 <Box className='stats-list-wrapper'>
//                     <Box className='stats-list'>
//                         <Box className='list-content'>
//                             <Typography>Residential</Typography>
//                         </Box>
//                         <Typography component='span'>{residentialPercentage}%</Typography>
//                     </Box>
//                     <Box className='stats-list'>
//                         <Box className='list-content'>
//                             <Typography>Commercial</Typography>
//                         </Box>
//                         <Typography component='span'>{commercialPercentage}%</Typography>
//                     </Box>
//                     <Box className='stats-list'>
//                         <Box className='list-content'>
//                             <Typography>Utility Scale</Typography>
//                         </Box>
//                         <Typography component='span'>{otherPercentage}%</Typography>
//                     </Box>
//                     <Box className='stats-list'>
//                         <Box className='list-content'>
//                             <Typography>Waste-To-Energy</Typography>
//                         </Box>
//                         <Typography component='span'>{otherPercentage}%</Typography>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };


const TopSaleCategory = ({ projects }) => {
    if (!projects || projects.length === 0) return null;

    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    // Filter projects from the last 30 days
    const recentProjects = projects.filter(project => {
        const projectDate = new Date(project?.createdAt);
        return projectDate >= thirtyDaysAgo && projectDate <= today;
    });

    // Calculate total project values
    const totalValue = recentProjects.reduce((sum, project) => {
        if (project?.systemInfo?.systemSizeKW && project?.systemInfo?.epcInstall) {
            return sum + project.systemInfo.systemSizeKW * project.systemInfo.epcInstall * 1000;
        }
        return sum;
    }, 0);

    // Categorize project values
    let residentialValue = 0;
    let commercialValue = 0;

    recentProjects.forEach(project => {
        if (project?.systemInfo?.systemSizeKW && project?.systemInfo?.epcInstall) {
            const projectValue = project.systemInfo.systemSizeKW * project.systemInfo.epcInstall * 1000;
            if (projectValue < 10000) {
                residentialValue += projectValue;
            } else {
                commercialValue += projectValue;
            }
        }
    });

    // Calculate percentages
    const residentialPercentage = totalValue > 0 ? Math.round((residentialValue / totalValue) * 100) : 0;
    const commercialPercentage = totalValue > 0 ? Math.round((commercialValue / totalValue) * 100) : 0;
    // const otherPercentage = 0;

    return (
        <Box className='top-sale-box'>
            <Box className='sale-title'>
                <Box className='title'>
                    <Typography component='h2'>Top Sale Category</Typography>
                    <Tooltip title='Info' placement='top'>
                        <IconButton className='info-tooltip' sx={{ p: 0 }}>
                            <InfoOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Typography className='last-days'>Last 30 days</Typography>
            <Box className='scroll-new-category'>
                <Box className='sale-stats'>
                    <Box className='stats'>
                        <Typography component='h2'>${totalValue.toLocaleString()}</Typography>
                    </Box>
                </Box>
                <Box className='stats-bars'>
                    <Box className='bar residential' width={`${residentialPercentage}%`}></Box>
                    <Box className='bar commercial' width={`${commercialPercentage}%`}></Box>
                    {/* <Box className='bar utility' width={`${otherPercentage}%`}></Box>
                    <Box className='bar waste-energy' width={`${otherPercentage}%`}></Box> */}

                </Box>
                <Box className='stats-list-wrapper'>
                    <Box className='stats-list'>
                        <Box className='list-content'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="12" fill="#F2F962" />
                                <g clip-path="url(#clip0_1_1043)">
                                    <path d="M9.33331 13.3333C9.33331 13.3333 10.3333 14.6667 12 14.6667C13.6666 14.6667 14.6666 13.3333 14.6666 13.3333M14 10H14.0066M9.33331 10H10.6666M18.6666 12C18.6666 15.6819 15.6819 18.6667 12 18.6667C8.31808 18.6667 5.33331 15.6819 5.33331 12C5.33331 8.31811 8.31808 5.33334 12 5.33334C15.6819 5.33334 18.6666 8.31811 18.6666 12ZM14.3333 10C14.3333 10.1841 14.1841 10.3333 14 10.3333C13.8159 10.3333 13.6666 10.1841 13.6666 10C13.6666 9.81592 13.8159 9.66668 14 9.66668C14.1841 9.66668 14.3333 9.81592 14.3333 10Z" stroke="#08080C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1_1043">
                                        <rect width="16" height="16" fill="white" transform="translate(4 4)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <Typography>Residential</Typography>
                        </Box>
                        <Typography component='span'>{residentialPercentage}%</Typography>
                    </Box>
                    <Box className='stats-list'>
                        <Box className='list-content'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="12" fill="#CCCEFD" />
                                <path d="M18 14.6667V8.79999C18 8.05325 18 7.67988 17.8547 7.39467C17.7268 7.14379 17.5229 6.93981 17.272 6.81198C16.9868 6.66666 16.6134 6.66666 15.8666 6.66666H8.13331C7.38658 6.66666 7.01321 6.66666 6.72799 6.81198C6.47711 6.93981 6.27314 7.14379 6.1453 7.39467C5.99998 7.67988 5.99998 8.05325 5.99998 8.79999V14.6667M7.11109 17.3333H16.8889C17.3022 17.3333 17.5088 17.3333 17.6784 17.2879C18.1385 17.1646 18.4979 16.8052 18.6212 16.3451C18.6666 16.1755 18.6666 15.9689 18.6666 15.5555C18.6666 15.3489 18.6666 15.2456 18.6439 15.1608C18.5823 14.9307 18.4026 14.751 18.1725 14.6894C18.0877 14.6667 17.9844 14.6667 17.7778 14.6667H6.2222C6.01554 14.6667 5.91221 14.6667 5.82743 14.6894C5.59737 14.751 5.41767 14.9307 5.35603 15.1608C5.33331 15.2456 5.33331 15.3489 5.33331 15.5555C5.33331 15.9689 5.33331 16.1755 5.37875 16.3451C5.50203 16.8052 5.86143 17.1646 6.32155 17.2879C6.49111 17.3333 6.69777 17.3333 7.11109 17.3333Z" stroke="#08080C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <Typography>Commercial </Typography>
                        </Box>
                        <Typography component='span'>{commercialPercentage}%</Typography>
                    </Box>
                    {/* <Box className='stats-list'>
                        <Box className='list-content'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="12" fill="#DAFDCC" />
                                <path d="M17.3334 18C17.3334 17.0696 17.3334 16.6044 17.2185 16.2259C16.96 15.3736 16.2931 14.7067 15.4408 14.4482C15.0623 14.3333 14.5971 14.3333 13.6667 14.3333H10.3334C9.40298 14.3333 8.93779 14.3333 8.55926 14.4482C7.70699 14.7067 7.04005 15.3736 6.78151 16.2259C6.66669 16.6044 6.66669 17.0696 6.66669 18M15 9C15 10.6569 13.6569 12 12 12C10.3432 12 9.00002 10.6569 9.00002 9C9.00002 7.34315 10.3432 6 12 6C13.6569 6 15 7.34315 15 9Z" stroke="#08080C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <Typography>Utility Scale</Typography>
                        </Box>
                        <Typography component='span'>{otherPercentage}%</Typography>
                    </Box>
                    <Box className='stats-list'>
                        <Box className='list-content'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="12" fill="#F9998A" />
                                <path d="M9.33331 18V8.66667C9.33331 8.04669 9.33331 7.7367 9.40146 7.48236C9.5864 6.79218 10.1255 6.25308 10.8157 6.06815C11.07 6 11.38 6 12 6C12.62 6 12.93 6 13.1843 6.06815C13.8745 6.25308 14.4136 6.79218 14.5985 7.48236C14.6666 7.7367 14.6666 8.04669 14.6666 8.66667V18M7.46665 18H16.5333C17.28 18 17.6534 18 17.9386 17.8547C18.1895 17.7268 18.3935 17.5229 18.5213 17.272C18.6666 16.9868 18.6666 16.6134 18.6666 15.8667V10.8C18.6666 10.0533 18.6666 9.6799 18.5213 9.39468C18.3935 9.1438 18.1895 8.93982 17.9386 8.81199C17.6534 8.66667 17.28 8.66667 16.5333 8.66667H7.46665C6.71991 8.66667 6.34654 8.66667 6.06133 8.81199C5.81044 8.93982 5.60647 9.1438 5.47864 9.39468C5.33331 9.6799 5.33331 10.0533 5.33331 10.8V15.8667C5.33331 16.6134 5.33331 16.9868 5.47864 17.272C5.60647 17.5229 5.81044 17.7268 6.06133 17.8547C6.34654 18 6.71991 18 7.46665 18Z" stroke="#08080C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <Typography>Waste-To-Energy</Typography>
                        </Box>
                        <Typography component='span'>{otherPercentage}%</Typography>
                    </Box> */}
                </Box>
            </Box>
        </Box>
    );
};

export default TopSaleCategory;





























// import { Box, Typography } from '@mui/material'
// import React from 'react'
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import Avatar from '@mui/material/Avatar';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import Tooltip from '@mui/material/Tooltip';

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Menu1', 'Menu2', 'Menu3'];

// const TopSaleCategory = () => {
//     const [anchorElNav, setAnchorElNav] = React.useState(null);
//     const [anchorElUser, setAnchorElUser] = React.useState(null);

//     const handleOpenNavMenu = (event) => {
//         setAnchorElNav(event.currentTarget);
//     };
//     const handleOpenUserMenu = (event) => {
//         setAnchorElUser(event.currentTarget);
//     };

//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };

//     return (
//         <>
//             <Box className='top-sale-box'>
//                 <Box className='sale-title'>
//                     <Box className='title'>
//                         <Typography component='h2'>Top Sale Category</Typography>
//                         <Tooltip title="Info" placement="top">
//                             <IconButton className='info-tooltip' sx={{ p: 0 }}>
//                                 <InfoOutlinedIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                     <Box className='icon'>
//                         <IconButton className='sale-menu' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                             <MoreVertIcon />
//                         </IconButton>
//                         <Menu
//                             sx={{ mt: '45px' }}
//                             id="menu-appbar"
//                             anchorEl={anchorElUser}
//                             anchorOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             open={Boolean(anchorElUser)}
//                             onClose={handleCloseUserMenu}
//                         >
//                             {settings.map((setting) => (
//                                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                                     <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
//                                 </MenuItem>
//                             ))}
//                         </Menu>
//                     </Box>
//                 </Box>
//                 <Typography className='last-days'>Last 30 days</Typography>
//                 <Box className="scroll-new-category">
//                     <Box className='sale-stats'>
//                         <Box className='stats'>
//                             <Typography component='h2'>$310,199</Typography>
//                             <Typography component='span'>
//                                 <svg width="7" height="16" viewBox="0 0 7 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M0 4.11111L3.11111 1M3.11111 1L6.22222 4.11111M3.11111 1V15" stroke="#24AA4A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                 </svg>
//                                 4%
//                             </Typography>
//                         </Box>
//                         <Typography>From $32,489</Typography>
//                     </Box>
//                     <Box className='stats-bars'>
//                         <Box className='bar residential' width="55%"></Box>
//                         <Box className='bar commercial' width="19%"></Box>
//                         <Box className='bar utility' width="15%"></Box>
//                         <Box className='bar waste-energy' width="10%"></Box>
//                     </Box>
//                     <Box className='stats-list-wrapper'>
//                         <Box className='stats-list'>
//                             <Box className='list-content'>
//                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <rect width="24" height="24" rx="12" fill="#F2F962" />
//                                     <g clip-path="url(#clip0_1_1043)">
//                                         <path d="M9.33331 13.3333C9.33331 13.3333 10.3333 14.6667 12 14.6667C13.6666 14.6667 14.6666 13.3333 14.6666 13.3333M14 10H14.0066M9.33331 10H10.6666M18.6666 12C18.6666 15.6819 15.6819 18.6667 12 18.6667C8.31808 18.6667 5.33331 15.6819 5.33331 12C5.33331 8.31811 8.31808 5.33334 12 5.33334C15.6819 5.33334 18.6666 8.31811 18.6666 12ZM14.3333 10C14.3333 10.1841 14.1841 10.3333 14 10.3333C13.8159 10.3333 13.6666 10.1841 13.6666 10C13.6666 9.81592 13.8159 9.66668 14 9.66668C14.1841 9.66668 14.3333 9.81592 14.3333 10Z" stroke="#08080C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
//                                     </g>
//                                     <defs>
//                                         <clipPath id="clip0_1_1043">
//                                             <rect width="16" height="16" fill="white" transform="translate(4 4)" />
//                                         </clipPath>
//                                     </defs>
//                                 </svg>
//                                 <Typography>Residential</Typography>
//                             </Box>
//                             <Typography component='span'>80%</Typography>
//                         </Box>
//                         <Box className='stats-list'>
//                             <Box className='list-content'>
//                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <rect width="24" height="24" rx="12" fill="#CCCEFD" />
//                                     <path d="M18 14.6667V8.79999C18 8.05325 18 7.67988 17.8547 7.39467C17.7268 7.14379 17.5229 6.93981 17.272 6.81198C16.9868 6.66666 16.6134 6.66666 15.8666 6.66666H8.13331C7.38658 6.66666 7.01321 6.66666 6.72799 6.81198C6.47711 6.93981 6.27314 7.14379 6.1453 7.39467C5.99998 7.67988 5.99998 8.05325 5.99998 8.79999V14.6667M7.11109 17.3333H16.8889C17.3022 17.3333 17.5088 17.3333 17.6784 17.2879C18.1385 17.1646 18.4979 16.8052 18.6212 16.3451C18.6666 16.1755 18.6666 15.9689 18.6666 15.5555C18.6666 15.3489 18.6666 15.2456 18.6439 15.1608C18.5823 14.9307 18.4026 14.751 18.1725 14.6894C18.0877 14.6667 17.9844 14.6667 17.7778 14.6667H6.2222C6.01554 14.6667 5.91221 14.6667 5.82743 14.6894C5.59737 14.751 5.41767 14.9307 5.35603 15.1608C5.33331 15.2456 5.33331 15.3489 5.33331 15.5555C5.33331 15.9689 5.33331 16.1755 5.37875 16.3451C5.50203 16.8052 5.86143 17.1646 6.32155 17.2879C6.49111 17.3333 6.69777 17.3333 7.11109 17.3333Z" stroke="#08080C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
//                                 </svg>
//                                 <Typography>Commercial </Typography>
//                             </Box>
//                             <Typography component='span'>57%</Typography>
//                         </Box>
//                         <Box className='stats-list'>
//                             <Box className='list-content'>
//                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <rect width="24" height="24" rx="12" fill="#DAFDCC" />
//                                     <path d="M17.3334 18C17.3334 17.0696 17.3334 16.6044 17.2185 16.2259C16.96 15.3736 16.2931 14.7067 15.4408 14.4482C15.0623 14.3333 14.5971 14.3333 13.6667 14.3333H10.3334C9.40298 14.3333 8.93779 14.3333 8.55926 14.4482C7.70699 14.7067 7.04005 15.3736 6.78151 16.2259C6.66669 16.6044 6.66669 17.0696 6.66669 18M15 9C15 10.6569 13.6569 12 12 12C10.3432 12 9.00002 10.6569 9.00002 9C9.00002 7.34315 10.3432 6 12 6C13.6569 6 15 7.34315 15 9Z" stroke="#08080C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
//                                 </svg>
//                                 <Typography>Utility Scale</Typography>
//                             </Box>
//                             <Typography component='span'>46%</Typography>
//                         </Box>
//                         <Box className='stats-list'>
//                             <Box className='list-content'>
//                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <rect width="24" height="24" rx="12" fill="#F9998A" />
//                                     <path d="M9.33331 18V8.66667C9.33331 8.04669 9.33331 7.7367 9.40146 7.48236C9.5864 6.79218 10.1255 6.25308 10.8157 6.06815C11.07 6 11.38 6 12 6C12.62 6 12.93 6 13.1843 6.06815C13.8745 6.25308 14.4136 6.79218 14.5985 7.48236C14.6666 7.7367 14.6666 8.04669 14.6666 8.66667V18M7.46665 18H16.5333C17.28 18 17.6534 18 17.9386 17.8547C18.1895 17.7268 18.3935 17.5229 18.5213 17.272C18.6666 16.9868 18.6666 16.6134 18.6666 15.8667V10.8C18.6666 10.0533 18.6666 9.6799 18.5213 9.39468C18.3935 9.1438 18.1895 8.93982 17.9386 8.81199C17.6534 8.66667 17.28 8.66667 16.5333 8.66667H7.46665C6.71991 8.66667 6.34654 8.66667 6.06133 8.81199C5.81044 8.93982 5.60647 9.1438 5.47864 9.39468C5.33331 9.6799 5.33331 10.0533 5.33331 10.8V15.8667C5.33331 16.6134 5.33331 16.9868 5.47864 17.272C5.60647 17.5229 5.81044 17.7268 6.06133 17.8547C6.34654 18 6.71991 18 7.46665 18Z" stroke="#08080C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
//                                 </svg>
//                                 <Typography>Waste-To-Energy</Typography>
//                             </Box>

//                             <Typography component='span'>16%</Typography>
//                         </Box>
//                     </Box>
//                 </Box>
//             </Box>
//         </>
//     )
// }

// export default TopSaleCategory