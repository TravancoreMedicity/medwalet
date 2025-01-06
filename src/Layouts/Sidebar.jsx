import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// Custom icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CarRentalIcon from '@mui/icons-material/CarRental';
import PersonIcon from '@mui/icons-material/Person';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const newlogo = require("../assets/logo/medlogo.png")

const DrawerComponent = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();

  const handleNavigation = useCallback((route) => {

    toggleDrawer(false);
    setTimeout(() => {
      navigate(route);
    }, 50);
  }, [navigate, toggleDrawer]);


  const DrawerList = (
    <Box
      sx={{
        width: { xs: 250, sm: 350 ,md:350,lg:350},
        height: '100vh',
        bgcolor: 'red',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List
        sx={{
          height: '100%',
          bgcolor: '#bbdefb',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',

        }}>
        <Box
          sx={{
            width: { xs: 250, sm: 350 ,md:350,lg:350},
            height: 80,
            display: 'flex',
            alignItems: 'center',
            color: 'black',
            position: 'sticky',
            top: -20,
            zIndex: 1100,
            px: 2,
            bgcolor: '#bbdefb',
          }}>
          <img
            src={newlogo}
            width={40}
            height={40}
            alt='medicity-log'
          />
          <Typography sx={{ fontFamily: 'Roboto', mt: 2, fontSize: 22, fontWeight: 500 }}>TRAVANCORE MEDICITY</Typography>
        </Box>
        {['DashBoard', 'Slot Master', 'Zone Master', 'User Master', 'UserRight Master', 'Driver Attendance', 'Reports'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ mt: 2 }} onClick={() => handleNavigation(
              text === 'DashBoard' ? '/Home/dashboard' :
                text === 'Slot Master' ? '/Slot/mainpage' :
                  text === 'Zone Master' ? '/Zone/mainpage' :
                    text === 'User Master' ? '/User/mainpage' :
                      text === 'UserRight Master' ? '/UserRight/main' :
                        text === 'Driver Attendance' ? '/Driver/mainpage' : '/Reports/mainpage'
            )}>
              <ListItemIcon>
                {text === 'DashBoard' && <DashboardIcon sx={{ fontSize: 32, color: "black" }} />}
                {text === 'Zone Master' && <EmojiPeopleIcon sx={{ fontSize: 32, color: "black" }} />}
                {text === 'Slot Master' && <GolfCourseIcon sx={{ fontSize: 32, color: "black" }} />}
                {text === 'User Master' && <PersonIcon sx={{ fontSize: 32, color: "black" }} />}
                {text === 'UserRight Master' && <DoneAllIcon sx={{ fontSize: 32, color: "black" }} />}
                {text === 'Driver Attendance' && <CarRentalIcon sx={{ fontSize: 32, color: "black" }} />}
                {text === 'Reports' && <PostAddIcon sx={{ fontSize: 32, color: "black" }} />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={toggleDrawer(false)} >
      {DrawerList}
    </Drawer>
  );
};

export default DrawerComponent;





