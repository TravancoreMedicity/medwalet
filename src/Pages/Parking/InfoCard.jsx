import React from 'react'
import { Box, Typography } from '@mui/material'
import parkedcar from '../../assets/parking/parking-car.png'
import Divider from '@mui/joy/Divider';

export default function InfoCard({ count, label }) {
    return (
        <Box
            sx={{
                width: '100%',
                height: 150,
                boxShadow: 4,
                borderRadius: 1,
                px: 2,
                bgcolor: 'green'
            }}>
            <Box
                sx={{
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                <img
                    src={parkedcar}
                    width={30}
                    style={{
                        objectFit: 'contain'
                    }}
                    alt="" />
                <Typography
                    sx={{
                        color: 'black',
                        fontSize: { xs: 16, sm: 20, md: 22 },
                        fontWeight: '500'
                    }}>
                    {count}
                </Typography>
            </Box>
            <Divider />
            <Box
                sx={{
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <Typography
                    sx={{
                        color: 'black',
                        fontSize: { xs: 12, sm: 14, md: 16 }
                    }}>
                    {label}
                </Typography>
            </Box>
        </Box>
    )
}
