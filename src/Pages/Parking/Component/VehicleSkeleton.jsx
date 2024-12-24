import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { Grid } from '@mui/joy'

const VehicleSkeleton = () => {
    return (
        <Grid container py={2} sx={{ width: '98%', height: '100%', display: 'flex' }}>
            {[...Array(6)].map((_, index) => (
                <Grid
                    mb={1}
                    lg={4}
                    md={4}
                    sm={6}
                    xs={6}
                    sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                    key={index}
                >
                    <Box
                        sx={{
                            width: '98%',
                            height: { xs: 200, sm: 240, md: 270, lg: 290 },
                            borderRadius: 2,
                            boxShadow: 2,
                            cursor: 'pointer',
                            position: 'relative',
                        }}
                    >
                        <Box sx={{ width: '100%', height: '60%', position: 'relative', p: 0.5 }}>
                            <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 3 }} />
                        </Box>
                        <Box sx={{ width: '100%', height: '40%', position: 'relative', p: 0.5 }}>
                            <Skeleton variant="rectangular" width="80%" sx={{ fontSize: { xs: 12, sm: 16, md: 18, lg: 18 },  marginBottom: 1 }} />
                            <Skeleton variant="rectangular" width="70%" sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 17 },  marginBottom: 1 }} />
                            <Skeleton variant="rectangular" width="75%" sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 17 } }} />
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default VehicleSkeleton;
