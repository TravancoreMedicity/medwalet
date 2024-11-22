import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Divider from '@mui/joy/Divider';
import { ToastContainer } from 'react-toastify';
import { Box, Button } from '@mui/joy';





const NewSwiperComponent = React.lazy(() => import("../../Components/SwiperNew"))

export default function SingleVehicleModal({ openModal, selectedVehicle, handleCloseModal }) {

    const handlesubmit = React.useCallback(() => {
        console.log("submitted successfully");
        handleCloseModal()
    })


    return (
        <>
            <ToastContainer />
            <Box>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={openModal}
                    onClose={handleCloseModal}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Sheet
                        sx={{ width: { xs: '95%', sm: 400, md: 400, lg: 600 }, borderRadius: 'md', p: 2, boxShadow: 'lg', minHeight: 250 }}
                    >
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        {selectedVehicle && (
                            <>
                                <Box sx={{
                                    width: '98%', height: {
                                        xs: 500,
                                        sm: 560,
                                        md: 590,
                                        lg: 610,
                                    }, backgroundColor: 'white', borderRadius: 2, cursor: 'pointer', position: 'relative'
                                }}>
                                    <Typography variant="h6" sx={{ marginBottom: 2 }}><strong>Vehicle Details</strong></Typography>
                                    <Box sx={{ width: '100%', height: { xs: 250, sm: 300 }, position: 'relative', p: 0.5 }}>
                                        <NewSwiperComponent url={selectedVehicle.imageUrl} />
                                    </Box>
                                    <Box sx={{ width: '100%', height: '60%', position: 'relative', p: 0.5 }}>
                                        <Typography sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 } }}><strong>Vehicle Number:</strong> {selectedVehicle.vehicleNumber}</Typography>
                                        <Typography sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 } }}><strong>Type:</strong> {selectedVehicle.type}</Typography>
                                        <Typography sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 } }}><strong>Token Number:</strong> {selectedVehicle.slotNumber}</Typography>
                                        <Typography sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 } }}><strong>Parking Type:</strong> {selectedVehicle.parkingtype}</Typography>
                                        <Typography sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 } }}><strong>Parking Time:</strong> {selectedVehicle.parkingTime}</Typography>
                                        <Typography sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 } }}><strong>Mobile No:</strong> {selectedVehicle.mobilenumber}</Typography>
                                        <Typography sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 } }}><strong>Total Hour:</strong> {selectedVehicle.randomHour}</Typography>
                                        <Divider sx={{ mt: 1 }} />
                                        <Button sx={{ width: '100%', mt: 1 }} onClick={handlesubmit}>Submit</Button>
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Sheet>
                </Modal>
            </Box>
        </>
    );
}