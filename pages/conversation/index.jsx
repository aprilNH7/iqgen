import React, { useEffect, useState } from "react";
import MainHeader from "../../components/mainHeader";
import { Box } from "@mui/material";
import Dashbordfiles from "../../components/dashbordfiles";
import Conversation from "../../components/conversation";
import axios from "axios";
import { useParams } from "react-router-dom";




const ConversationDashboard = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [project, setProject] = useState(null);




    useEffect(() => {
        fetchProjectDetails();
        fetchUserDetails();
    }, [id]);


    const fetchProjectDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects/${id}`);
            setProject(response.data.project);
        } catch (error) {
            console.error("Error fetching project details:", error);
        } 
    };


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


    
    return (
        <>
            <MainHeader title="Chat" />
            <Conversation project={project}/>
        </>
    );
};

export default ConversationDashboard;