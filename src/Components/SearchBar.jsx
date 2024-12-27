import React, { lazy, memo, Suspense, useCallback, useState } from 'react';
import Input from '@mui/joy/Input';
import { Box, Button, Typography } from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Grid } from '@mui/joy';
import noimage from '../assets/parking/noimage.jpg';
import { PUBLIC_NAS_FOLDER } from '../Constant/Static';
import resultno from '../assets/resultno.jpg';
import { axioslogin } from '../AxiosConfig/Axiox';
import { errorNofity, warningNofity } from '../Constant/Constant';
import { ToastContainer } from 'react-toastify';

const SingleVehicleModal = lazy(() => import("../Pages/Parking/SingleVehicleModal"))
const CircularProgressThickness = lazy(() => import("../Components/CircularProgress"))


function SearchBar() {
    const [searchinput, setSearchInput] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [filterdata, setFilteredData] = useState([]);
    const [searched, setSearched] = useState(false);
    const [opening, setOpening] = useState('');
    const [selectedFile, setSelectedFile] = useState([]);
    const [preview, setPreview] = useState([]);

    const handleVehicleSelect = useCallback((vehicle) => {
        setSelectedVehicle(vehicle);
        setOpenModal(true);
    });

    const handleCloseModal = useCallback(() => {
        setOpenModal(false);
        setSelectedVehicle(null);
    });

    const hanldesearch = useCallback(async () => {
        try {
            if (!searchinput) return warningNofity("Please enter a vehicle number");
            setSearched(true);
            const resposne = await axioslogin.post('/medvehilces/searchVehicle', {
                vehicle_number: searchinput
            });
            const { data, success } = resposne.data;
            if (success === 2) return errorNofity("Error in fetching data");
            if (success === 1) {
                const filteredData = data ? data : [];
                setFilteredData(filteredData);
            }
        } catch (error) {
            console.log(error);
            errorNofity("error in searching data")
        }
    }, [searchinput]);

    return (
        <>
            <ToastContainer />
            <Box gap={1} sx={{ width: '100%', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Input
                    sx={{ width: '78%', fontSize: 14 }}
                    placeholder='Enter VehicleNo'
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchinput}
                />
                <Button
                    variant="contained"
                    onClick={hanldesearch}
                    onKeyDown={e => e.key === "Enter" ? hanldesearch : ""}
                >
                    <SearchSharpIcon />
                </Button>
            </Box>

            <Box sx={{ width: '100%', minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container py={2} sx={{ width: '98%', height: '100%', display: 'flex' }}>
                    {
                        filterdata.length > 0 ? (
                            filterdata.map((item) => (
                                <Grid mb={1} lg={2} md={4} sm={6} xs={6} sx={{ display: 'flex', height: '100%', alignItems: "center", justifyContent: 'center' }} key={item.registration_slno}>
                                    <Box sx={{
                                        width: '98%', height: { xs: 200, sm: 240, md: 270, lg: 290 }, backgroundColor: '#6c757d', borderRadius: 2, boxShadow: 2, cursor: 'pointer', position: 'relative'
                                    }}
                                        onClick={() => handleVehicleSelect(item)}
                                    >
                                        <Box sx={{ width: '100%', height: '60%', position: 'relative', p: 0.5 }}>
                                            <img
                                                src={`${PUBLIC_NAS_FOLDER}/MedVallet/ImageofVehicle/${item.file_path}/${item?.images[0]}` || noimage}
                                                style={{ borderRadius: 3, height: '100%', width: '100%', objectFit: 'cover' }}
                                                alt=""
                                            />
                                        </Box>
                                        <Box sx={{ width: '100%', height: '40%', position: 'relative', p: 0.5 }}>
                                            <Typography sx={{ fontSize: { xs: 12, sm: 16, md: 18, lg: 18 }, color: 'white', overflowX: 'hidden' }}><strong>Vehicle</strong>: {item.vehicle_number}</Typography>
                                            <Typography sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 17 }, color: 'white', overflowX: 'hidden' }}><strong>Mobile No</strong>: {item.mobile_number}</Typography>
                                            <Typography sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 17 }, color: 'white', overflowX: 'hidden' }}><strong>Mobile No</strong>:{item.token_number}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))
                        ) : (

                            searched && (
                                <Box sx={{ width: '100%', height: 360, display: 'flex', alignItems: 'start', justifyContent: "center" }}>
                                    <Box sx={{ width: { xs: 140, sm: 200, md: 200, lg: 220 }, height: { xs: 140, sm: 200, md: 200, lg: 220 } }}>
                                        <img src={resultno} alt="No results" style={{ width: '100%', height: '100%' }} />
                                    </Box>
                                </Box>
                            )
                        )
                    }
                </Grid>

                <Suspense fallback={<CircularProgressThickness />}>
                    <SingleVehicleModal
                        openModal={openModal}
                        selectedVehicle={selectedVehicle}
                        handleCloseModal={handleCloseModal}
                        opening={opening}
                        refetch={hanldesearch}
                        setOpening={setOpening}
                        setSelectedFile={setSelectedFile}
                        selectedFile={selectedFile}
                        setPreview={setPreview}
                        preview={preview}
                    />
                </Suspense>
            </Box>
        </>
    );
}

export default memo(SearchBar);
