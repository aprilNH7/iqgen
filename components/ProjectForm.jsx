import React, { useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';

const ProjectForm = ({ onSave }) => {
    const [project, setProject] = useState({
        projectName: '',
        status: 'Term Sheet / Pre-Approval Pending',
        address: '',
        companyName: '',
        dollarAmount: '',
        systemSizeKW: '',
        projectType: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setProject(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSave(project);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField name="projectName" label="Project Name" value={project.projectName} onChange={handleChange} fullWidth />
            <TextField name="address" label="Address" value={project.address} onChange={handleChange} fullWidth />
            <TextField name="companyName" label="Company Name" value={project.companyName} onChange={handleChange} fullWidth />
            <TextField name="dollarAmount" label="Dollar Amount" type="number" value={project.dollarAmount} onChange={handleChange} fullWidth />
            <TextField name="systemSizeKW" label="System Size (KW)" type="number" value={project.systemSizeKW} onChange={handleChange} fullWidth />
            <TextField select name="projectType" label="Project Type" value={project.projectType} onChange={handleChange} fullWidth>
                <MenuItem value="Residential">Residential</MenuItem>
                <MenuItem value="Commercial">Commercial</MenuItem>
            </TextField>
            <Button type="submit" color="primary" variant="contained">Create Project</Button>
        </form>
    );
};

export default ProjectForm;
