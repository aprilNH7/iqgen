import React from "react";
import MainHeader from "../../components/mainHeader";
import { Box } from "@mui/material";
import DealContacts from "../../components/DealContacts";
import DealInfo from "../../components/DealInfo";


const JobSettings = () => {
    return (
        <> 
            <MainHeader />
            <Box className='deal-wrapper commercial'>
                <DealContacts />
                <DealInfo />
            </Box>
        </>
    );
};

export default JobSettings;
