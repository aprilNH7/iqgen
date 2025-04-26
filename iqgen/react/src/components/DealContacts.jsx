import { Avatar, Box, IconButton, Link, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';
import ButtonNav from './dashboardbtnnav';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const DealContacts = ({ allUsers, project }) => {
    const [value, setValue] = React.useState(0);


    if (!allUsers || allUsers.length === 0) {
        return <Typography>No users found</Typography>;
    }

    // Filter users with role "Sales Rep" and "EPC"
    const salesReps = allUsers.filter(user => user.role === "Sales Rep");
    const EPC = allUsers.filter(user => user.role === "EPC");



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <>

            <Box className='deal-contacts'>
                <ButtonNav project={project} />
                <Box className='contact-wrapper'>
                    <Box className="sticky-contact">
                        <Box className='card-header'>
                            <Typography component='h2'>Contacts</Typography>
                        </Box>
                        <Tabs className='contact-tab' value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab className='contact-tab-menu' label="Sales Team" {...a11yProps(0)} />
                            <Tab className='contact-tab-menu' label="EPC" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <Box className='contact-tabs' sx={{ width: '100%' }}>
                        <Box className='contact-tabs-content'>
                            <CustomTabPanel className='contact-tab-content' value={value} index={0}>
                                {salesReps.length > 0 ? (
                                    salesReps.map(user => (
                                        <Box key={user._id} className='contact-card green'>
                                            <Box className='contact-card-header'>
                                                <Box className='card-image'>
                                                    <Avatar className='image' alt={user.firstName} src={user.avatar || "/static/images/avatar/1.jpg"} />
                                                </Box>
                                                <Box className='card-contacts'>
                                                    <Link className='contact-links' href="#" underline="none">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.74926 5.49433C2.83974 4.67938 3.62072 4.03734 4.59873 3.96709C8.61899 3.67835 11.4104 3.67751 15.3984 3.96532C16.3812 4.03624 17.1632 4.68474 17.2502 5.504C17.6012 8.81063 17.5688 11.1454 17.2378 14.4797C17.1555 15.3081 16.3682 15.9679 15.3748 16.0381C11.375 16.3207 8.58697 16.3201 4.63823 16.0395C3.6424 15.9687 2.8551 15.3054 2.77375 14.4749C2.45047 11.1743 2.37852 8.83372 2.74926 5.49433Z" stroke="black" stroke-width="1.5" />
                                                            <path d="M5 6.66666L8.59224 9.95955C9.38874 10.6897 10.6113 10.6897 11.4078 9.95955L15 6.66666" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                                                        </svg>
                                                    </Link>
                                                    <Link className='contact-links' href="#" underline="none">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3.22669 3.86263L3.74864 3.07896C4.23024 2.35587 5.27136 2.3002 5.82718 2.96782L7.73497 5.25932C8.19712 5.81442 8.02831 6.56981 7.65689 7.18942C7.33769 7.72192 7.32822 8.39098 7.66625 8.91171C8.58271 10.3235 9.43584 11.1764 10.8333 12.0833C11.3535 12.4209 12.0214 12.4108 12.5529 12.0915C13.1725 11.7194 14.189 11.8119 14.7441 12.2749L17.0326 14.1838C17.6996 14.7402 17.644 15.7823 16.9216 16.2643L16.1598 16.7726C14.7354 17.7232 12.8735 17.7576 11.4646 16.7842C7.80222 14.2541 5.63006 12.0857 3.19995 8.52944C2.24082 7.12581 2.28428 5.27757 3.22669 3.86263Z" stroke="black" stroke-width="1.5" />
                                                        </svg>
                                                    </Link>
                                                    {/* <Link className='contact-links' href="#" underline="none">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.23217 5.28596H14.5473C14.6394 5.28596 14.714 5.36058 14.714 5.45262V11.7678M14.6652 5.33477L5.28589 14.714" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                                                        </svg>
                                                    </Link> */}
                                                </Box>
                                            </Box>
                                            <Box className='contact-card-content'>
                                                <Box className='contact-content'>
                                                    <Typography component="h3">{user.firstName} {user.lastName}</Typography>
                                                    <Typography>{user.role}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography>No Sales Representatives found</Typography>
                                )}
                            </CustomTabPanel>

                            <CustomTabPanel className='contact-tab-content' value={value} index={1}>
                                {EPC.length > 0 ? (
                                    EPC.map(user => (
                                        <Box key={user._id} className='contact-card green'>
                                            <Box className='contact-card-header'>
                                                <Box className='card-image'>
                                                    <Avatar className='image' alt={user.firstName} src={user.avatar || "/static/images/avatar/1.jpg"} />
                                                </Box>
                                                <Box className='card-contacts'>
                                                    <Link className='contact-links' href="#" underline="none">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.74926 5.49433C2.83974 4.67938 3.62072 4.03734 4.59873 3.96709C8.61899 3.67835 11.4104 3.67751 15.3984 3.96532C16.3812 4.03624 17.1632 4.68474 17.2502 5.504C17.6012 8.81063 17.5688 11.1454 17.2378 14.4797C17.1555 15.3081 16.3682 15.9679 15.3748 16.0381C11.375 16.3207 8.58697 16.3201 4.63823 16.0395C3.6424 15.9687 2.8551 15.3054 2.77375 14.4749C2.45047 11.1743 2.37852 8.83372 2.74926 5.49433Z" stroke="black" stroke-width="1.5" />
                                                            <path d="M5 6.66666L8.59224 9.95955C9.38874 10.6897 10.6113 10.6897 11.4078 9.95955L15 6.66666" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                                                        </svg>
                                                    </Link>
                                                    <Link className='contact-links' href="#" underline="none">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3.22669 3.86263L3.74864 3.07896C4.23024 2.35587 5.27136 2.3002 5.82718 2.96782L7.73497 5.25932C8.19712 5.81442 8.02831 6.56981 7.65689 7.18942C7.33769 7.72192 7.32822 8.39098 7.66625 8.91171C8.58271 10.3235 9.43584 11.1764 10.8333 12.0833C11.3535 12.4209 12.0214 12.4108 12.5529 12.0915C13.1725 11.7194 14.189 11.8119 14.7441 12.2749L17.0326 14.1838C17.6996 14.7402 17.644 15.7823 16.9216 16.2643L16.1598 16.7726C14.7354 17.7232 12.8735 17.7576 11.4646 16.7842C7.80222 14.2541 5.63006 12.0857 3.19995 8.52944C2.24082 7.12581 2.28428 5.27757 3.22669 3.86263Z" stroke="black" stroke-width="1.5" />
                                                        </svg>
                                                    </Link>
                                                    {/* <Link className='contact-links' href="#" underline="none">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.23217 5.28596H14.5473C14.6394 5.28596 14.714 5.36058 14.714 5.45262V11.7678M14.6652 5.33477L5.28589 14.714" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                                                        </svg>
                                                    </Link> */}
                                                </Box>
                                            </Box>
                                            <Box className='contact-card-content'>
                                                <Box className='contact-content'>
                                                    <Typography component="h3">{user.firstName} {user.lastName}</Typography>
                                                    <Typography>{user.role}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography>No Sales Representatives found</Typography>
                                )}
                            </CustomTabPanel>

                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default DealContacts;