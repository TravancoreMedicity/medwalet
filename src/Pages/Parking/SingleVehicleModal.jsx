import React, { lazy, useCallback, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import { Box, Button } from '@mui/joy';
import { format } from 'date-fns';
import { errorNofity, succesNofity, warningNofity } from '../../Constant/Constant';
import { axioslogin } from '../../AxiosConfig/Axiox';
import InputFileUpload from './ParkingFileupload';
import {
    calculateHeight,
    calculateTotalTime,
    HandleImageCompression
} from '../../Views/CommonComponents/useQueryFunctions';
import LabourSelectBox from '../../Components/AutoComplete';
import { useMediaQuery } from '@mui/material';
import TextComponent from './Component/TextComponent';



const NewSwiperComponent = lazy(() => import("../../Components/SwiperNew"))

export default function SingleVehicleModal({
    openModal,
    selectedVehicle,
    handleCloseModal,
    refetch,
    opening,
    setOpening,
    setSelectedFile,
    selectedFile,
    setPreview,
    preview
}) {


    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [loading, setLoading] = useState(false);
    const [driver, setDriver] = useState("");
    const [drivererror, setDriverError] = useState("");
    const [driverempid, setDriverEmpid] = useState("")



    const driverselection = useCallback((driver) => {
        if (driver) {
            setDriverError("");
        } else {
            setDriverError("Please Select the driver");
        }
        setDriver(driver)
    }, []);


    const handleclose = useCallback(() => {
        setOpening('');
        setSelectedFile([]);
        setPreview([]);
        setDriver("")
        setDriverEmpid("")
    }, [setSelectedFile, setOpening, setPreview])


    const handlesubmit = useCallback(async (slno) => {
        if (drivererror || !driverempid) return warningNofity("Please select the driver");
        try {
            setLoading(true)
            const response = await axioslogin.patch("medvehilces/updatevehicleDetail", {
                registration_slno: slno,
                driverempid: driverempid
            });
            const { success } = response.data;
            if (success === 2) return errorNofity("error in submitting data");
            setLoading(false)
            succesNofity("Updated Successfully")
            handleCloseModal()
            handleclose()
            refetch()
        } catch (err) {
            console.log(err);
            errorNofity("Error occured in Submitting Data")
        }
    }, [driverempid, handleCloseModal, handleclose, refetch, drivererror]);


    const hanldeImageUpload = useCallback(async (path) => {
        if (selectedFile.length === 0) return warningNofity("Please select the images!")
        try {
            setLoading(true)
            const compressedVehicleImage = await HandleImageCompression(selectedFile);
            const formData = new FormData();
            formData.append('filePath', path)
            if (compressedVehicleImage.length > 0) {
                compressedVehicleImage?.map((file) => {
                    const newFileName = `vehicle_${file.name}`
                    formData.append('files', new File([file], newFileName, { type: file.type }));
                    return null
                });
            }
            const response = await axioslogin.post('/medvehilces/UploadImageSeparate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { success } = response.data;
            if (success === 2) return errorNofity("Error in inserting Data!")
            setLoading(false)
            handleclose()
            succesNofity("Uploaded Successfully");
            handleCloseModal()
            refetch()
        } catch (error) {
            errorNofity("Server Error occured")
        }

    }, [selectedFile, handleCloseModal, handleclose, refetch])


    //parking time
    const parkingTimeData = useCallback((create_date) => {
        const datefm = format(new Date(create_date), 'dd-MM-yyyy HH:mm:ss')
        return datefm
    }, [])


    return (
        <>
            <Box>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={openModal}
                    onClose={handleCloseModal}
                    sx={{
                        // width: { xs: '100%', sm: 400, md: 400, lg: 600 },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}
                >
                    {/* <ModalDialog  sx={{
                        width: { xs: '95%', sm: 600, md: 600, lg: 600 },
                        borderRadius: 'md',
                        p: 2,
                        boxShadow: 'lg',
                        minHeight: 250,
                    }} > */}
                    <Box
                        sx={{
                            position: { xs: 'relative', sm: 'absolute' },
                            top: { xs: '', sm: '50%' },
                            left: { xs: '', sm: '50%' },
                            transform: { sm: 'translate(-50%, -55%)', md: 'translate(-50%, -60%)' },
                            width: { xs: '95%', sm: 600, md: 600, lg: 600 },
                            bgcolor: 'white',
                            boxShadow: 'lg',
                            p: 3,
                            borderRadius: 2,
                        }}
                    >
                        <ModalClose
                            variant="plain"
                            sx={{ m: 1 }}
                        />
                        {selectedVehicle && (
                            <>
                                <Box sx={{
                                    width: '100%',
                                    height: calculateHeight(opening, selectedFile),
                                    backgroundColor: 'white',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    position: 'relative',
                                }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ marginBottom: 2 }}>
                                        <strong>Vehicle Details</strong>
                                    </Typography>
                                    <Box
                                        sx={{
                                            width: '100%', height: { xs: 200, sm: 230, md: 290 },
                                            position: 'relative',
                                            p: 0.5
                                        }}>
                                        <NewSwiperComponent
                                            id={selectedVehicle.registration_slno}
                                            url={selectedVehicle?.images}
                                            detail={selectedVehicle}
                                        />
                                    </Box>
                                    <Box sx={{ width: '100%', height: '50%', position: 'relative', p: 0.5 }}>
                                        <TextComponent
                                            label={"Vehicle No"}
                                            value={selectedVehicle.vehicle_number}
                                            color={'black'}
                                        />
                                        <TextComponent
                                            label={"Parking Type"}
                                            value={selectedVehicle.vallet_type === 1 ?
                                                "Vallet" : "Non-Vallet"}
                                            color={'black'}
                                        />
                                         <TextComponent
                                            label={"Parking Zone"}
                                            value={selectedVehicle.zone_name}
                                            color={'black'}
                                        />
                                        <TextComponent
                                            label={"Token Number"}
                                            value={selectedVehicle.token_number}
                                            color={'black'}
                                        />
                                        <TextComponent
                                            label={"Slot Number"}
                                            value={selectedVehicle.slot_number}
                                            color={'black'}
                                        />
                                        <TextComponent
                                            label={"Mobile No"}
                                            value={selectedVehicle.mobile_number}
                                            color={'black'}
                                        />
                                        <TextComponent
                                            label={"Parking Time"}
                                            value={selectedVehicle.create_date ?
                                                parkingTimeData(selectedVehicle.create_date) : '--'}
                                            color={'black'}
                                        />
                                        <TextComponent
                                            label={"Total Hour"}
                                            value={selectedVehicle.create_date ?
                                                calculateTotalTime(selectedVehicle.create_date) : '--'}
                                            color={'black'}
                                        />
                                        <Divider sx={{ mt: 1 }} />
                                        <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                                            <Button
                                                disabled={opening === 'a' || selectedVehicle?.images.length >= 5 || loading}
                                                color={opening === 'a' ? "neutral" : "success"}
                                                sx={{
                                                    width: opening === 'a' ? '100%' : '48%',
                                                    mt: 1,
                                                    display: opening === 'b' ? "none" : 'block'
                                                }}
                                                onClick={() => setOpening('a')}>
                                                {
                                                    selectedVehicle?.images.length + selectedFile.length >= 5
                                                        ? "Limit Exeeded" : "upload"
                                                }
                                            </Button>
                                            <Button
                                                disabled={opening === 'b'}
                                                color={opening === 'b' ? "neutral" : "primary"}
                                                sx={{
                                                    width: opening === 'b' ? '100%' : '48%',
                                                    mt: 1, display: opening === 'a' ? "none" : 'block'
                                                }}
                                                onClick={() => setOpening('b')}
                                            >
                                                Checkout
                                            </Button>
                                        </Box>
                                        {
                                            opening === 'a' ? (
                                                <Box sx={{ mt: 2 }}>
                                                    <InputFileUpload
                                                        setSelectedFile={setSelectedFile}
                                                        selectedFile={selectedFile}
                                                        setPreview={setPreview}
                                                        preview={preview}
                                                        current={isSmallScreen}
                                                        limit={selectedVehicle?.images.length}
                                                    />
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: "space-between"
                                                        }}>
                                                        <Button
                                                            disabled={selectedVehicle?.images.length >= 5 || loading}
                                                            onClick={() =>
                                                                hanldeImageUpload(selectedVehicle.file_path)}
                                                            color='success'
                                                            sx={{ width: '48%', mt: 1 }}>
                                                            {loading
                                                                ? "Processing"
                                                                : (selectedVehicle?.images.length >= 5 || (selectedVehicle?.images.length + selectedFile.length) >= 5
                                                                    ? "Limit Exeeded"
                                                                    : `upload ${5 - (selectedVehicle?.images.length + selectedFile.length)} more`)
                                                            }
                                                        </Button>
                                                        <Button
                                                            onClick={handleclose}
                                                            sx={{ width: '48%', mt: 1 }}>
                                                            Close
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            ) : opening === 'b' ? (
                                                <Box sx={{ mt: 2 }}>
                                                    <LabourSelectBox
                                                        driverselection={driverselection}
                                                        driver={driver}
                                                        setDriverEmpid={(val) => setDriverEmpid(val)}
                                                    />
                                                    {drivererror &&
                                                        <Typography
                                                            variant="body2"
                                                            sx={{ fontSize: 10, color: 'red' }}>
                                                            {drivererror}
                                                        </Typography>}
                                                    <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                                                        <Button
                                                            onClick={() =>
                                                                handlesubmit(selectedVehicle.registration_slno)}
                                                            disabled={drivererror !== "" || loading}
                                                            color='success' sx={{ width: '48%', mt: 1 }}>
                                                            {loading ? "Processing" : "Checkout"}
                                                        </Button>
                                                        <Button
                                                            disabled={loading}
                                                            onClick={handleclose}
                                                            sx={{ width: '48%', mt: 1, }}>
                                                            Close
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            ) : (
                                                <>

                                                </>
                                            )
                                        }
                                    </Box>
                                </Box>
                            </>
                        )}
                        {/* </ModalDialog> */}
                    </Box>
                </Modal>
            </Box >
        </>
    );
}