import React, { useState } from 'react'
import Header from './Header'
import DrawerComponent from './Sidebar'
import { useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import BackButton from '../Components/BackButton';

const RootLayouts = () => {

    const [open, setOpen] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
  
    const toggleDrawer = (value) => () => {
      setOpen(value);
    };

    return (
        <div>
            <Header toggleDrawer={toggleDrawer} isSmallScreen={isSmallScreen} />
            {/* Drawer Component */}
            <DrawerComponent open={open} toggleDrawer={toggleDrawer} />

            <BackButton/>
            <Outlet/>
        </div>
    )
}

export default RootLayouts