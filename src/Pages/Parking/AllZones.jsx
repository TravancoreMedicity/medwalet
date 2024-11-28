import { Box, Button, Typography } from '@mui/material'
import React, { lazy } from 'react'


const AllVehicles = lazy(() => import("./AllVehicles"))

export default function AllZones() {
    const zone = [
        "zone1",
        'zone2',
        "zone3",
        'zone4'
    ]

    return (
        <Box>
            {
                zone?.map((item) => {
                    return (
                        <Box sx={{ width: '100%', minHeight: 300, mt: 3 }} key={item}>
                            <Typography sx={{ ml: 1, fontSize: { xs: 15, sm: 18, md: 24, lg: 30 }, fontWeight: 600 }}>{item}</Typography>
                            <AllVehicles />
                        </Box>
                    )
                })
            }
        </Box>
    )
}
