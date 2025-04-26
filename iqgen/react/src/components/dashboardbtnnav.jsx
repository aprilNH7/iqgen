import React from 'react'
import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const ButtonNav = ({ handleprojectedit, project }) => {
  const navigate = useNavigate();

  // const handleNavigation = (path) => {
  //   navigate(path);
  // };

  const handleNavigation = (path) => {
    if (project?._id) {
      navigate(`${path}/${project._id}`);
    } else {
      navigate(path);
    }
  };




  return (
    <Box className="btn-wrapper">
      <IconButton className="nav-icon-button"  >

      </IconButton>
      <IconButton className="nav-icon-button icon-btn-active" aria-label="files"  >
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 3.04058C11.9757 2.93841 9.66166 3.0292 6.73865 3.31262C5.69543 3.41376 4.86239 4.33831 4.76588 5.51183C4.37042 10.3205 4.44716 13.6909 4.792 18.4438C4.87877 19.6397 5.71856 20.5949 6.78078 20.6968C10.9928 21.1009 13.9667 21.1019 18.2331 20.6948C19.2928 20.5937 20.1326 19.6437 20.2203 18.4508C20.4822 14.8894 20.5688 12.1199 20.4433 8.9839M14.5 3.04058L20.4433 8.9839M14.5 3.04058V6.48391C14.5 7.86462 15.6193 8.9839 17 8.9839H20.4433" stroke="black" stroke-width="1.5" />
          <path d="M8.5 12.5H16.5" stroke="black" stroke-width="1.5" stroke-linecap="round" />
          <path d="M8.5 16H13.5" stroke="black" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </IconButton>
      <IconButton className="nav-icon-button" aria-label="Gallery" onClick={() => handleNavigation('/photos')} >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.14992 15.8419L2.13325 15.8586C1.90825 15.3669 1.76659 14.8086 1.70825 14.1919C1.76659 14.8002 1.92492 15.3502 2.14992 15.8419Z" fill="#F5F5F5" />
          <path d="M7.49993 8.65008C8.5953 8.65008 9.48327 7.76211 9.48327 6.66674C9.48327 5.57138 8.5953 4.68341 7.49993 4.68341C6.40457 4.68341 5.5166 5.57138 5.5166 6.66674C5.5166 7.76211 6.40457 8.65008 7.49993 8.65008Z" fill="#F5F5F5" />
          <path d="M13.4917 1.66669H6.50841C3.47508 1.66669 1.66675 3.47502 1.66675 6.50835V13.4917C1.66675 14.4 1.82508 15.1917 2.13341 15.8584C2.85008 17.4417 4.38341 18.3334 6.50841 18.3334H13.4917C16.5251 18.3334 18.3334 16.525 18.3334 13.4917V11.5834V6.50835C18.3334 3.47502 16.5251 1.66669 13.4917 1.66669ZM16.9751 10.4167C16.3251 9.85835 15.2751 9.85835 14.6251 10.4167L11.1584 13.3917C10.5084 13.95 9.45841 13.95 8.80841 13.3917L8.52508 13.1584C7.93341 12.6417 6.99175 12.5917 6.32508 13.0417L3.20841 15.1334C3.02508 14.6667 2.91675 14.125 2.91675 13.4917V6.50835C2.91675 4.15835 4.15841 2.91669 6.50841 2.91669H13.4917C15.8417 2.91669 17.0834 4.15835 17.0834 6.50835V10.5084L16.9751 10.4167Z" fill="#F5F5F5" />
        </svg>
      </IconButton>
      <IconButton className="nav-icon-button" aria-label="Settings" onClick={handleprojectedit} >
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12.5" cy="12" r="3" stroke="white" stroke-width="1.5" />
          <path d="M14.4999 4.02152C14.4999 3.55449 14.1772 3.14367 13.7144 3.08124C13.3172 3.02766 12.9118 3 12.5 3C12.0881 3 11.6827 3.02767 11.2855 3.08124C10.8227 3.14367 10.4999 3.5545 10.4999 4.02153V4.17129C10.4999 4.83491 10.0556 5.40496 9.45806 5.69371C9.14516 5.84492 8.84522 6.01873 8.56036 6.21303C8.01227 6.58688 7.29662 6.68645 6.72205 6.35472L6.59127 6.27922C6.1872 6.04593 5.6706 6.11959 5.38461 6.48825C4.88925 7.12682 4.47794 7.83385 4.1673 8.59276C3.99055 9.02456 4.1851 9.50882 4.58916 9.7421L4.72159 9.81856C5.2957 10.15 5.56753 10.8189 5.51899 11.48C5.50638 11.6517 5.49997 11.8251 5.49997 12C5.49997 12.1749 5.50638 12.3483 5.51899 12.5199C5.56753 13.1811 5.2957 13.8499 4.72159 14.1814L4.58914 14.2579C4.18508 14.4911 3.99054 14.9754 4.16728 15.4072C4.47792 16.1661 4.88922 16.8731 5.38458 17.5117C5.67057 17.8804 6.18717 17.954 6.59124 17.7207L6.72201 17.6452C7.29658 17.3135 8.01223 17.4131 8.56033 17.7869C8.84519 17.9813 9.14514 18.1551 9.45806 18.3063C10.0556 18.595 10.4999 19.1651 10.4999 19.8287V19.9785C10.4999 20.4455 10.8227 20.8563 11.2855 20.9188C11.6827 20.9723 12.0881 21 12.5 21C12.9118 21 13.3172 20.9723 13.7144 20.9188C14.1772 20.8563 14.4999 20.4455 14.4999 19.9785V19.8287C14.4999 19.1651 14.9443 18.5951 15.5418 18.3063C15.8548 18.1551 16.1547 17.9813 16.4396 17.787C16.9877 17.4131 17.7033 17.3136 18.2779 17.6453L18.4087 17.7208C18.8127 17.9541 19.3293 17.8804 19.6153 17.5118C20.1107 16.8732 20.522 16.1662 20.8326 15.4073C21.0094 14.9755 20.8148 14.4912 20.4108 14.2579L20.2783 14.1815C19.7042 13.85 19.4324 13.1811 19.4809 12.52C19.4936 12.3483 19.5 12.1749 19.5 12C19.5 11.8251 19.4936 11.6517 19.4809 11.48C19.4324 10.8188 19.7042 10.15 20.2783 9.8185L20.4108 9.74205C20.8148 9.50876 21.0094 9.0245 20.8326 8.5927C20.522 7.83379 20.1107 7.12676 19.6153 6.4882C19.3293 6.11955 18.8127 6.04588 18.4086 6.27917L18.2778 6.35469C17.7033 6.68641 16.9876 6.58685 16.4395 6.213C16.1547 6.01871 15.8547 5.8449 15.5418 5.69369C14.9443 5.40495 14.4999 4.8349 14.4999 4.17127V4.02152Z" stroke="white" stroke-width="1.5" />
        </svg>
      </IconButton>
      <IconButton className="nav-icon-button" aria-label="Chats" onClick={() => handleNavigation('/conversation')} >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M24.1429 12.381C24.1472 14.0151 23.7654 15.6271 23.0286 17.0857C21.2469 20.6506 17.6044 22.9032 13.6191 22.9048C11.985 22.909 10.3729 22.5272 8.91432 21.7905L1.85718 24.1429L4.20956 17.0857C3.47281 15.6271 3.09101 14.0151 3.09527 12.381C3.09682 8.39565 5.34944 4.75311 8.91432 2.97144C10.3729 2.23469 11.985 1.85289 13.6191 1.85715H14.2381C19.5815 2.15194 23.8481 6.41853 24.1429 11.7619V12.381V12.381Z" stroke="#FEFEFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </IconButton>
    </Box>
  )
}

