import { Box, Button, Typography } from '@mui/material'
import React, { useRef, useState, useEffect } from 'react'
import Avatar from '@mui/joy/Avatar';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from "axios";





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

const MainHeader = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [user, setUser] = useState(null);


    const handleClick = () => {
        fileInputRef.current.click(); // Opens file dialog
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };


    useEffect(() => {
        fetchUserDetails();
    }, []);



    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/detail`, {
                withCredentials: true,
            });
            setUser(response.data.user);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };



    return (
        <>
            <Box component='header'>
                <Box className='header-content'>
                    <Typography component='h1'>Deals</Typography>
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
                    {/* <Badge
                        className='header-profile'
                        onClick={handleClick}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="plain"
                        badgeContent={
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="10.3728" cy="10.0638" rx="9.71879" ry="9.40947" fill="#00BA9D" />
                                <path d="M6.97168 3.16016C7.22168 2.51432 7.70085 2.17057 8.40918 2.12891H12.2217C12.93 2.17057 13.4092 2.51432 13.6592 3.16016L13.9717 4.12891H16.3154C16.8779 4.14974 17.3467 4.34766 17.7217 4.72266C18.0967 5.09766 18.2946 5.56641 18.3154 6.12891V14.1289C18.2946 14.6914 18.0967 15.1602 17.7217 15.5352C17.3467 15.9102 16.8779 16.1081 16.3154 16.1289H4.31543C3.75293 16.1081 3.28418 15.9102 2.90918 15.5352C2.53418 15.1602 2.33626 14.6914 2.31543 14.1289V6.12891C2.33626 5.56641 2.53418 5.09766 2.90918 4.72266C3.28418 4.34766 3.75293 4.14974 4.31543 4.12891H6.65918L6.97168 3.16016ZM10.3154 13.1289C11.1696 13.1081 11.8779 12.8164 12.4404 12.2539C13.0029 11.6914 13.2946 10.9831 13.3154 10.1289C13.2946 9.27474 13.0029 8.56641 12.4404 8.00391C11.8779 7.44141 11.1696 7.14974 10.3154 7.12891C9.46126 7.14974 8.75293 7.44141 8.19043 8.00391C7.62793 8.56641 7.33626 9.27474 7.31543 10.1289C7.33626 10.9831 7.62793 11.6914 8.19043 12.2539C8.75293 12.8164 9.46126 13.1081 10.3154 13.1289Z" fill="white" />
                            </svg>
                        }
                        badgeInset="14%"
                        sx={{ '--Badge-paddingX': '0px' }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        /> */}
                    <Avatar
                        className='profile-img'
                        alt="Profile"
                        src={user?.profileImage ? `http://98.83.66.76:5002/uploads/${user?.profileImage || ""}` : ''}
                        sx={{ width: 52, height: 52 }}
                    />
                    {/* </Badge> */}
                </Box>
            </Box >
        </>
    )
}




export default MainHeader