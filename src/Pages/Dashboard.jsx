import React, { lazy, memo, Suspense } from 'react';
import { Box, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getAllSlotMaster, getAllVehicles } from '../Views/CommonComponents/useQueryFunctions';
import server from '../assets/machine-repair.png'
import ServerDown from '../Components/ServerDown';
import InitialLoadingSkeleton from '../Components/InitialLoadingSkeleton';
import VehicleSkeleton from './Parking/Component/VehicleSkeleton';
import { ToastContainer } from 'react-toastify';



const Testcomponent = lazy(() => import("./Parking/Testcomponent"))
const FormModal = lazy(() => import("./Parking/FormModal"))
const AllZones = lazy(() => import("./Parking/AllZones"))

const Dashboard = () => {

  //fetches the all vehicle details
  const { success, data: allvehicles, isLoading, isError, refetch } = useQuery({
    queryKey: ['allvehicles'],
    queryFn: () => getAllVehicles()
  });

  const { success:SlotMasterSuccess, data: allslotMaster } = useQuery({
    queryKey: ['allslotMaster'],
    queryFn: () => getAllSlotMaster(),
  })

  if (isError) {
    return <ServerDown />

  }
  if (isLoading) {
    return (
      <>
        <InitialLoadingSkeleton />
        <VehicleSkeleton />
      </>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
      <Box sx={{
        flex: 1,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
      }}>
        <Suspense fallback={<InitialLoadingSkeleton />}> <Testcomponent zone={allslotMaster} vehilce={allvehicles} /></Suspense>
        <Suspense><FormModal refetch={refetch} allvehicles={allvehicles} /></Suspense>
        <Suspense ><AllZones allvehicles={allvehicles} isLoading={isLoading} isError={isError} refetch={refetch} /></Suspense>
      </Box>

    </Box>
  );
};

export default memo(Dashboard);
