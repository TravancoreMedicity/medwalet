import React, { memo } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, patch, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function ReportHeader({ name, path }) {
    const navigate = useNavigate()
    const handlegoback = () => {
        navigate(path)
    }
    return (
        <Box sx={{ height: 40, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 3, bgcolor: '#457b9d', my: 1, borderRadius: 1, pl: 1 }}>
            <Typography sx={{ color: 'white', letterSpacing: 1 }}>{name}</Typography>
            <Tooltip title="Close Master">
                <Button onClick={handlegoback} color='primary' variant="outlined"><CloseIcon sx={{ color: 'white' }} /></Button>
            </Tooltip>
        </Box>
    )
}

export default memo(ReportHeader)