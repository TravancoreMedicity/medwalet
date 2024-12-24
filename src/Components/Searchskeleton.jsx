import React from 'react';
import { Box, Skeleton, } from '@mui/material';

function Searchskeleton() {
    return (
        <Box sx={{
            height: 60,
            display: 'flex',
            alignItems: 'center',
            my: 1,
            borderRadius: 1,
            pl: 1,
            borderBottom: '1px solid #e9ecef',
            gap: 1,
            width: 600
        }}>
            <Skeleton variant="rectangular" width={170} height={40} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" width={170} height={40} sx={{ borderRadius: 1 }} />

            {/* Skeleton for the Search Button */}
            <Skeleton variant="circular" width={40} height={40} sx={{ marginLeft: 1 }} />
        </Box>
    )
}

export default Searchskeleton