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
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const logo = require("../assets/logo.png");

const newlogo = require("../assets/logo/medlogo.png")

const DrawerComponent = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();

  const handleNavigation = useCallback((route) => {
   
    toggleDrawer(false);  
    setTimeout(() => {
      navigate(route);  
    }, 150); 
  }, [navigate, toggleDrawer]);
  

  const DrawerList = (
    <Box sx={{ width: { xs: 250, sm: 350, height: '100vh' } }} role="presentation" onClick={toggleDrawer(false)}>
      <List sx={{ height: '100%', bgcolor: '#bbdefb' }}>
        <Box sx={{ width: '100%', height: 80, display: 'flex', alignItems: 'center', color: 'black', position: 'relative' }}>
          <img src={newlogo} width={50} height={50} />
          <Typography sx={{ fontFamily: 'Roboto', mt: 2, fontSize: 24, fontWeight: 500 }}>TRAVANCORE MEDICITY</Typography>
        </Box>
        {['DashBoard', 'Slot Master', 'Zone Master', 'User Master', 'Driver Master'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ mt: 2 }} onClick={() => handleNavigation(
              text === 'DashBoard' ? '/Home/dashboard' :
                text === 'Slot Master' ? '/Slot/mainpage' :
                  text === 'Zone Master' ? '/Zone/mainpage' :
                    text === 'User Master' ? '/User/mainpage' : '/Driver/main'
            )}>
              <ListItemIcon>
                {text === 'DashBoard' && <DashboardIcon sx={{ fontSize: 32, color: "black" }} />}
                {text === 'Zone Master' && <EmojiPeopleIcon sx={{ fontSize: 32, color: "black" }} />}
                {text === 'Slot Master' && <GolfCourseIcon sx={{ fontSize: 32, color: "black" }} />}
                {text === 'User Master' && <PersonIcon sx={{ fontSize: 32, color: "black" }} />}
                {text === 'Driver Master' && <CarRentalIcon sx={{ fontSize: 32, color: "black" }} />}
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





