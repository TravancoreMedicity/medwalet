import { Grid } from '@mui/joy'
import { Box, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';


const doctor = require("../assets/parking/doctor.png")
const Dialysis = require("../assets/parking/kidney-dialysis.png")
const Mosque = require("../assets/parking/mosque.png")
const ambulance = require("../assets/parking/ambulance.png")
const deadline = require("../assets/parking/deadline.png")
const Vallet = require("../assets/parking/wallet (1).png")
const cancel = require("../assets/parking/cancel.png")



function ParkingDetail() {

    const navigate = useNavigate()
    const parkingType = [
        { name: "Doctors parking", url: doctor },
        { name: "Dialysis Parking", url: Dialysis },
        { name: "Mosque Parking", url: Mosque },
        { name: "Er Parking", url: ambulance },
        { name: "Temporary Parking", url: deadline },
        { name: "Vallet", url: Vallet },
        { name: "Non Vallet", url: cancel }
    ]



    const selectParkingType =useCallback((name) =>{
        navigate('/Home/parkingdetail', { state: {type:name }});
    },[])   

    return (
        <Grid container py={2} sx={{ width: '100%', minHeight: 200, display: 'flex', flexDirection: { lg: 'row', md: 'row', sm: 'row', xs: 'column' } }}>
            {
                parkingType?.map((type, index) => {
                    return (
                        <Grid  item mb={1} key={index} lg={3} md={4} sm={6} xs={12} sx={{ display: 'flex', height: '100%', alignItems: "center", justifyContent: 'center' }}>
                            <Box onClick={()=>selectParkingType(type.name)} sx={{ width: '97%', height: 150, backgroundColor: 'white', borderRadius: 2, boxShadow: 2, display: 'flex', cursor: 'pointer', position: 'relative' }}>
                                <Box sx={{ width: '70%', height: '100%', py: 2, px: 2 }}>
                                    <img src={type.url} width={30} style={{ objectFit: 'contain' }} alt="" />
                                    <Typography sx={{ fontSize: { xs: 17, sm: 19, md: 20 } }}>{type.name}</Typography>
                                    <Typography sx={{ fontSize: { xs: 12, sm: 14, md: 14 } }}>Taken slot count:<span style={{ color: '#780000', fontWeight: 600 }}>12</span></Typography>
                                    <Typography sx={{ fontSize: { xs: 12, sm: 14, md: 14 } }}>Total Number of Slots Available:<span style={{ color: '#1d3557', fontWeight: 600 }}>100</span></Typography>
                                </Box>
                                <Box sx={{ width: '30%', height: '100%', py: 2, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

                                    {/* <Typography sx={{ ,p:1,bgcolor:'#e9ecef',borderRadius:100 }}></Typography> */}
                                    <Avatar sx={{ fontSize: { xs: 23, sm: 29, md: 28 }, bgcolor: '#ffe5ec', color: 'black', p: 3, mt: 0.5 }}>96</Avatar>
                                </Box>
                            </Box>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default ParkingDetail