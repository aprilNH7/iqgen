import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';




const GOOGLE_CLIENT_ID = '451690110625-0lp33n27ca2k6svp9sicu3fpod61ib6f.apps.googleusercontent.com';
const FACEBOOK_APP_ID = '526919679979459';



function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();



  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        email,
        password,
      }, { withCredentials: true }); // ✅ Ensure session cookies are sent
      navigate('/dashboard'); // ✅ Redirect to dashboard after successful login
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  
  const handleCreateAccountClick = () => {
    navigate('/sign-up');
  };

  // Google Login Success Handler
  const handleGoogleLoginSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    // console.log("Google User:", decoded);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/google-login`,
        {
          firstName: decoded.given_name,
          lastName: decoded.family_name,
          email: decoded.email,
          googleId: decoded.sub,
        },
        { withCredentials: true }
      );

      console.log("Login successful:", res.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Login error:", error);
      setError("Google login failed. Please try again.");
    }
  };


  // Google Login Failure Handler
  const handleGoogleLoginFailure = () => {
    setError('Google login failed. Please try again.');
  };



  // Handle Facebook Login Success
  const handleFacebookLoginSuccess = async (response) => {
    console.log('Facebook User:', response);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/facebook-login`, {
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
        facebookId: response.id,
      },
        { withCredentials: true }
      );

      const { token } = res.data;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Facebook Login error:', error);
      setError('Facebook login failed. Please try again.');
    }
  };
  // Facebook Login Failure Handler
  const handleFacebookLoginFailure = () => {
    setError('Facebook login failed. Please try again.');
  };



  return (

    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Box className='signin-wrapper'>
        <Box className='user-logo'>
          <img src='images/logo.png' alt='logo' loading="lazy" />
        </Box>
        <Box className='signin-form-wrapper'>
          <Box className='signin-content'>
            <Typography component="h1">
              Welcome back to <Typography component='span'>IQGen™</Typography>
            </Typography>
            <Typography>Smart Power. Smarter future.</Typography>
            <Box className='joined'>
              <Box className='stats'>
                <Box className='stats-box black'></Box>
                <Box className='stats-box green'></Box>
                <Box className='stats-box grey'></Box>
              </Box>
              <Typography component='span'>
                3k+ Companies joined us, now it’s your turn
              </Typography>
            </Box>
          </Box>
          <Box className='signin-form'>
            <Box className='form-box' component="form" noValidate autoComplete="off">
              <Typography component="h2">Sign in</Typography>
              <Box className='new-user'>
                <Typography>New user? </Typography>
                <Link onClick={handleCreateAccountClick} underline="none">Create an account</Link>
              </Box>
              {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}<br />

              <FormControl className='form-group'>
                <TextField
                  className='form-control'
                  id="email-address"
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl className='form-group'>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  className='form-control'
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <Box className='sumbit-btn'>
                <Link className='forgot' onClick={() => navigate('/forgot-password')} underline="none">
                  Forgot password?
                </Link>
                {/* <Link className='forgot' href="#" underline="none">Forgot password?</Link> */}
                <Button className='form-sumbit' variant="contained" type="submit" onClick={handleSubmit}>Sign In</Button>

              </Box>

              <Box className='or'>
                <Typography component='span'>or</Typography>
              </Box>

              {/* Google Login Button */}
              <Box className='social-signin'>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginFailure}
                />


                <FacebookLogin
                  appId={FACEBOOK_APP_ID}
                  autoLoad={false}
                  fields="first_name,last_name,email"
                  callback={handleFacebookLoginSuccess}
                  onFailure={handleFacebookLoginFailure}
                  render={(renderProps) => (
                    <Button className='facebook-signin' variant="contained" onClick={renderProps.onClick}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7.99485" cy="7.99485" r="7.99485" fill="#1977F3" />
                        <path d="M11.1069 10.3064L11.4611 7.99485H9.24398V6.49504C9.24398 5.86319 9.55316 5.24595 10.547 5.24595H11.5555V3.27844C11.5555 3.27844 10.6404 3.12216 9.76566 3.12216C7.9398 3.12216 6.7458 4.22847 6.7458 6.23308V7.99485H4.71533V10.3064H6.7458V15.893C7.1528 15.9571 7.56991 15.9897 7.99489 15.9897C8.41988 15.9897 8.83699 15.956 9.24398 15.893V10.3064H11.1069Z" fill="white" />
                      </svg>
                      Facebook
                    </Button>
                  )}
                />
              </Box>

              <Typography className='form-privacy'>
                Protected by reCAPTCHA and subject to the
                <Link href="#" underline="none"> IQGen Privacy Policy</Link> and
                <Link href="#" underline="none"> Terms of Service.</Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </GoogleOAuthProvider>
  );
}

export default SignInForm;