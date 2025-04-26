import { Box, Button, TextField, Typography, Link } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import DashboardStats from './dashboardStats'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Popupprojectform from "./popupprojectform";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const DealDashbord = () => {
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false);
    const [projects, setProjects] = useState([]);
    const [totalLeads, setTotalLeads] = useState(0);
    const [epcUsers, setEpcUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [csvFile, setCsvFile] = useState(null);
    const fileInputRef = useRef(null);
    const [pendingSubmissions, setPendingSubmissions] = useState([]);
    const [fullSubmissions, setFullSubmissions] = useState([]);
    const [approved, setApproved] = useState([]);
    const [funded, setFunded] = useState([]);


    // Fetch saved projects from backend
    useEffect(() => {
        fetchUserDetails();
        fetchUser();
        fetchProjects();
    }, []);


    const fetchProjects = async (loggedInUser) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects`);
            let projectData = response.data.projects;

            if (loggedInUser && loggedInUser.role === "EPC") {
                // Filter projects for EPC user
                projectData = projectData.filter((project) => project.epc.name === loggedInUser.firstName);
            }
            setProjects(projectData);
            setTotalLeads(projectData.length);

            // Filter pending submissions (leads)
            const pendingProjects = projectData.filter((project) => project.submissionStatus === "Pending");
            setPendingSubmissions(pendingProjects);

            // Filter full submissions
            // const fullProjects = projectData.filter((project) => project.submissionStatus === "Full");
            // setFullSubmissions(fullProjects);
            
            const fullProjects = projectData.filter(
                (project) => project.activeStep === 2 || project.activeStep === 3 || (project.activeStep === 1 && project.submissionStatus === "Full")
            );
            setFullSubmissions(fullProjects);

            // Filter Approved submissions
            const approvedProjects = projectData.filter((project) => project.activeStep === 4 || project.activeStep === 5);
            setApproved(approvedProjects);

            // Filter Funded submissions
            const fundedProjects = projectData.filter((project) => project.activeStep === 6);
            setFunded(fundedProjects);

        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };



    const fetchUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
            if (response.data.users) {
                const epcOnly = response.data.users.filter(user => user.role === "EPC");
                setEpcUsers(epcOnly);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };


    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/detail`, {
                withCredentials: true,
            });

            const loggedInUser = response.data.user;
            setUser(loggedInUser);

            // Fetch projects only after getting user details
            fetchProjects(loggedInUser);

        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };


    // Open file manager when button is clicked
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // Handle file selection
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setCsvFile(file);
            await handleFileUpload(file); // Auto-upload after selection
        }
    };

    // Upload file to backend
    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/upload-csv`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert(response.data.message);
            fetchProjects(); // Refresh projects after upload
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file.");
        }
    };



    return (
        <>
            <Box className="dealdash-wrapper">
                <Box className='btn-deallead-wrapper'>
                    <Box className="add-one-btnwrapper">
                        <FormControl sx={{ minWidth: 202, }} className='lead-sort-select'>
                            <Typography component="p">Sort by:</Typography>
                            <NativeSelect
                                defaultValue={30}
                                inputProps={{
                                    name: 'Newest',
                                    id: 'Newest',
                                }}

                            >
                                <option value={30}>Newest</option>
                                <option value={10}>New</option>
                                <option value={20}>Old</option>
                            </NativeSelect>

                        </FormControl>
                        <Button onClick={() => setPopup(!popup)} variant='contained'>
                            + Add Deals
                        </Button>
                    </Box>
                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept=".csv"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <Button variant='contained' onClick={handleButtonClick}>
                        + Bulk Add Deals
                    </Button>
                </Box>

                {popup && <Popupprojectform setPopup={setPopup} onUpdate={fetchProjects} epcUsers={epcUsers} />}

                <Box className='deal-lead-wrapper'>
                    <Box className='dasboard-stats-box'>
                        <Box className="deal-dashboard-data">
                            <Box className='stats-box lead'>
                                <Typography component='h2'>Leads</Typography>
                                <Typography>
                                    ${pendingSubmissions.reduce((acc, p) => acc + p.systemInfo.epcInstall, 0)} | {pendingSubmissions.length} Deals
                                </Typography>
                            </Box>

                            <Box className="lead-box-down chat-wrapper" sx={{ backgroundImage: `url("images/deal-info-bg.png")` }}>
                                <Box className="typo-lead">
                                    {pendingSubmissions.length > 0 ? (
                                        pendingSubmissions.map((project) => (
                                            <Box
                                                key={project._id}
                                                className="project-details"
                                                sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
                                                onClick={() => navigate(`/deal-dashboard-commercial/${project._id}`)}
                                            >
                                                <Box className="image-lead"
                                                    sx={{
                                                        backgroundImage: 'url("images/location.png")',
                                                        width: 56,
                                                        height: 56,
                                                        backgroundSize: "cover",
                                                        flexShrink: 0,
                                                        borderRadius: "50%"
                                                    }}>
                                                </Box>
                                                <Box>
                                                    <Typography component="h2"><strong>{project.projectName}</strong> </Typography>
                                                    <Typography component="p"><strong>Address:</strong> {project.address || "N/A"}</Typography>
                                                    <Typography component="p"><strong>Location:</strong> {project.address || "N/A"}</Typography>
                                                    <Typography component="p"><strong>System Size:</strong> {project.systemInfo?.systemSizeKW || 0} KW</Typography>
                                                    <Typography component="p"><strong>Company Name:</strong> {project.companyName || "N/A"}</Typography>
                                                    <Typography component="p"><strong>Budget:</strong> ${project.budget || 0}</Typography>
                                                    <Typography component="p"><strong>Title:</strong> {project.title || "N/A"}</Typography>
                                                </Box>
                                            </Box>
                                        ))
                                    ) : (
                                        <>
                                            <Typography>No projects found.</Typography>
                                        </>
                                    )}
                                </Box>
                            </Box>
                        </Box>

                        <Box className="deal-dashboard-data">
                            <Box className='stats-box submissions'>
                                <Typography component='h2'>Full Submissions</Typography>
                                <Typography>${fullSubmissions.reduce((acc, p) => acc + p.systemInfo.epcInstall, 0)} | {fullSubmissions.length} Deals</Typography>
                            </Box>
                            <Box className="lead-box-down chat-wrapper" sx={{ backgroundImage: `url("images/deal-info-bg.png")` }}>
                                <Box className="typo-lead">
                                    {fullSubmissions.length > 0 ? (
                                        fullSubmissions.map((project) => (
                                            <Box
                                                key={project._id}
                                                className="project-details"
                                                sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
                                                onClick={() => navigate(`/deal-dashboard-commercial/${project._id}`)}
                                            >
                                                <Box className="image-lead"
                                                    sx={{
                                                        backgroundImage: 'url("images/location.png")',
                                                        width: 56,
                                                        height: 56,
                                                        backgroundSize: "cover",
                                                        flexShrink: 0,
                                                        borderRadius: "50%"
                                                    }}>
                                                </Box>
                                                <Box>
                                                    <Typography component="h2"><strong>{project.projectName}</strong> </Typography>
                                                    <Typography component="p"><strong>Address:</strong> {project.address || "N/A"}</Typography>
                                                    <Typography component="p"><strong>Title:</strong> {project.title || "N/A"}</Typography>
                                                </Box>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography>No projects found.</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>

                        <Box className="deal-dashboard-data">
                            <Box className='stats-box approved'>
                                <Typography component='h2'>Approved</Typography>
                                <Typography>${approved.reduce((acc, p) => acc + p.systemInfo.epcInstall, 0)} | {approved.length} Deals</Typography>
                            </Box>
                            <Box className="lead-box-down chat-wrapper" sx={{ backgroundImage: `url("images/deal-info-bg.png")` }}>
                                <Box className="typo-lead">
                                    {approved.length > 0 ? (
                                        approved.map((project) => (
                                            <Box
                                                key={project._id}
                                                className="project-details"
                                                sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
                                                onClick={() => navigate(`/deal-dashboard-commercial/${project._id}`)}
                                            >
                                                <Box className="image-lead"
                                                    sx={{
                                                        backgroundImage: 'url("images/location.png")',
                                                        width: 56,
                                                        height: 56,
                                                        backgroundSize: "cover",
                                                        flexShrink: 0,
                                                        borderRadius: "50%"
                                                    }}>
                                                </Box>
                                                <Box>
                                                    <Typography component="h2"><strong>{project.projectName}</strong> </Typography>
                                                    <Typography component="p"><strong>Address:</strong> {project.address || "N/A"}</Typography>
                                                    <Typography component="p"><strong>Title:</strong> {project.title || "N/A"}</Typography>
                                                </Box>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography>No projects found.</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>

                        <Box className="deal-dashboard-data">
                            <Box className='stats-box funded'>
                                <Typography component='h2'>Funded</Typography>
                                <Typography>${funded.reduce((acc, p) => acc + p.systemInfo.epcInstall, 0)} | {funded.length} Deals</Typography>
                            </Box>
                            <Box className="lead-box-down chat-wrapper" sx={{ backgroundImage: `url("images/deal-info-bg.png")` }}>
                                <Box className="typo-lead">
                                    {funded.length > 0 ? (
                                        funded.map((project) => (
                                            <Box
                                                key={project._id}
                                                className="project-details"
                                                sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
                                                onClick={() => navigate(`/construction-flow/${project._id}`)}
                                            >
                                                <Box className="image-lead"
                                                    sx={{
                                                        backgroundImage: 'url("images/location.png")',
                                                        width: 56,
                                                        height: 56,
                                                        backgroundSize: "cover",
                                                        flexShrink: 0,
                                                        borderRadius: "50%"
                                                    }}>
                                                </Box>
                                                <Box>
                                                    <Typography component="h2"><strong>{project.projectName}</strong> </Typography>
                                                    <Typography component="p"><strong>Address:</strong> {project.address || "N/A"}</Typography>
                                                    <Typography component="p"><strong>Title:</strong> {project.title || "N/A"}</Typography>
                                                </Box>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography>No projects found.</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default DealDashbord;


