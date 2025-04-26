import React from 'react';
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { CheckCircle, Create, AddCircle } from '@mui/icons-material'; // Example icons
import { StepIconProps } from '@mui/material/StepIcon';
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios";




// Custom SVG icon for complete step
const CompleteIcon = () => (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="27.5" fill="black" stroke="white" stroke-width="5" />
        <path d="M26.011 24.215C24.3 24.206 22.151 25.133 20.512 26.772C19.887 27.397 19.336 28.127 18.911 28.946C20.39 27.827 21.968 27.476 23.814 28.512C24.358 27.075 25.084 25.612 26.011 24.215V24.215ZM35.796 33.988C34.28 34.979 32.789 35.694 31.499 36.198C32.535 38.046 32.185 39.622 31.065 41.1C31.884 40.676 32.614 40.125 33.24 39.498C34.884 37.856 35.812 35.702 35.796 33.988V33.988ZM41.948 18.042C41.536 18.014 41.132 18 40.735 18C32.133 18 27.237 24.558 25.455 29.833L30.183 34.562C35.611 32.616 42 27.901 42 19.39C42 18.951 41.983 18.502 41.948 18.042V18.042ZM32.06 27.952C31.669 27.561 31.669 26.929 32.06 26.538C32.451 26.147 33.083 26.147 33.474 26.538C33.865 26.929 33.865 27.561 33.474 27.952C33.083 28.343 32.45 28.342 32.06 27.952ZM34.888 25.124C34.107 24.344 34.107 23.077 34.888 22.296C35.669 21.515 36.936 21.515 37.716 22.296C38.497 23.077 38.497 24.343 37.716 25.124C36.935 25.905 35.669 25.905 34.888 25.124ZM19.969 37.578L19.063 36.672L24.271 31.484L25.177 32.39L19.969 37.578V37.578ZM24.948 39.435L24.042 38.529L27.678 34.865L28.584 35.771L24.948 39.435ZM18.906 42L18 41.094L24.448 34.656L25.354 35.562L18.906 42Z" fill="white" />
    </svg>
);

// Custom SVG icon for active step
const ActiveIcon = () => (
    <svg width="60" height="62" viewBox="0 0 60 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="25" fill="black" />
        <g filter="url(#filter0_d_1189_56)">
            <circle cx="30" cy="30" r="20" fill="white" />
        </g>
        <path d="M35.5233 24L28 31.7113L24.476 28.3707L22 30.848L28 36.6667L38 26.4767L35.5233 24Z" fill="#36B289" />
        <defs>
            <filter id="filter0_d_1189_56" x="2" y="6" width="56" height="56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="4" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.196078 0 0 0 0 0.286275 0 0 0 0 0.392157 0 0 0 0.1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1189_56" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1189_56" result="shape" />
            </filter>
        </defs>
    </svg>
);

// Custom SVG icon for incomplete step
const IncompleteIcon = () => (
    <svg width="60" height="62" viewBox="0 0 60 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="25" fill="#E8F1FB" />
        <g filter="url(#filter0_d_1189_741)">
            <circle cx="30" cy="30" r="20" fill="white" />
        </g>
        <path
            d="M35.5233 24L28 31.7113L24.476 28.3707L22 30.848L28 36.6667L38 26.4767L35.5233 24Z"
            fill="#BBD6F5"
        />
        <defs>
            <filter
                id="filter0_d_1189_741"
                x="2"
                y="6"
                width="56"
                height="56"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="4" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.196078 0 0 0 0 0.286275 0 0 0 0 0.392157 0 0 0 0.1 0"
                />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1189_741" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1189_741" result="shape" />
            </filter>
        </defs>
    </svg>
);

