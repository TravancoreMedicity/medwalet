import React, { lazy, Suspense } from 'react';
import { Box } from '@mui/material';
import LabourSelectBox from '../Components/AutoComplete';



const Testcomponent = lazy(() => import("./Parking/Testcomponent"))
const FormModal = lazy(() => import("./Parking/FormModal"))
const AllZones = lazy(() => import("./Parking/AllZones"))

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{
        flex: 1,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',

      }}>
       <Suspense fallback="loading"> <Testcomponent /></Suspense>
        <FormModal />
        <AllZones />
      </Box>

    </Box>
  );
};

export default Dashboard;
