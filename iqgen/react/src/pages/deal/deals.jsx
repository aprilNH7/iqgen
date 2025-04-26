import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MainHeader from "../../components/mainHeader";
import DealContacts from "../../components/DealContacts";
import DealInfo from "../../components/DealInfo";
import FormStep from "../../components/FormStep";
import Formsubmission from "../../components/formsubmissionpopup";
import Popupprojectformedit from "../../components/editprojectformpopu"

const Deal = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [popopen, setPopopen] = useState(false);
    const [project, setProject] = useState(null);
    const [popupcommercial, setPopupcommercial] = useState(false)
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);
    const [epcUsers, setEpcUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);



    useEffect(() => {
        fetchUserDetails();
        fetchProjectDetails();
        fetchUser();
    }, [id]);


    const fetchProjectDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects/${id}`);
            setProject(response.data.project);
        } catch (error) {
            console.error("Error fetching project details:", error);
            navigate('/deal-dashboard');
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
                setEpcUsers(epcOnly);
                setAllUsers(response.data.users);
            } else {
                console.warn("No users found in the response.");
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };



    const handleprojectedit = () => {
        setPopupcommercial(!popupcommercial)
    }

    const handlepopup = (index) => {
        if (index === 1) {
            setPopopen(!popopen);
        }
    };


    return (
        <>
            <MainHeader />
            <Box className="deal-wrapper commercial">
                <DealContacts allUsers={allUsers} />
                <DealInfo handleprojectedit={handleprojectedit} project={project} user={user} />
                <FormStep handlepopup={handlepopup} project={project} />
                {popopen && <Formsubmission setPopopen={setPopopen} project={project} onUpdate={fetchProjectDetails} />}
                {popupcommercial && <Popupprojectformedit setPopupcommercial={setPopupcommercial} onUpdate={fetchProjectDetails} project={project} epcUsers={epcUsers} />}
            </Box>
        </>
    );
};

export default Deal;


