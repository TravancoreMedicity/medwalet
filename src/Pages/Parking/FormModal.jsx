import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';



const ValletForm = React.lazy(() => import("./ValletForm"))


export default function FormModal() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Box sx={{ width: '100%', height: 40, display: 'flex', justifyContent: 'end', px: { xs: 1, sm: 2 } }}>
                <Button variant="soft" color="primary" onClick={() => setOpen(true)} >
                    Add New Vehicle
                </Button>
            </Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}
            >
                <Sheet
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
                >
                    <Box
                        sx={{
                            position: 'sticky',
                            top: -16,
                            zIndex: 999,
                            width: '100%',
                            py: {xs:1,sm:2},
                            boxShadow: 'sm',
                            bgcolor: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
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
                    <Divider sx={{ mb: 2 }} />
                    <ValletForm setOpen={setOpen} />
                </Sheet>
            </Modal>


        </>
    );
}