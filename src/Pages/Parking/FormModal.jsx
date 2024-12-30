import React, { lazy, Suspense, useState } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
// import Sheet from '@mui/joy/Sheet';
import { Box, useMediaQuery } from '@mui/material';
import ControlledOpenSpeedDial from '../../Components/SpeedDial';
import CircularProgressOnTop from '../../Components/CircularProgress';




const ValletForm = lazy(() => import("./ValletForm"))


export default function FormModal({ refetch, allvehicles }) {
    const [open, setOpen] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <>
            {
                !isSmallScreen ? (
                    <Box sx={{
                        width: '100%',
                        height: 40,
                        display: 'flex',
                        justifyContent: 'end',
                        px: { xs: 2, sm: 2 },
                    }}>
                        <Button
                            variant="soft"
                            color="primary"
                            onClick={() => setOpen(true)} >
                            Add New Vehicle
                        </Button>
                    </Box>
                ) : (
                    <ControlledOpenSpeedDial
                        setOpen={setOpen} />
                )
            }
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // zIndex: 9999
                }}
            >
                {/* <Sheet
                    variant="outlined"
                    sx={{
                        width: { xs: '95%', sm: 400, md: 500, lg: 600 },
                        borderRadius: 'md',
                        p: 2,
                        boxShadow: 'lg',
                        height: 650,
                        overflowY: "scroll",
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        scrollbarWidth: 'none',
                    }}
                > */}
                 <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '95%', sm: 550, md: 550, lg: 600 },
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 2,
                        overflowY: "scroll",
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        height: {xs:650,sm:800},
                        scrollbarWidth: 'none',
                    }}
                >
                    <Box
                        sx={{
                            position: 'sticky',
                            top: -25,
                            zIndex: 999,
                            width: '100%',
                            py: { xs: 1, sm: 2 },
                            boxShadow: 'sm',
                            bgcolor: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #e9ecef',
                            mb: 2
                        }}
                    >
                        <Typography
                            component="h2"
                            id="modal-title"
                            level="h4"
                            textColor="inherit"
                            sx={{ fontWeight: 'lg' }}
                        >
                            Vehicle Information
                        </Typography>
                        <ModalClose
                            variant="plain"
                            sx={{
                                zIndex: 1000,
                            }}
                        />
                    </Box>
                    <Suspense
                        fallback={<CircularProgressOnTop />}
                    >
                        <ValletForm
                            allvehicles={allvehicles}
                            setOpen={setOpen}
                            refetch={refetch}
                        />
                    </Suspense>
                {/* </Sheet> */}
                </Box>
            </Modal>


        </>
    );
}

