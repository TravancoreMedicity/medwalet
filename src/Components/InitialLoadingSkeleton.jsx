import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/joy';
import { Box } from '@mui/material';


function InitialLoadingSkeleton() {
    return (
        <>
            <Grid container py={1} gap={0.5} sx={{ width: '100%', minHeight: 200, display: 'flex', flexDirection: { lg: 'row', md: 'row', sm: 'row', xs: 'column' }, flexWrap: 'wrap', px: 1 }}>
                {[...Array(6)].map((_, index) => (
                    <Grid mb={1} key={index} width={{ xs: '100%', sm: 220 }}
                        sx={{
                            display: 'flex',
                            height: '100%',
                            alignItems: "center",
                            justifyContent: 'center',
                            flexGrow: 1,
                        }}>
                        <Box sx={{
                            height: { xs: 50, sm: 80, md: 120 },
                            backgroundColor: 'white',
                            borderRadius: 2,
                            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                            display: 'flex',
                            cursor: 'pointer',
                            position: 'relative',
                            flex: 1
                        }}>
                            <Skeleton variant="rectangular" width={'100%'} height={'100%'} sx={{ borderRadius: 2 }} />
                        </Box>
                    </Grid>
                ))}
        </Grid >


        </>
    )
}

export default InitialLoadingSkeleton



