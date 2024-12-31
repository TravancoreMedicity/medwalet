import { Box } from '@mui/joy'
import { Typography } from '@mui/material'
import React from 'react'

function TextComponent({label,value,color}) {
    return (

        <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: {xs:'43%',sm:'30%',md:'30%',lg:'45%'}}}>
                <Typography
                    sx={{ fontSize: { xs: color === 'white' ? 11 :12, sm: 16, md: 15, lg: 16 },color:color }}>
                    <strong>{label}</strong>
                </Typography>
            </Box>
            <Box sx={{ width:{xs:"60%", sm:'70%',md:'70%',lg:'65%'} }}>
                <Typography
                    sx={{ fontSize: { xs: 12, sm: 15, md: 16, lg: 14 },color:color }}
                > :{value}
                </Typography>
            </Box>
        </Box>
    )
}

export default TextComponent