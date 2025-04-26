import React, { useEffect, useState } from "react";
import MainHeader from '../../components/mainHeader'
import { Box } from '@mui/material'
import DealContacts from '../../components/DealContacts'
import FormStepcon from '../../components/formstepconstruction'
import ConstructionFlowInfo from '../../components/ConstructionFlowInfo'
import DealMap from '../../components/DealMap';
import { useParams } from "react-router-dom";
import axios from "axios";




const ConstructionFlow = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [user, setUser] = useState(null);




    useEffect(() => {
        fetchProjectDetails();
        fetchUser();
        fetchUserDetails();
    }, [id]);


    const fetchProjectDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects/${id}`);
            setProject(response.data.project);
        } catch (error) {
            console.error("Error fetching project details:", error);
            // navigate('/deal-dashboard');
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

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
            if (response.data && response.data.users) {
                const epcOnly = response.data.users.filter(user => user.role === "EPC");
                // setEpcUsers(epcOnly);
                setAllUsers(response.data.users);
            } else {
                console.warn("No users found in the response.");
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };


    return (
        <>
            <MainHeader title="Gantt" />
            <Box className='deal-wrapper construction-flow'>
                <DealContacts allUsers={allUsers} project={project} />
                <ConstructionFlowInfo project={project} user={user} />
                <FormStepcon project={project} fetchProjectDetails={fetchProjectDetails} />
                <DealMap address={project.address} />
            </Box>
        </>
    )
}

export default ConstructionFlow;