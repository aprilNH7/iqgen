import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const DashboardSummary = ({ userId }) => {
  const [summary, setSummary] = useState({
    totalTasks: 0,
    totalMessages: 0,
    milestonesAchieved: 0,
    outstandingDocs: 0,
  });

  useEffect(() => {
    if (userId) {
      fetchDashboardSummary(userId);
    }
  }, [userId]);

  const fetchDashboardSummary = async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard-summary`, {
        withCredentials: true,
      });
      setSummary(res.data);
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
    }
  };

  return (
    <Box className='dashboard-summary' sx={{ backgroundColor: '#f5f5f5', borderRadius: 2, p: 3, mt: 2 }}>
      <Typography variant='h6' mb={2}>Activity Summary</Typography>
      <List>
        <ListItem>
          <ListItemText primary={`Active Tasks: ${summary.totalTasks}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Unread Messages: ${summary.totalMessages}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Milestones Achieved: ${summary.milestonesAchieved}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Outstanding Documents: ${summary.outstandingDocs}`} />
        </ListItem>
      </List>
    </Box>
  );
};

export default DashboardSummary;
