import React from 'react';
import { Box, Skeleton, } from '@mui/material';


const FilterFunctionSkeleton = () => {
  return (
    <Box sx={{
      height: 60,
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      // boxShadow: 3,
      my: 1,
      borderRadius: 1,
      pl: 1,
      borderBottom: '1px solid #e9ecef',
      gap: 2
    }}>
      {/* Filter icon and title */}
      <Box sx={{ display: 'flex' }}>
        <Skeleton variant="circular" width={24} height={24} sx={{ marginRight: 1 }} />
        <Skeleton variant="text" width={100} height={30} />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Skeleton variant="circular" width={24} height={24} sx={{ marginRight: 1 }} />
        <Skeleton variant="text" width={45} height={30} />
      </Box>

      <Box sx={{ display: 'flex' }}>
      <Skeleton variant="circular" width={24} height={24} sx={{ marginRight: 1 }} />
      <Skeleton variant="text" width={45} height={30} />
      </Box>

      <Box sx={{ display: 'flex' }}>
      <Skeleton variant="circular" width={24} height={24} sx={{ marginRight: 1 }} />
      <Skeleton variant="text" width={85} height={30} />
      </Box>    
    </Box>
  );
};

export default FilterFunctionSkeleton;
