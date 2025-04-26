import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleResetRequest = async () => {
        setError('');
        setMessage('');

        if (!email.trim()) {
            setError('Please enter your email.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/forgot-password`, { email });

            setMessage(response.data.message);
            setEmail('');
            setLoading(false);

            // setTimeout(() => {
            //     navigate('/');
            // }, 3000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to send reset link.');
            setLoading(false);
        }
    };

    return (
        <Box className='signin-wrapper'>
            <Box className='user-logo'>
                <img src='images/logo.png' alt='logo' loading="lazy" />
            </Box>
            <Box className="forgot-password-wrapper">
                <Typography variant="h4">Forgot Password?</Typography>
                <Typography>Enter your email to receive a password reset link.</Typography>

                {message && <Typography sx={{ color: 'green', mt: 2 }}>{message}</Typography>}
                {error && <Typography sx={{ color: 'red', mt: 2 }}>{error}</Typography>}

                <TextField
                    label="Email Address"
                    variant="outlined"
                    fullWidth margin="normal"
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // error={Boolean(error && !email.trim())}
                    // helperText={error && !email.trim() ? error : ''}
                />

                <Button
                    variant="contained" onClick={handleResetRequest} fullWidth sx={{ mt: 2, backgroundColor:"#275021" }} disabled={loading} >
                    {loading ? "Sending..." : "Send Reset Link"}
                </Button>
            </Box>
        </Box>
    );
}

export default ForgotPassword;
