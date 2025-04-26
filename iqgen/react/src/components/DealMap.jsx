import { Box, Typography } from '@mui/material';
import React from 'react';

const DealMap = ({ address }) => {
  const encodedAddress = encodeURIComponent(address || "223 Park St, Dallas, 75022");
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodedAddress}`;

  return (
    <Box className='deal-map'>
      <Box className="hover-address">
        <Box className="address">
          <Typography component="p">Current location</Typography>
          <Typography component="span">{address}</Typography>
        </Box>
      </Box>
      <iframe
        className='map'
        src={mapSrc}
        width="100%"
        height="456"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title="Project Location Map"
      ></iframe>
    </Box>
  );
};

export default DealMap;
