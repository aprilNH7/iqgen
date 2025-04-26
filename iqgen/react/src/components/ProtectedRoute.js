import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = () => {
const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API_BASE_URL}/detail`, { withCredentials: true });
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <CircularProgress />;

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;










// import { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import axios from "axios";

// const ProtectedRoute = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(null);
//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 await axios.get("http://98.83.66.76:5002/api/detail", { withCredentials: true });
//                 setIsAuthenticated(true);
//             } catch (error) {
//                 setIsAuthenticated(false);
//             }
//         };

//         checkAuth();
//     }, []);

//     if (isAuthenticated === null) return ;

//     return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
// };

// export default ProtectedRoute;