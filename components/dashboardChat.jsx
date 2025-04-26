import { Avatar, Box, Typography } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import DashboardSummary from './DashboardSummary';
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
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#4BEE22',
        color: '#4BEE22',
        boxShadow: `0 0 0 2px #4BEE22`,
    },
}));

const socket = io(`https://iqgen.energy`, { transports: ["websocket"] });

const DashboardChat = ({ user }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            socket.emit('addUser', {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImage: user.profileImage,
                email: user.email
            });
        }

        socket.on('getUsers', (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socket.off('getUsers');
        };
    }, [user]);

    const filteredUsers = onlineUsers.filter((onlineUser) => {
        const fullName = `${onlineUser.firstName} ${onlineUser.lastName}`.toLowerCase();
        const email = onlineUser.email.toLowerCase();
        return (
            fullName.includes(searchQuery.toLowerCase()) ||
            email.includes(searchQuery.toLowerCase())
        );
    });

    return (
        <Box className='chat-wrapper'>
            <Box className='chat-header'>
                <Box className='image'>
                    <Avatar
                        className='profile-img'
                        alt="Profile"
                        src={user?.profileImage ? `http://98.83.66.76:5002/uploads/${user?.profileImage}` : ''}
                        sx={{ width: 55, height: 55 }}
                    />
                </Box>
                <Box className='content'>
                    <Typography component="h2">{`${user?.firstName} ${user?.lastName}`}</Typography>
                    <Typography>{user?.email}</Typography>
                </Box>
            </Box>
            <Box mt={2} mb={2}>
                <DashboardSummary userId={user?._id} />
            </Box>
            <Box className='online-people'>
                <Typography component='h3'>Online People</Typography>
                <AvatarGroup className='online-list' total={onlineUsers.length}>
                    {onlineUsers.map((onlineUser) => (
                        <StyledBadge
                            key={onlineUser.userId}
                            className='online-image'
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar
                                className='image'
                                alt={`${onlineUser.firstName} ${onlineUser.lastName}`}
                                src={onlineUser.profileImage ? `http://98.83.66.76:5002/uploads/${onlineUser.profileImage}` : ''}
                            />
                        </StyledBadge>
                    ))}
                </AvatarGroup>
            </Box>

            <Search className='dashboard-search'>
                <Box className='search-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a5.5 5.5 0 1 1 .707-.707l3.646 3.646a1 1 0 0 1-1.414 1.414l-3.646-3.646zM12.5 6a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0z" />
                    </svg>
                </Box>
                <StyledInputBase
                    className='search'
                    placeholder="Search by name or email…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Search>

            <Box className='chat-list'>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((onlineUser) => (
                        <Box key={onlineUser.userId} className='chat-box'>
                            <Box className='chat-image'>
                                <img
                                    src={onlineUser.profileImage ? `http://98.83.66.76:5002/uploads/${onlineUser.profileImage}` : 'https://via.placeholder.com/150'}
                                    alt=''
                                    loading="lazy"
                                />
                            </Box>
                            <Box className='chat-content'>
                                <Typography component='h4'>{`${onlineUser.firstName} ${onlineUser.lastName}`}</Typography>
                                <Typography>{onlineUser.email}</Typography>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography component="p" style={{ textAlign: 'center', marginTop: '10px', color: 'white' }}>
                        No users found.
                    </Typography>
                )}
            </Box>

            <Box mt={2} textAlign="center">
                <button className="back-home-btn" onClick={() => navigate('/dashboard')}>
                    Back to Home
                </button>
            </Box>
        </Box>
    );
};

export default DashboardChat;