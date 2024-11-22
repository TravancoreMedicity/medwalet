import React, { lazy, useMemo, useState } from 'react';
import Header from '../../Layouts/Header'
import DrawerComponent from '../../Layouts/Sidebar';

import { Box, Typography, useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AllVehicles from './AllVehicles';

export default function ParkingType() {


    const location = useLocation()
    const memoizedState = useMemo(() => location.state?.type?.toUpperCase(), [location.state?.type]);
    return (
        <Box>
            <Typography mx={3} mt={3} sx={{ fontSize: {xs:12,sm:14,md:20, lg: 26 } ,fontWeight:500}}>{memoizedState}</Typography>
            <AllVehicles memoizedState={memoizedState}/>
        </Box>
    )
}
