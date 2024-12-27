import React, { lazy, Suspense, useState } from 'react'
import Header from './Header'
import DrawerComponent from './Sidebar'
import { Box, useMediaQuery, Skeleton } from '@mui/material';
import { Outlet } from 'react-router-dom';


const BackButton = lazy(() => import('../Components/BackButton'))
const RootLayouts = () => {

  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');


  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(inOpen);
  };

  return (
    <Box>
      <Header toggleDrawer={toggleDrawer} isSmallScreen={isSmallScreen} />
      {/* Drawer Component */}
      <DrawerComponent open={open} toggleDrawer={toggleDrawer} />
      <Suspense ><BackButton /></Suspense>
      <Outlet />
    </Box>
  )
}

export default RootLayouts