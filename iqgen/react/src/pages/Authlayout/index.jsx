import React from 'react'
import Box from '@mui/material/Box';
import ResponsiveDrawer from '../../components/navbar';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function AuthLayout() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //       navigate('/');
    //     }
    //   }, [navigate]);



    return (
        <React.Fragment>
            <Box className="main_layout">
                <Box className="layout_inner">
                    <Box className="page_with_sidebar">
                        <Box className="sidebar_main">
                            <ResponsiveDrawer />
                        </Box>
                        <Box component="main" className="pages_main">
                            <Outlet />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}
