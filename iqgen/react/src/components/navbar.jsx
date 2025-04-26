import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from "axios";





const drawerWidth = 100;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/logout`, {}, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const drawer = (
    <>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }} className="logo">
        <img
          src='../images/logo.png'
          alt='logo'
          loading="lazy"
        />
      </Box>
      <div className='sidebar-menu'>
        <List className='nav-menu'>
          <ListItem disablePadding className='nav-item'>
            <ListItemButton className='nav-link' onClick={() => handleNavigation('/dashboard')}>
              <ListItemIcon className='nav-icon'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.95353 8.61072L10.4175 3.54689C11.3483 2.8177 12.6517 2.8177 13.5825 3.54689L20.0465 8.61072C20.7843 9.18877 20.9893 10.0491 20.9996 11.0435C21.0001 11.0974 20.9984 11.1495 20.9943 11.2033C20.9525 11.7548 20.6634 15.1249 19.5949 18.9084C19.2173 19.9615 18.3289 21 17.1067 21H15.918C15.1777 21 14.4713 20.3956 14.4713 19.65L14.5776 16.846C14.5776 15.4122 13.4236 14.2498 12 14.2498C10.5764 14.2498 9.42239 15.4122 9.42239 16.846L9.54168 19.65C9.54168 20.3956 8.82229 21 8.08203 21H6.89335C5.6711 21 4.78269 19.9615 4.40511 18.9084C3.33663 15.1249 3.0475 11.7548 3.00568 11.2033C3.0016 11.1495 2.99986 11.0974 3.00041 11.0435C3.01068 10.0491 3.21566 9.18877 3.95353 8.61072Z" fill="#fff" />
                </svg>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className='nav-item'>
            <ListItemButton className='nav-link' onClick={() => handleNavigation('/deal-dashboard')}>
              <ListItemIcon className='nav-icon'>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 7.5V0.53125C8.52083 0.21875 8.6875 0.0416667 9 0C10.3125 0.0208333 11.4896 0.34375 12.5312 0.96875C13.5938 1.57292 14.4271 2.40625 15.0312 3.46875C15.6562 4.51042 15.9792 5.6875 16 7C15.9583 7.3125 15.7812 7.47917 15.4688 7.5H8.5ZM0 8.5C0.0416667 6.5625 0.666667 4.91667 1.875 3.5625C3.0625 2.1875 4.59375 1.35417 6.46875 1.0625C6.78125 1.0625 6.95833 1.22917 7 1.5625V9L11.9062 13.9062C12.1146 14.1562 12.0938 14.3958 11.8438 14.625C10.5938 15.5208 9.14583 15.9792 7.5 16C6.10417 15.9792 4.84375 15.6354 3.71875 14.9688C2.59375 14.3021 1.69792 13.4062 1.03125 12.2812C0.364583 11.1562 0.0208333 9.89583 0 8.5ZM16.4375 9C16.7708 9.04167 16.9375 9.21875 16.9375 9.53125C16.6667 11.3229 15.8958 12.8021 14.625 13.9688C14.3958 14.1562 14.1771 14.1562 13.9688 13.9688L9 9H16.4375Z" fill="white" />
                </svg>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider className='nav-divider' />
        <List className='nav-menu'>
          <ListItem disablePadding className='nav-item'>
            <ListItemButton className='nav-link' onClick={() => handleNavigation('/settings')}>
              <ListItemIcon className='nav-icon'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="3" stroke="white" stroke-width="1.5" />
                  <path d="M14 4.02152C14 3.55449 13.6773 3.14367 13.2145 3.08124C12.8173 3.02766 12.4119 3 12 3C11.5882 3 11.1827 3.02767 10.7856 3.08124C10.3227 3.14367 10 3.5545 10 4.02153V4.17129C10 4.83491 9.55564 5.40496 8.95812 5.69371C8.64522 5.84492 8.34528 6.01873 8.06042 6.21303C7.51233 6.58688 6.79668 6.68645 6.22211 6.35472L6.09133 6.27922C5.68726 6.04593 5.17066 6.11959 4.88467 6.48825C4.38931 7.12682 3.978 7.83385 3.66736 8.59276C3.49061 9.02456 3.68516 9.50882 4.08922 9.7421L4.22165 9.81856C4.79576 10.15 5.0676 10.8189 5.01905 11.48C5.00644 11.6517 5.00003 11.8251 5.00003 12C5.00003 12.1749 5.00644 12.3483 5.01905 12.5199C5.06759 13.1811 4.79576 13.8499 4.22165 14.1814L4.0892 14.2579C3.68514 14.4911 3.4906 14.9754 3.66734 15.4072C3.97798 16.1661 4.38928 16.8731 4.88464 17.5117C5.17063 17.8804 5.68723 17.954 6.09131 17.7207L6.22207 17.6452C6.79664 17.3135 7.51229 17.4131 8.06039 17.7869C8.34525 17.9813 8.64521 18.1551 8.95812 18.3063C9.55564 18.595 10 19.1651 10 19.8287V19.9785C10 20.4455 10.3227 20.8563 10.7856 20.9188C11.1827 20.9723 11.5882 21 12 21C12.4119 21 12.8173 20.9723 13.2145 20.9188C13.6773 20.8563 14 20.4455 14 19.9785V19.8287C14 19.1651 14.4444 18.5951 15.0419 18.3063C15.3548 18.1551 15.6548 17.9813 15.9396 17.787C16.4877 17.4131 17.2034 17.3136 17.7779 17.6453L17.9087 17.7208C18.3128 17.9541 18.8294 17.8804 19.1154 17.5118C19.6107 16.8732 20.0221 16.1662 20.3327 15.4073C20.5094 14.9755 20.3149 14.4912 19.9108 14.2579L19.7784 14.1815C19.2043 13.85 18.9325 13.1811 18.981 12.52C18.9936 12.3483 19 12.1749 19 12C19 11.8251 18.9936 11.6517 18.981 11.48C18.9325 10.8188 19.2043 10.15 19.7784 9.8185L19.9108 9.74205C20.3149 9.50876 20.5094 9.0245 20.3327 8.5927C20.022 7.83379 19.6107 7.12676 19.1153 6.4882C18.8294 6.11955 18.3128 6.04588 17.9087 6.27917L17.7779 6.35469C17.2033 6.68641 16.4877 6.58685 15.9396 6.213C15.6547 6.01871 15.3548 5.8449 15.0419 5.69369C14.4444 5.40495 14 4.8349 14 4.17127V4.02152Z" stroke="white" stroke-width="1.5" />
                </svg>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className='nav-item'>
            <ListItemButton className='nav-link'>
              <ListItemIcon className='nav-icon'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.5" />
                  <path d="M8 9.54762C8 7.86447 9.79086 6.5 12 6.5C14.2091 6.5 16 7.86447 16 9.54762C16 10.8048 15.0009 11.8842 13.5746 12.35C12.7346 12.6244 12 13.3116 12 14.1952V15" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M12 17.5H12.01" stroke="white" stroke-width="1.6" stroke-linecap="round" />
                </svg>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
        <Box className='logout-menu'>
          <List className='nav-menu'>
            <ListItem disablePadding className='nav-item'>
              <ListItemButton className='nav-link' onClick={handleLogout}>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </div>
    </>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: { sm: 'none' } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <img
              src='../images/logo.png'
              alt='logo'
              loading="lazy"
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
