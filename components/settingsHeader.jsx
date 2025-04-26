import { Box, Button, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import Avatar from '@mui/joy/Avatar';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Link } from 'react-router-dom';



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

const SettingHeader = () => {

    return (
        <>
            <Box component='header' className="setting-header">
                <Box sx={{ display: { xs: 'none', sm: 'block' } }} className="logo">
                    <Link to="/dashboard">
                        <img
                            src='images/logo.png'
                            alt='logo'
                            loading="lazy"
                        />
                    </Link>
                </Box>
                {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }} className="logo">
                    <img
                        src='images/logo.png'
                        alt='logo'
                        loading="lazy"
                    />
                </Box> */}
                <Box className='header-content'>
                    <Typography component='h1'>Settings</Typography>
                    <Typography>Smart Power. Smarter Future.</Typography>
                </Box>
                <Box className='header-search'>
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
            </Box >
        </>
    )
}

export default SettingHeader