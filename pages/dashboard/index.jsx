import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DashboardHeader from "../../components/dashboardHeader";
import DashboardChat from "../../components/dashboardChat";
import DashboardStats from "../../components/dashboardStats";
import TopSaleCategory from "../../components/topsaleCategory";
import Graph from "../../components/ui/graph";
import TaskManagementWidget from "../../components/TaskManagementWidget";
import DateCalendarViews from "../../components/ui/calendar";
import ProjectTable from '../../components/ProjectTable';
import ProjectForm from '../../components/ProjectForm';
import axios from "axios";




function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [metrics, setMetrics] = useState({}); 
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const [fullSubmissions, setFullSubmissions] = useState([]);
  const [approved, setApproved] = useState([]);
  const [funded, setFunded] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMetrics();
    //fetchProjects();
    fetchTasks();
    fetchUserDetails();
  }, []);
  const fetchMetrics = async () => {
    try {
        const metricsResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects/metrics`);
        setProjects(metricsResponse.data.projects);
        setMetrics({
            totalRevenue: metricsResponse.data.totalRevenueBooked,
            totalCapacityMW: metricsResponse.data.totalCapacityMW,
            residential: metricsResponse.data.residential,
            commercial: metricsResponse.data.commercial,
            pendingSubmissions: metricsResponse.data.pendingSubmissions,
            fullSubmissions: metricsResponse.data.fullSubmissions,
            approved: metricsResponse.data.approved,
            funded: metricsResponse.data.funded
        });
    } catch (error) {
        console.error("Error fetching metrics:", error);
    }
};

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects`);
      let projectData = response.data.projects;

      setProjects(response.data.projects);
      setTotalLeads(response.data.totalLeads);

      // Filter pending submissions (leads)
      const pendingProjects = projectData.filter((project) => project.submissionStatus === "Pending");
      setPendingSubmissions(pendingProjects);

      // Filter full submissions
      const fullProjects = projectData.filter((project) => project.activeStep === 2 || project.activeStep === 3 || (project.activeStep === 1 && project.submissionStatus === "Full"));
      setFullSubmissions(fullProjects);

      // const fullProjects = projectData.filter((project) => project.submissionStatus === "Full");
      // setFullSubmissions(fullProjects);

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

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tasks`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/detail`, {
        withCredentials: true,
      });

      console.log("Fetched user:", response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);
  const handleSaveProject = (project) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/projects`, project)
        .then(() => {
            fetchProjects();
            handleCloseForm();
        })
        .catch(console.error);
};


  return (

    <Box className="dashboard-wrapper">
            <Box className="dashboard-data">
                <DashboardHeader projects={projects} />
                <Box className="dashboard-stats">
                    <ProjectTable projects={projects} />
                    <Graph fundedProjects={metrics.funded || []} />
                    <DashboardStats
                        pendingSubmissions={metrics.pendingSubmissions || []}
                        fullSubmissions={metrics.fullSubmissions || []}
                        approved={metrics.approved || []}
                        funded={metrics.funded || []}
                    />
                </Box>
                <Box className="dashboard-sale">
                    <TopSaleCategory projects={projects} />
                    <DateCalendarViews />
                </Box>
                <TaskManagementWidget tasks={tasks} />
                <Button onClick={handleOpenForm}>Add New Project</Button>
            </Box>
            <Box className="dashboard-chat">
                <DashboardChat user={user} />
            </Box>
            <Modal
                open={showForm}
                onClose={handleCloseForm}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Box>
                    <ProjectForm onSave={handleSaveProject} />
                </Box>
            </Modal>
        </Box>
  );
}

export default Dashboard;



