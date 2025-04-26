import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from "recharts";
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuItem from '@mui/material/MenuItem';



const Graph = ({ fundedProjects }) => {
  const [chartData, setChartData] = useState([]);
  // console.log(fundedProjects, "fundedProjects")

  useEffect(() => {
    processChartData();
  }, [fundedProjects]);

  const processChartData = () => {
    // Initialize an empty object for monthly data
    let monthlyData = {
      Jan: { Sales: 0, Revenue: 0 },
      Feb: { Sales: 0, Revenue: 0 },
      Mar: { Sales: 0, Revenue: 0 },
      Apr: { Sales: 0, Revenue: 0 },
      May: { Sales: 0, Revenue: 0 },
      Jun: { Sales: 0, Revenue: 0 },
      Jul: { Sales: 0, Revenue: 0 },
      Aug: { Sales: 0, Revenue: 0 },
      Sep: { Sales: 0, Revenue: 0 },
      Oct: { Sales: 0, Revenue: 0 },
      Nov: { Sales: 0, Revenue: 0 },
      Dec: { Sales: 0, Revenue: 0 },
    };

    // Process funded projects data
    fundedProjects.forEach((project) => {
      const date = new Date(project.fundedDate);
      const monthName = date.toLocaleString("default", { month: "short" });

      // Increment sales and revenue
      if (monthlyData[monthName]) {
        monthlyData[monthName].Sales += project.salesAmount || 0;
        monthlyData[monthName].Revenue -= project.revenueAmount || 0; 
      }
    });

    // Convert object to an array for Recharts
    const processedData = Object.keys(monthlyData).map((month) => ({
      name: month,
      Sales: monthlyData[month].Sales,
      Revenue: monthlyData[month].Revenue,
    }));

    setChartData(processedData);
  };

  return (
    <>
      <Box className="dashboard-graph">
        <Box className="graph-header">
          <Box className="header-content">
            <Typography component="h2">Statistics</Typography>
            <Box className="graph-stats">
              <Box className="stats-box">
                <Box className="dot"></Box>
                <Typography>Sales</Typography>
              </Box>
              <Box className="stats-box">
                <Box className="dot"></Box>
                <Typography>Insight</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={550} height={340} data={chartData} stackOffset="sign" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) => {
                if (value === 0) return "$0";
                return value > 0
                  ? `${Math.abs(value) >= 1000 ? `${(value / 1000).toLocaleString()}K` : value}`
                  : `$${Math.abs(value) >= 1000 ? `${(Math.abs(value) / 1000).toLocaleString()}K` : Math.abs(value)}`;
              }}
            />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="Revenue" fill="#000000" radius={[20, 20, 0, 0]} stackId="stack" />
            <Bar dataKey="Sales" fill="url(#pattern-stripe)" radius={[20, 20, 0, 0]} stackId="stack" />

            <defs>
              <pattern id="pattern-stripe" width="4" height="4" patternUnits="userSpaceOnUse">
                <rect width="4" height="4" fill="#275021" />
                <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="black" strokeWidth="1" />
              </pattern>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default Graph;




















// import { Box, Typography } from "@mui/material";
// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ReferenceLine,
//   ResponsiveContainer
// } from "recharts";
// import FormControl from '@mui/material/FormControl';
// import NativeSelect from '@mui/material/NativeSelect';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import MenuItem from '@mui/material/MenuItem';

