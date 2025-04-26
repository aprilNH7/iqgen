import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Typography, TextField, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import MainHeader from '../../components/mainHeader';
import AccessManagerTable from '../../components/AccessManagerTable';
import CustomLineChart from '../../components/ui/CustomLineChart';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Setting = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [webhookUrl, setWebhookUrl] = useState('');
    const [eventUpload, setEventUpload] = useState(false);
    const [eventStatusChange, setEventStatusChange] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
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

    const handleWebhookSave = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/settings/webhook`, {
                url: webhookUrl,
                events: {
                    onFileUpload: eventUpload,
                    onStatusChange: eventStatusChange
                }
            }, { withCredentials: true });
            alert('Webhook saved successfully!');
        } catch (error) {
            console.error("Error saving webhook:", error);
            alert('Failed to save webhook.');
        }
    };

    return (
        <>
            <MainHeader title="Settings" />
            <Box className='setting-wrapper'>
                <Box className='setting-profile'>
                    <Box className='setting-payment'>
                        <Box className='payment-method'>
                            <Typography component='h2'>Payout method</Typography>
                            <Box className='payment-logo'>
                                <img src="/images/pay-logo.png" alt="" loading="lazy" />
                                <Box className='payment-add'>
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M36.707 15.1472..." fill="#40B435" />
                                    </svg>
                                </Box>
                            </Box>
                            <Button className='payment-button' variant="contained">Change payout method</Button>
                        </Box>
                        <Box className='setting-integration'>
                            <svg width="62" height="52" viewBox="0 0 62 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.537109" y="0.972656" width="60.9187" height="50.3297" rx="6" fill="#00BA9D" />
                            </svg>
                            <Typography component='h2'>Integrations</Typography>
                            <Button className='edit-integration' variant="contained">Edit Integrations</Button>
                        </Box>
                    </Box>
                    <Box className='setting-profile-wrapper'>
                        <Box className='setting-profile-box'>
                            <Box className='setting-profile-content' sx={{ 'backgroundImage': 'url(/images/setting-bg.png)' }}>
                                <Avatar
                                    className='profile-img'
                                    alt="Profile"
                                    src={user?.profileImage ? `http://98.83.66.76:5002/uploads/${user?.profileImage || ""}` : ''}
                                    sx={{ width: 175, height: 175 }}
                                />
                                <Typography component='h3'>Welcome back</Typography>
                                <Typography>{user?.company || "Company Name"}</Typography>
                                <Button className='edit-profile' variant="contained" onClick={() => handleNavigation('/profilesetting')}>Edit profile</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box className='webhook-settings' sx={{ mt: 5 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>API / Webhook Setup</Typography>
                    <TextField
                        label="Webhook URL"
                        fullWidth
                        variant="outlined"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={eventUpload} onChange={() => setEventUpload(!eventUpload)} />}
                            label="Trigger on File Upload"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={eventStatusChange} onChange={() => setEventStatusChange(!eventStatusChange)} />}
                            label="Trigger on Status Change"
                        />
                    </FormGroup>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={handleWebhookSave}>Save Webhook</Button>
                </Box>
            </Box>

            <Box className='table-chart'>
                <AccessManagerTable />
                <Box className='setting-chart' width={"100%"}>
                    <Typography component='h2'>Payout history</Typography>
                    <CustomLineChart />
                </Box>
            </Box>
        </>
    );
};

export default Setting;