// Custom SVG icon for incomplete step
const LastIcon = () => (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_1189_112)">
            <circle cx="42" cy="36" r="30" fill="black" />
            <circle cx="42" cy="36" r="27.5" stroke="white" stroke-width="5" />
        </g>
        <path d="M24.4159 41V39.8H26.5609V32.225L24.5509 33.74L23.8159 32.735L26.9209 30.5H27.9109V39.8H29.6959V41H24.4159ZM35.735 41.18C34.565 41.18 33.675 40.705 33.065 39.755C32.455 38.795 32.15 37.455 32.15 35.735C32.15 34.005 32.46 32.67 33.08 31.73C33.71 30.79 34.605 30.32 35.765 30.32C36.935 30.32 37.825 30.795 38.435 31.745C39.045 32.695 39.35 34.035 39.35 35.765C39.35 37.495 39.035 38.83 38.405 39.77C37.785 40.71 36.895 41.18 35.735 41.18ZM35.75 39.95C36.2 39.95 36.585 39.82 36.905 39.56C37.235 39.29 37.485 38.85 37.655 38.24C37.835 37.63 37.925 36.81 37.925 35.78C37.925 34.4 37.73 33.35 37.34 32.63C36.96 31.91 36.43 31.55 35.75 31.55C35.3 31.55 34.91 31.685 34.58 31.955C34.26 32.215 34.01 32.65 33.83 33.26C33.66 33.86 33.575 34.68 33.575 35.72C33.575 37.1 33.765 38.15 34.145 38.87C34.535 39.59 35.07 39.95 35.75 39.95ZM44.7291 41.18C43.5591 41.18 42.6691 40.705 42.0591 39.755C41.4491 38.795 41.1441 37.455 41.1441 35.735C41.1441 34.005 41.4541 32.67 42.0741 31.73C42.7041 30.79 43.5991 30.32 44.7591 30.32C45.9291 30.32 46.8191 30.795 47.4291 31.745C48.0391 32.695 48.3441 34.035 48.3441 35.765C48.3441 37.495 48.0291 38.83 47.3991 39.77C46.7791 40.71 45.8891 41.18 44.7291 41.18ZM44.7441 39.95C45.1941 39.95 45.5791 39.82 45.8991 39.56C46.2291 39.29 46.4791 38.85 46.6491 38.24C46.8291 37.63 46.9191 36.81 46.9191 35.78C46.9191 34.4 46.7241 33.35 46.3341 32.63C45.9541 31.91 45.4241 31.55 44.7441 31.55C44.2941 31.55 43.9041 31.685 43.5741 31.955C43.2541 32.215 43.0041 32.65 42.8241 33.26C42.6541 33.86 42.5691 34.68 42.5691 35.72C42.5691 37.1 42.7591 38.15 43.1391 38.87C43.5291 39.59 44.0641 39.95 44.7441 39.95ZM53.1233 41.6L52.2233 41.03L58.7783 29.9L59.6783 30.47L53.1233 41.6ZM52.3583 36.95C51.5283 36.95 50.8933 36.66 50.4533 36.08C50.0233 35.5 49.8083 34.69 49.8083 33.65C49.8083 32.61 50.0283 31.81 50.4683 31.25C50.9183 30.68 51.5533 30.395 52.3733 30.395C53.2033 30.395 53.8383 30.68 54.2783 31.25C54.7183 31.81 54.9383 32.61 54.9383 33.65C54.9383 34.68 54.7133 35.49 54.2633 36.08C53.8233 36.66 53.1883 36.95 52.3583 36.95ZM52.3733 35.945C52.7933 35.945 53.1183 35.775 53.3483 35.435C53.5783 35.095 53.6933 34.5 53.6933 33.65C53.6933 32.91 53.5783 32.35 53.3483 31.97C53.1183 31.58 52.7883 31.385 52.3583 31.385C51.9583 31.385 51.6383 31.555 51.3983 31.895C51.1683 32.225 51.0533 32.81 51.0533 33.65C51.0533 34.4 51.1683 34.97 51.3983 35.36C51.6283 35.75 51.9533 35.945 52.3733 35.945ZM59.5883 41.09C58.7583 41.09 58.1233 40.8 57.6833 40.22C57.2533 39.64 57.0383 38.83 57.0383 37.79C57.0383 36.75 57.2583 35.95 57.6983 35.39C58.1483 34.82 58.7833 34.535 59.6033 34.535C60.4333 34.535 61.0683 34.82 61.5083 35.39C61.9483 35.95 62.1683 36.75 62.1683 37.79C62.1683 38.82 61.9433 39.63 61.4933 40.22C61.0533 40.8 60.4183 41.09 59.5883 41.09ZM59.6033 40.085C60.0233 40.085 60.3483 39.915 60.5783 39.575C60.8083 39.235 60.9233 38.64 60.9233 37.79C60.9233 37.05 60.8083 36.49 60.5783 36.11C60.3483 35.72 60.0183 35.525 59.5883 35.525C59.1883 35.525 58.8683 35.695 58.6283 36.035C58.3983 36.365 58.2833 36.95 58.2833 37.79C58.2833 38.54 58.3983 39.11 58.6283 39.5C58.8583 39.89 59.1833 40.085 59.6033 40.085Z" fill="white" />
        <defs>
            <filter id="filter0_d_1189_112" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="6" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.196078 0 0 0 0 0.286275 0 0 0 0 0.392157 0 0 0 0.1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1189_112" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1189_112" result="shape" />
            </filter>
        </defs>
    </svg>
);

