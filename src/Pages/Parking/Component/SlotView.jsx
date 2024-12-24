import { Box, Typography } from '@mui/joy'
import { keyframes, Paper } from '@mui/material'
import React, { useCallback, useState } from 'react'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { warningNofity } from '../../../Constant/Constant';


function SlotView({ setSlotNumber, count, allvehicles, zonename }) {


    const [ifselected, setIfseleceted] = useState(0);
    const slots = new Array(count).fill(null);
    const handlevehicle = useCallback((slotnumber) => {
        const ismatch = allvehicles?.find(
            (vehicle) => vehicle.token_number === slotnumber && vehicle.zone_name === zonename
        );
        if (ismatch) return warningNofity(`${slotnumber} is Already Occupied`);
        setSlotNumber(slotnumber)
        setIfseleceted(slotnumber)
    }, [allvehicles, zonename])
    //animation key frame
    const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 2; }
`;

    return (
        <Paper elevation={2} sx={{ width: '100%', minHeight: 100, bgcolor: 'white', px: 0.1, py: 1, mt: 1, borderRadius: 1, display: "flex", alignItems: 'start', flexWrap: 'wrap' }}>
            {
                slots?.map((_, index) => {
                    const matchedslots = allvehicles?.find((vehicle) => vehicle.token_number === index + 1 && vehicle.zone_name === zonename);
                    return (
                        <Box key={index} sx={{
                            width: 45,
                            height: 50,
                            m: 0.1,
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            borderRadius: 2,
                            border: !matchedslots ? '1px solid green' : '1px solid grey',
                            bgcolor: matchedslots ? "#adb5bd" : (ifselected === index + 1 ? 'orange' : ""),
                            cursor:'pointer'
                        }} onClick={() => handlevehicle(index + 1)}>
                            <Typography sx={{
                                fontSize: 11,
                                color: matchedslots ? 'white' : 'green'
                            }}>{index + 1}</Typography>
                            <DirectionsCarIcon sx={{
                                animation: !matchedslots && ifselected !== index + 1 ? `${blinkAnimation} 1s infinite` : 'none',
                                mt: 0,
                                color: matchedslots ? 'grey' : 'green'
                            }} />
                        </Box>
                    )
                })
            }
        </Paper>
    )
}

export default SlotView