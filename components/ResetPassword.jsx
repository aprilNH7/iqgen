import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async () => {
        if (!password.trim() || !confirmPassword.trim()) {
            setError('Password fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/reset-password`, {
                token,
                password
            });

            setMessage(response.data.message);
            setError('');

            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            setError(error.response?.data?.message || 'Password reset failed.');
        }
    };

    return (
        <Box className='signin-wrapper'>
            <Box className='user-logo'>
                <img src='../images/logo.png' alt='logo' loading="lazy" />
            </Box>
            <Box className="forgot-password-wrapper">
                <Typography variant="h4">Reset Password</Typography>

                {message && <Typography sx={{ color: 'green', mt: 2 }}>{message}</Typography>}
                {error && <Typography sx={{ color: 'red', mt: 2 }}>{error}</Typography>}

                <TextField
                    label="New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                // error={Boolean(error && (!password.trim() || error === 'Passwords do not match.'))}
                // helperText={error && !password.trim() ? error : ''}
                />

                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                // error={Boolean(error && (!confirmPassword.trim() || error === 'Passwords do not match.'))}
                // helperText={error && !confirmPassword.trim() ? error : error === 'Passwords do not match.' ? error : ''}
                />

                <Button
                    variant="contained" fullWidth sx={{ mt: 2, backgroundColor:"#275021" }} onClick={handleResetPassword} >
                    Reset Password
                </Button>
            </Box>
        </Box>
    );
}

export default ResetPassword;
