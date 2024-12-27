import { Box, Typography } from '@mui/joy'
import React, { lazy, Suspense } from 'react'
import Person3Icon from '@mui/icons-material/Person3';
const AttendaceCard = lazy(() => import('./AttendaceCard'))

function MobileAttendance() {
    return (
        <Box
            sx={{
                minHeight: 600,
                paddingTop: 7,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <Typography sx={{
                position: 'fixed',
                left: 6,
                top: 75,
            }}> <Person3Icon sx={{ fontSize: 18 }} />Driver Attendace</Typography>
            <Suspense fallback="loading"><AttendaceCard /></Suspense>
        </Box>
    )
}

export default MobileAttendance