// const data = [
//   {
//     name: "Jan",
//     Sales: 12000,
//     Revenue: -12000,
//     amt: 2400
//   },
//   {
//     name: "Feb",
//     Sales: 8000,
//     Revenue: -8000,
//     amt: 2210
//   },
//   {
//     name: "Mar",
//     Sales: 8000,
//     Revenue: -12000,
//     amt: 2290
//   },
//   {
//     name: "Apr",
//     Sales: 16000,
//     Revenue: -16000,
//     amt: 2000
//   },
//   {
//     name: "May",
//     Sales: 13000,
//     Revenue: -13000,
//     amt: 2181
//   },
//   {
//     name: "Jun",
//     Sales: 9000,
//     Revenue: -7000,
//     amt: 2500
//   },
//   {
//     name: "Jul",
//     Sales: 10500,
//     Revenue: -9500,
//     amt: 2100
//   },
//   {
//     name: "Aug",
//     Sales: 8500,
//     Revenue: -10500,
//     amt: 2800
//   },
//   {
//     name: "Sep",
//     Sales: 8000,
//     Revenue: -8500,
//     amt: 2800
//   },
//   {
//     name: "Oct",
//     Sales: 9000,
//     Revenue: -7000,
//     amt: 2500
//   },
//   // {
//   //   name: "Nov",
//   //   Sales: 8000,
//   //   Revenue: -8000,
//   //   amt: 2210
//   // },
//   // {
//   //   name: "Dec",
//   //   Sales: 10500,
//   //   Revenue: -9500,
//   //   amt: 2100
//   // },
// ];

// export default function Graph() {
//   const pages = ['Products', 'Pricing', 'Blog'];
//   const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };
//   return (
//     <>
//       <Box className='dashboard-graph'>
//         <Box className='graph-header'>
//           <Box className='header-content'>
//             <Typography component='h2'>Statistics</Typography>
//             <Box className='graph-stats'>
//               <Box className='stats-box'>
//                 <Box className='dot'></Box>
//                 <Typography>Sales</Typography>
//               </Box>
//               <Box className='stats-box'>
//                 <Box className='dot'></Box>
//                 <Typography>Insight</Typography>
//               </Box>
//             </Box>
//           </Box>
//           <Box className='graph-menu'>
//             <FormControl className="graph-select" sx={{ minWidth: 132 }}>
//               <NativeSelect
//                 defaultValue={10}
//                 inputProps={{
//                   name: 'year',
//                   id: 'year',
//                 }}
//               >
//                 <option value={10}>This Year</option>
//                 <option value={20}>Last Year</option>
//               </NativeSelect>
//             </FormControl>
//             <FormControl className="graph-select" sx={{ minWidth: 132 }}>
//               <NativeSelect
//                 defaultValue={10}
//                 inputProps={{
//                   name: 'summary',
//                   id: 'summary',
//                 }}
//               >
//                 <option value={10}>Summary</option>
//                 <option value={20}>Summary1</option>
//               </NativeSelect>
//             </FormControl>
//             <IconButton className='graph-dropdown' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//               <MoreHorizIcon />
//             </IconButton>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Box>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart width={550} height={340} data={data} stackOffset="sign" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             {/* <YAxis tickFormatter={(value) => Math.abs(value) >= 1000 ? `${(value / 1000).toLocaleString()}K` : value} /> */}

//             <YAxis
//               tickFormatter={(value) => {
//                 if (value === 0) {
//                   return '$0';
//                 } else if (value > 0) {
//                   return `${Math.abs(value) >= 1000 ? `${(value / 1000).toLocaleString()}K` : value}`; 
//                 } else {
//                   return `$${Math.abs(value) >= 1000 ? `${(Math.abs(value) / 1000).toLocaleString()}K` : Math.abs(value)}`; 
//                 }
//               }}
//             />
            
//             <Tooltip />
//             <Legend />
//             <ReferenceLine y={0} stroke="#000" />
//             <Bar dataKey="Revenue" fill="#000000" radius={[20, 20, 0, 0]} stackId="stack" />
//             <Bar dataKey="Sales" fill="url(#pattern-stripe)" radius={[20, 20, 0, 0]} stackId="stack" />

//             <defs>
//               <pattern id="pattern-stripe" width="4" height="4" patternUnits="userSpaceOnUse">
//                 <rect width="4" height="4" fill="#275021" />
//                 <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="black" strokeWidth="1" />
//               </pattern>
//             </defs>
//           </BarChart>
//         </ResponsiveContainer>
//       </Box>
//     </>
//   );
// }
