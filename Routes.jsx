import React from "react";
import { useRoutes } from "react-router-dom";
import SignIn from './pages/SignIn'; 
import SignUp from './pages/SignUp';
import Dashboard from "./pages/dashboard"; 
import Deal from "./pages/deal/deals";
import DealDashboard from "./pages/deal/deal_dashboard";
import Files from './pages/files';
import Photos from './pages/images';
import JobSettings from './pages/JobSettings';
import Conversations from './pages/conversation';
import ConstructionProgress from './pages/ConstructionFlow';

const ProjectsRoutes = () => {
    const routes = [
        // {
        //     path: "/signin",
        //     element: <SignIn />
        // },
        // {
        //     path: "/signup",
        //     element: <SignUp />
        // },
        {
            path: "/dashboard",
            element: <Dashboard />
        },
        {
            path: "/files",
            element: <Files />
        },
        {
            path: "/photos",
            element: <Photos />
        },
        {
            path: "/job-settings",
            element: <JobSettings />
        },
        {
            path: "/conversations",
            element: <Conversations />
        },
        {
            path: "/construction-progress",
            element: <ConstructionProgress />
        }
        // {
        //     path: "/deal",
        //     element: <Deal />
        // },
        // {
        //     path: "/deal_dashboard",
        //     element: <DealDashboard />
        // },
        
    ];

    let element = useRoutes(routes);
    return element;
};

export default ProjectsRoutes;