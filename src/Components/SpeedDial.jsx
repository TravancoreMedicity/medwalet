import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from 'react-router-dom';

const actions = [
    { icon: <DirectionsCarIcon />, name: 'Addnew' },
    { icon: <EditNoteIcon />, name: 'Attendace' },
];

export default function ControlledOpenSpeedDial({setOpen}) {
    const navigate = useNavigate()
    const [open, setAddOpen] = React.useState(false);
    const handleOpen = () => setAddOpen(true);
    const handleClose = (name) => {
        if(name === 'Addnew' ){
            setOpen(true)
        }
        if(name === 'Attendace' ){
            navigate('/Driver/mobile')
        }
       
        setAddOpen(false)
    };

    return (
        <Box sx={{
            position: 'fixed',
            bottom: 65,
            right: 5,
            height: 320,
            transform: 'translateZ(0px)',
            flexGrow: 1,
            //  bgcolor:'red',
            zIndex: 999
        }}>
            <SpeedDial
                ariaLabel="SpeedDial controlled open example"
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 5,
                    width: { xs: 50, sm: 60 },
                    '& .MuiSpeedDial-fab': {
                        width: 50, 
                        height: 50,
                    },
                    '& .MuiSpeedDialIcon-icon': {
                        fontSize: '1.2rem',
                    },
                   
                }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={()=>handleClose(action.name)}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
