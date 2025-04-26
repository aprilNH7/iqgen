import React, { useEffect, useState } from "react";
import Yourprofile from '../../components/yourprofile';
import SettingHeader from '../../components/settingsHeader';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const ProfileSettings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
    fetchUserDetails();
  }, []);


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




  return (
    <>
      <SettingHeader />
      <Yourprofile user={user} onUpdate={fetchUserDetails}/>
    </>
  )
}

export default ProfileSettings;