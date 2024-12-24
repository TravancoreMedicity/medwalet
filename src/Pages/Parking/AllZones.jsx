import { Box, Typography } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import Skeleton from '@mui/material/Skeleton';
import VehicleSkeleton from './Component/VehicleSkeleton';
import { ToastContainer } from 'react-toastify';

const AllVehicles = lazy(() => import("./AllVehicles"))

export default function AllZones({ allvehicles, isLoading, isError, refetch }) {

    if (isError) {
        return <Typography>Error occured</Typography>
    }
    if (isLoading) {
        return <VehicleSkeleton />
    }

    //The given reduce method iterates over an array, 
    // applying a reducer function to each element, accumulating a 
    // single output value .Here in our case it will group the data based on zone_name.
    const groupedByZone = allvehicles?.reduce((acc, vehicle) => {
        const zone = vehicle.zone_name || "Unknown Zone";
        if (!acc[zone]) {
            acc[zone] = [];
        }
        acc[zone].push(vehicle);
        return acc;
    }, {});



    return (
        <Box >
            <ToastContainer/>
            {
                groupedByZone &&
                Object.entries(groupedByZone)
                    .map(([zonename, vehicle], index) => (
                        <Box
                            sx={{
                                width: '100%',
                                minHeight: 240,
                                mt: 3
                            }}
                            key={index}>
                            <Typography
                                sx={{
                                    ml: 1,
                                    fontSize: { xs: 15, sm: 18, md: 24, lg: 30 },
                                    fontWeight: 600
                                }}>
                                {
                                    isLoading
                                        ? <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                        : zonename
                                }</Typography>
                            <Suspense
                                fallback={<VehicleSkeleton />}
                            ><AllVehicles
                                    vehicles={vehicle}
                                    refetch={refetch} />
                            </Suspense>
                        </Box>
                    ))
            }
        </Box>
    )
}