export default ButtonNav;







// import React from 'react'
// import { Box } from '@mui/material'
// import IconButton from '@mui/material/IconButton';
// import { useNavigate } from 'react-router-dom';

// const ButtonNav = ({ handleprojectedit, project }) => {
//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//     if (project?._id) {
//       navigate(`${path}/${project._id}`);
//     } else {
//       navigate(path);
//     }
//   };

//   return (
//     <Box className="btn-wrapper">
//       <IconButton className="nav-icon-button icon-btn-active" aria-label="files" onClick={() => handleNavigation('/files')}>
//         <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M14.5 3.04058C11.9757 2.93841 9.66166 3.0292 6.73865 3.31262C5.69543 3.41376 4.86239 4.33831 4.76588 5.51183C4.37042 10.3205 4.44716 13.6909 4.792 18.4438C4.87877 19.6397 5.71856 20.5949 6.78078 20.6968C10.9928 21.1009 13.9667 21.1019 18.2331 20.6948C19.2928 20.5937 20.1326 19.6437 20.2203 18.4508C20.4822 14.8894 20.5688 12.1199 20.4433 8.9839M14.5 3.04058L20.4433 8.9839M14.5 3.04058V6.48391C14.5 7.86462 15.6193 8.9839 17 8.9839H20.4433" stroke="black" strokeWidth="1.5" />
//           <path d="M8.5 12.5H16.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
//           <path d="M8.5 16H13.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
//         </svg>
//       </IconButton>
//       <IconButton className="nav-icon-button" aria-label="Gallery" onClick={() => handleNavigation('/photos')}>
//         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M2.14992 15.8419L2.13325 15.8586C1.90825 15.3669 1.76659 14.8086 1.70825 14.1919C1.76659 14.8002 1.92492 15.3502 2.14992 15.8419Z" fill="#F5F5F5" />
//           <path d="M7.49993 8.65008C8.5953 8.65008 9.48327 7.76211 9.48327 6.66674C9.48327 5.57138 8.5953 4.68341 7.49993 4.68341C6.40457 4.68341 5.5166 5.57138 5.5166 6.66674C5.5166 7.76211 6.40457 8.65008 7.49993 8.65008Z" fill="#F5F5F5" />
//         </svg>
//       </IconButton>
//       <IconButton className="nav-icon-button" aria-label="Settings" onClick={handleprojectedit}>
//         <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <circle cx="12.5" cy="12" r="3" stroke="white" strokeWidth="1.5" />
//         </svg>
//       </IconButton>
//       <IconButton className="nav-icon-button" aria-label="Chats" onClick={() => handleNavigation('/conversation')}>
//         <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path fillRule="evenodd" clipRule="evenodd" d="M24.1429 12.381C24.1472 14.0151 23.7654 15.6271 23.0286 17.0857C21.2469 20.6506 17.6044 22.9032 13.6191 22.9048C11.985 22.909 10.3729 22.5272 8.91432 21.7905L1.85718 24.1429L4.20956 17.0857C3.47281 15.6271 3.09101 14.0151 3.09527 12.381C3.09682 8.39565 5.34944 4.75311 8.91432 2.97144C10.3729 2.23469 11.985 1.85289 13.6191 1.85715H14.2381C19.5815 2.15194 23.8481 6.41853 24.1429 11.7619V12.381V12.381Z" stroke="#FEFEFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//       </IconButton>
//     </Box>
//   );
// };

// export default ButtonNav;
