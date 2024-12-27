import * as React from 'react';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddButton({setOpen}) {
    const handleBackClick = () => {
        setOpen(true)
    };
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 75,
                right: 10,
                width: { xs: 50, sm: 60 },
                height: { xs: 50, sm: 60 },
                borderRadius: '50%',
                bgcolor: 'white',
                p: 0.2,
                zIndex: 999,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                },
            }}
        >
            <Box
                onClick={handleBackClick}
                sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    bgcolor: '#53B6E7',
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <AddIcon sx={{ color: 'white' }} />
            </Box>
        </Box>
    );
}
