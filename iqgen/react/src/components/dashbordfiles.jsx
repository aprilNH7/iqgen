import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, ButtonGroup, IconButton, FormControl, InputLabel, MenuItem } from '@mui/material'
import Select from '@mui/material/Select';
import { useParams } from "react-router-dom";
import UploadBtn from './filesimageuploadbtn'
import ButtonNav from './dashboardbtnnav'
import FilesTable from './filestable';
import Yourfolder from './yourfolder';
import Switch, { switchClasses } from '@mui/joy/Switch';
import axios from "axios";



const Togglebtn = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      sx={(theme) => ({
        '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
        '--Switch-thumbSize': '27px',
        '--Switch-trackWidth': '72px',
        '--Switch-trackHeight': '31px',
        '--Switch-trackBackground': theme.vars.palette.background.level3,
        [`& .${switchClasses.thumb}`]: {
          transition: 'width 0.2s, left 0.2s',
        },
        '&:hover': {
          '--Switch-trackBackground': theme.vars.palette.background.level3,
        },
        '&:active': {
          '--Switch-thumbWidth': '32px',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-trackBackground': '#275021',
          '&:hover': {
            '--Switch-trackBackground': '#275021',
          },
        },
      })}
    />
  );
}



const Dashbordfiles = () => {
  const { id } = useParams();
  const [actionbtn, setActionbtn] = useState(null);
  const [showfolder, setShowfolder] = useState(false);
  const [btnblock, setBtnBlock] = useState(true);
  const [project, setProject] = useState(null);
  const [s3Data, setS3Data] = useState({ files: [], folders: [] });



  const handleshow = () => {
    setShowfolder(!showfolder)
  }
  const handleOpenction = (event) => {
    setActionbtn(event.currentTarget);
  };


  const handleCloseaction = () => {
    setActionbtn(null);
  };


  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  useEffect(() => {
    if (project?._id) {
      fetchS3Data(project._id);
    }
  }, [project]);


  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects/${id}`);
      setProject(response.data.project);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const fetchS3Data = async (projectID) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/get-s3-files?projectID=${projectID}`);
      setS3Data(response.data);
    } catch (error) {
      console.error("Error fetching S3 data:", error);
    }
  };

  return (
    <Box className="photo-wrapper">
      <Box className="files-btn-wrapper">
        <ButtonNav project={project} />
        <UploadBtn />
      </Box>
      <Box className="your-files">
        <Box className="file-btns-icons">
          <ButtonGroup
            variant="outlined"
            aria-label="Disabled button group"
          >
            <Button className="button-group" onClick={() => setBtnBlock(false)}>
              <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1203_635)">
                  <path d="M2.86735 2.0625C2.46384 2.0625 2.06939 2.18346 1.73388 2.41009C1.39837 2.63672 1.13687 2.95884 0.982451 3.33572C0.828032 3.71259 0.78763 4.12729 0.866351 4.52737C0.945073 4.92746 1.13938 5.29496 1.42471 5.58341C1.71004 5.87185 2.07357 6.06829 2.46933 6.14787C2.86509 6.22745 3.27531 6.18661 3.6481 6.0305C4.0209 5.8744 4.33954 5.61004 4.56372 5.27086C4.7879 4.93169 4.90756 4.53292 4.90756 4.125C4.90756 3.57799 4.69261 3.05339 4.30999 2.66659C3.92738 2.2798 3.40845 2.0625 2.86735 2.0625ZM2.86735 8.9375C2.46384 8.9375 2.06939 9.05846 1.73388 9.28509C1.39837 9.51172 1.13687 9.83384 0.982451 10.2107C0.828032 10.5876 0.78763 11.0023 0.866351 11.4024C0.945073 11.8025 1.13938 12.17 1.42471 12.4584C1.71004 12.7469 2.07357 12.9433 2.46933 13.0229C2.86509 13.1025 3.27531 13.0616 3.6481 12.9055C4.0209 12.7494 4.33954 12.485 4.56372 12.1459C4.7879 11.8067 4.90756 11.4079 4.90756 11C4.90756 10.453 4.69261 9.92839 4.30999 9.54159C3.92738 9.1548 3.40845 8.9375 2.86735 8.9375ZM2.86735 15.8125C2.46384 15.8125 2.06939 15.9335 1.73388 16.1601C1.39837 16.3867 1.13687 16.7088 0.982451 17.0857C0.828032 17.4626 0.78763 17.8773 0.866351 18.2774C0.945073 18.6775 1.13938 19.045 1.42471 19.3334C1.71004 19.6219 2.07357 19.8183 2.46933 19.8979C2.86509 19.9775 3.27531 19.9366 3.6481 19.7805C4.0209 19.6244 4.33954 19.36 4.56372 19.0209C4.7879 18.6817 4.90756 18.2829 4.90756 17.875C4.90756 17.328 4.69261 16.8034 4.30999 16.4166C3.92738 16.0298 3.40845 15.8125 2.86735 15.8125ZM21.9092 16.5H8.30789C8.12753 16.5 7.95455 16.5724 7.82701 16.7014C7.69948 16.8303 7.62783 17.0052 7.62783 17.1875V18.5625C7.62783 18.7448 7.69948 18.9197 7.82701 19.0486C7.95455 19.1776 8.12753 19.25 8.30789 19.25H21.9092C22.0896 19.25 22.2626 19.1776 22.3901 19.0486C22.5177 18.9197 22.5893 18.7448 22.5893 18.5625V17.1875C22.5893 17.0052 22.5177 16.8303 22.3901 16.7014C22.2626 16.5724 22.0896 16.5 21.9092 16.5ZM21.9092 2.75H8.30789C8.12753 2.75 7.95455 2.82243 7.82701 2.95136C7.69948 3.0803 7.62783 3.25516 7.62783 3.4375V4.8125C7.62783 4.99484 7.69948 5.1697 7.82701 5.29864C7.95455 5.42757 8.12753 5.5 8.30789 5.5H21.9092C22.0896 5.5 22.2626 5.42757 22.3901 5.29864C22.5177 5.1697 22.5893 4.99484 22.5893 4.8125V3.4375C22.5893 3.25516 22.5177 3.0803 22.3901 2.95136C22.2626 2.82243 22.0896 2.75 21.9092 2.75ZM21.9092 9.625H8.30789C8.12753 9.625 7.95455 9.69743 7.82701 9.82636C7.69948 9.9553 7.62783 10.1302 7.62783 10.3125V11.6875C7.62783 11.8698 7.69948 12.0447 7.82701 12.1736C7.95455 12.3026 8.12753 12.375 8.30789 12.375H21.9092C22.0896 12.375 22.2626 12.3026 22.3901 12.1736C22.5177 12.0447 22.5893 11.8698 22.5893 11.6875V10.3125C22.5893 10.1302 22.5177 9.9553 22.3901 9.82636C22.2626 9.69743 22.0896 9.625 21.9092 9.625Z" fill={!btnblock ? "#275021" : "#dadbde"} />
                </g>
                <defs>
                  <clipPath id="clip0_1203_635">
                    <rect width="21.7622" height="22" fill="white" transform="translate(0.827148)" />
                  </clipPath>
                </defs>
              </svg>
            </Button>
            <Button className="button-group" onClick={() => setBtnBlock(true)}>
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.28613 11H11.1996V3H3.28613V11ZM3.28613 21H11.1996V13H3.28613V21ZM13.178 21H21.0915V13H13.178V21ZM13.178 3V11H21.0915V3" fill={btnblock ? "#275021" : "#dadbde"} />
              </svg>
            </Button>
          </ButtonGroup>
          <IconButton className="files-icon-btn" size="large" onClick={handleshow}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.2535 8.81453H11.4241V0.985107H8.81429V8.81453H0.984863V11.4243H8.81429V19.2538H11.4241V11.4243H19.2535V8.81453Z" fill="white" />
            </svg>
          </IconButton>
        </Box>
        {showfolder && <Yourfolder folders={s3Data.folders} actionbtn={actionbtn} showfolder={showfolder} btnblock={btnblock} handleOpenction={handleOpenction} handleCloseaction={handleCloseaction} />}
        <FilesTable files={s3Data.files} actionbtn={actionbtn} handleOpenction={handleOpenction} handleCloseaction={handleCloseaction} Togglebtn={Togglebtn} onUpdate={fetchS3Data} project={project}/>
      </Box>
    </Box>
  )
}

export default Dashbordfiles;   