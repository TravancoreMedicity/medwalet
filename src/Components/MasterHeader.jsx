import React from 'react';
import { Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

export default function MasterHeader({ name }) {
    const navigate = useNavigate()
    const handlegoback = () =>{
        navigate("/Home/Dashboard")
    }
    return (
        <Paper elevation={2} sx={{ width: '100%', height: 50, display: 'flex', alignItems: 'center', bgcolor: '#F0F3F5', px: 2, justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: 19, fontWeight: 500 }}>{name}</Typography>
            <Tooltip title="Close Master">
                <Button onClick={handlegoback} color='error' variant="outlined"><CloseIcon sx={{ color: 'red' }} /></Button>
            </Tooltip>
        </Paper>
    )
}