// Custom StepIcon component
const CustomStepIcon = (props) => {
    const { active, completed, index } = props;

    // Logic to check for the first and last steps
    const isFirstStep = index === 0;
    const isLastStep = index === 5;

    // Return different icons based on step state
    const getIcon = () => {
        if (isFirstStep) return <CompleteIcon />;
        if (isLastStep) return <LastIcon />;
        if (completed) return <CompleteIcon />;
        if (active) return <ActiveIcon />;
        return <IncompleteIcon />; // Your custom SVG for incomplete step
    };

    return <>{getIcon()}</>;
};


const steps = [
    'Term Sheet Issued',
    'Full Package Submission',
    'Validation',
    'Draw Schedule Approved',
    'Banking Information Confirmed',
    'Funded',
];



// const FormStep = ({ handlepopup, project }) => {
//     const activeStep = project?.submissionStatus === "Full" ? 2 : 1;

//     const handleStepClick = (index) => {
//         if (project?.submissionStatus === "Pending") {
//             handlepopup(index);
//         }
//     };

//     return (
//         <Box className='steps-wrapper'>
//             <Box className='steps-heading'>
//                 <Typography component='h2'>Progress:</Typography>
//             </Box>
//             <Stepper className='form-steps' activeStep={activeStep} alternativeLabel >
//                 {steps.map((label, index) => (
//                     <Step key={label} className={`form-step ${index <= activeStep ? "active-step" : ""}`} onClick={() => handleStepClick(index)} >
//                         <StepLabel className='form-step-label' StepIconComponent={CustomStepIcon}>
//                             {label}
//                         </StepLabel>
//                     </Step>
//                 ))}
//             </Stepper>
//         </Box>
//     );
// };



const FormStep = ({ handlepopup, project }) => {
    const [activeStep, setActiveStep] = useState(project?.activeStep || 1);

    useEffect(() => {
        setActiveStep(project?.activeStep || 1);
    }, [project?.activeStep]);

    const handleStepClick = async (index) => {
        if (project?.submissionStatus === "Pending") {
            handlepopup(index);
        } else if (project?.submissionStatus === "Full" && index === activeStep) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to move to the next step?",
                icon: "warning",
                showCancelButton: true,
                reverseButtons: true,
                confirmButtonText: "Yes, proceed",
                cancelButtonText: "No, stay here"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const nextStep = activeStep + 1;
                        const updateData = { step: nextStep };

                        if (nextStep === 6) {
                            updateData.fundedDate = new Date();
                        }

                        const response = await axios.put(
                            `${process.env.REACT_APP_API_BASE_URL}/projects/${project._id}/update-step`,
                            { step: nextStep }
                        );

                        if (response.data.success) {
                            setActiveStep(nextStep);
                            await Swal.fire("Completed!", "The step has been updated.", "success");
                        } else {
                            Swal.fire("Error!", "Failed to update step. Try again.", "error");
                        }
                    } catch (error) {
                        console.error("Error updating step:", error);
                        Swal.fire("Error!", "Something went wrong. Try again later.", "error");
                    }
                }
            });
        }
    };

    return (
        <Box className="steps-wrapper">
            <Box className="steps-heading">
                <Typography component="h2">Progress:</Typography>
            </Box>
            <Stepper className="form-steps" activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step
                        key={label}
                        className={`form-step ${index <= activeStep ? "active-step" : ""}`}
                        onClick={() => handleStepClick(index)}
                    >
                        <StepLabel className="form-step-label" StepIconComponent={CustomStepIcon}>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};



export default FormStep;