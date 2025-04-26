import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import axios from "axios";




const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    job: '',
    company: '',
    mobile: '',
    country: '',
    password: '',
    confirmPassword: '',
  });

  const [agreements, setAgreements] = useState({
    dataPolicy: false,
    ancillaryServices: false,
    channelPartner: false,
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setAgreements({ ...agreements, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const { firstName, lastName, email, job, company, mobile, country, password, confirmPassword } = formData;
    const { dataPolicy, ancillaryServices, channelPartner } = agreements;

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      role: job,
      company,
      mobile,
      country,
      password,
      dataPolicyChecked: dataPolicy,
      ancillaryServicesChecked: ancillaryServices,
      channelPartnerChecked: channelPartner,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/signup`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Box className="signup-wrapper">
        <Box className='user-logo'>
          <img
            src='images/logo.png'
            alt='logo'
            loading="lazy"
          />
        </Box>
        <Box className='signup-form-wrapper'>
          <Box className='signup-content'>
            <Typography component="h1">Get Your Project Financed <Typography component='span'>Today!</Typography></Typography>
            <Typography>Experience the IQGen™ Difference Today!</Typography>
            <Box className='signup-features'>
              <Box className='features'>
                <Box className='feature-box'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13.41 18.09V20H10.74V18.07C9.03 17.71 7.58 16.61 7.47 14.67H9.43C9.53 15.72 10.25 16.54 12.08 16.54C14.04 16.54 14.48 15.56 14.48 14.95C14.48 14.12 14.04 13.34 11.81 12.81C9.33 12.21 7.63 11.19 7.63 9.14C7.63 7.42 9.02 6.3 10.74 5.93V4H13.41V5.95C15.27 6.4 16.2 7.81 16.26 9.34H14.3C14.25 8.23 13.66 7.47 12.08 7.47C10.58 7.47 9.68 8.15 9.68 9.11C9.68 9.95 10.33 10.5 12.35 11.02C14.37 11.54 16.53 12.41 16.53 14.93C16.52 16.76 15.15 17.76 13.41 18.09Z" fill="#275021" />
                  </svg>
                  <Typography component="h2">Absolutely FREE</Typography>
                  <Typography>No hidden charges, No credit card required</Typography>
                </Box>
                <Box className='feature-box'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 20V11H15V4H22L20 9H22L17 20ZM15 13V20H4C2.9 20 2 19.1 2 18V15C2 13.9 2.9 13 4 13H15ZM6.25 15.75H4.75V17.25H6.25V15.75ZM13 4V11H4C2.9 11 2 10.1 2 9V6C2 4.9 2.9 4 4 4H13ZM6.25 6.75H4.75V8.25H6.25V6.75Z" fill="#275021" />
                  </svg>
                  <Typography component="h2">Fast & Easy</Typography>
                  <Typography>Get access instantly, no downloads required</Typography>
                </Box>
                <Box className='feature-box'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM12 7C13.66 7 15 8.34 15 10C15 11.66 13.66 13 12 13C10.34 13 9 11.66 9 10C9 8.34 10.34 7 12 7ZM18 19H6V17.6C6 15.6 10 14.5 12 14.5C14 14.5 18 15.6 18 17.6V19Z" fill="#275021" />
                  </svg>
                  <Typography component="h2">Your Own Data</Typography>
                  <Typography>Enjoy seamless access to your company data.</Typography>
                </Box>
                <Box className='feature-box'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM16.23 18L12 15.45L7.77 18L8.89 13.19L5.16 9.96L10.08 9.54L12 5L13.92 9.53L18.84 9.95L15.11 13.18L16.23 18Z" fill="#275021" />
                  </svg>
                  <Typography component="h2">5-Star Features</Typography>
                  <Typography>Access all features of the platform!</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="signup-form">
            <Box component="form" noValidate autoComplete="off" className="form-box">
              <Typography component="h2">Sign up now to Start Submitting Deals!</Typography>
              <Typography className="already-account">
                Already have an account? <Link onClick={() => navigate('/')} underline="none">Sign in</Link>
              </Typography>

              {/* Error message display */}
              {error && (
                <Typography sx={{ color: 'red' }} className="error-message">
                  {error}
                </Typography>
              )}<br />

              <FormControl className="form-group">
                <TextField className="form-control" id="first-name" name="firstName" label="First Name" value={formData.firstName} onChange={handleInputChange} />
                <TextField className="form-control" id="last-name" name="lastName" label="Last Name" value={formData.lastName} onChange={handleInputChange} />
              </FormControl>
              <FormControl className="form-group">
                <TextField className="form-control" id="email-address" name="email" label="Email address" value={formData.email} onChange={handleInputChange} />
                <FormControl className="form-control">
                  <InputLabel id="job-title-label">Job Title</InputLabel>
                  <Select labelId="job-title-label" id="job-title" name="job" value={formData.job} onChange={handleInputChange}>
                    <MenuItem value="EPC">EPC</MenuItem>
                    <MenuItem value="Sales Rep">Sales Rep</MenuItem>
                    <MenuItem value="Company Admin">Company Admin</MenuItem>
                  </Select>
                </FormControl>
              </FormControl>
              <TextField className="form-control" id="company" name="company" label="Company" value={formData.company} onChange={handleInputChange} />
              <FormControl className="form-group">
                <TextField className="form-control" id="mobile" name="mobile" label="Mobile" value={formData.mobile} onChange={handleInputChange} />
                <FormControl className="form-control" fullWidth>
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select labelId="country-label" id="country" name="country" value={formData.country} onChange={handleInputChange}>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="UK">UK</MenuItem>
                    <MenuItem value="India">India</MenuItem>
                  </Select>
                </FormControl>
              </FormControl>
              <FormControl className="form-group">
                <TextField className="form-control" id="password" name="password" label="Password" type="password" value={formData.password} onChange={handleInputChange} />
                <TextField className="form-control" id="confirm-password" name="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleInputChange} />
              </FormControl>

              {/* <Box className='sumbit-btn'>
                <Button className='form-sumbit' variant="contained" type="submit" onClick={handleSubmit}>Sign Up</Button>
              </Box> */}

              <Box className="sumbit-btn">
                <Button className="form-sumbit" variant="contained" type="submit" onClick={handleSubmit}>
                  Sign Up
                </Button>
              </Box>

              <FormGroup className='form-checkbox'>
                <FormControlLabel className='checkbox' control={<Checkbox className='checkbox-box' sx={{ color: '#275021', '&.Mui-checked': { color: '#275021', }, }} />} label="I agree to the Data Policy." />
                <FormControlLabel className='checkbox' control={<Checkbox className='checkbox-box' sx={{ color: '#275021', '&.Mui-checked': { color: '#275021', }, }} />} label=" I agree to the Ancillary Services Agreement" />
                <FormControlLabel className='checkbox' control={<Checkbox className='checkbox-box' sx={{ color: '#275021', '&.Mui-checked': { color: '#275021', }, }} />} label=" I agree to the Channel Partner Agreement." />
              </FormGroup>

              {/* <FormGroup className="form-checkbox">
                <FormControlLabel control={<Checkbox name="dataPolicy" checked={agreements.dataPolicy} onChange={handleCheckboxChange} sx={{ color: '#275021', '&.Mui-checked': { color: '#275021' } }} />} label="I agree to the Data Policy." />
                <FormControlLabel control={<Checkbox name="ancillaryServices" checked={agreements.ancillaryServices} onChange={handleCheckboxChange} sx={{ color: '#275021', '&.Mui-checked': { color: '#275021' } }}/>} label="I agree to the Ancillary Services Agreement" />
                <FormControlLabel control={<Checkbox name="channelPartner" checked={agreements.channelPartner} onChange={handleCheckboxChange} sx={{ color: '#275021', '&.Mui-checked': { color: '#275021' } }}/>} label="I agree to the Channel Partner Agreement." />
              </FormGroup> */}

              <Typography className="form-privacy">
                By registering, you agree to the processing of data by IQGen and Its Affiliates as described in the Privacy Statement.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}


export default SignupForm;