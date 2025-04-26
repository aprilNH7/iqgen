import React from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';

const ProjectTable = ({ projects }) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Dollar Amount</TableCell>
                <TableCell>System Size (KW)</TableCell>
                <TableCell>Project Type</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {projects.map(project => (
                <TableRow key={project._id}>
                    <TableCell>{project.projectName}</TableCell>
                    <TableCell>{project.status}</TableCell>
                    <TableCell>{project.address}</TableCell>
                    <TableCell>{project.companyName}</TableCell>
                    <TableCell>${project.dollarAmount}</TableCell>
                    <TableCell>{project.systemSizeKW} KW</TableCell>
                    <TableCell>{project.projectType}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default ProjectTable;
