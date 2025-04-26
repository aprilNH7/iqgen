import { Box, Typography } from '@mui/material'
import React from 'react'
import ButtonNav from './dashboardbtnnav'
import ConvoChatbox from './convoChatbox'
import Convoparticipants from './convoparticipants'

const Conversation = ({ project }) => {


  return (
    <>
      <Box clasName="convo-wrapper">
        <Box className="convo-upper-wrapper">
          <ButtonNav project={project} />
          <Box className="astawa-plaza" sx={{ backgroundImage: "url('../images/deal-info-bg.png')" }}>
            <Typography component="h2">{project?.projectName}</Typography>
            <Typography component='body1'>{project?.address}</Typography>
          </Box>
        </Box>
        <Box className="convo-chats">
          <ConvoChatbox />
          <Convoparticipants />
        </Box>
      </Box>
    </>
  )
}

export default Conversation;