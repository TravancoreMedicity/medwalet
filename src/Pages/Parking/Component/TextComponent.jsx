import { Box } from '@mui/joy'
import { Typography } from '@mui/material'
import React from 'react'

function TextComponent({label,value,color}) {
    return (

        <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: {xs:'43%',sm:'40%'} }}>
                <Typography
                    sx={{ fontSize: { xs: color === 'white' ? 11 :12, sm: 14, md: 16, lg: 18 },color:color }}>
                    <strong>{label}</strong>
                </Typography>
            </Box>
            <Box sx={{ width: '50%' }}>
                <Typography
                    sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },color:color }}
                > :{value}
                </Typography>
            </Box>
        </Box>
    )
}

export default TextComponent