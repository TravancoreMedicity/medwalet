import React, { lazy, Suspense, useCallback, useState } from 'react';
import { Grid } from '@mui/joy'
import { Box } from '@mui/material'
import { PUBLIC_NAS_FOLDER } from '../../Constant/Static'
import CircularProgressThickness from '../../Components/CircularProgress';
import TextComponent from './Component/TextComponent';




const SingleVehicleModal = lazy(() => import('./SingleVehicleModal'));
const noimage = require("../../assets/parking/defaultnoimag.jpeg")

export default function AllVehicles({ vehicles, refetch }) {

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [opening, setOpening] = useState('');
  const [selectedFile, setSelectedFile] = useState([]);
  const [preview, setPreview] = useState([]);


  //the below function is used to store the data for single vehicle displaying
  const handleVehicleSelect = useCallback((vehicle) => {
    setSelectedVehicle(vehicle)
    setOpenModal(true)
  })
  //helps for the modal closing...!
  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setOpening(false)
    setSelectedVehicle(null);
    setSelectedFile([])
    setPreview([])
  })

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* <ToastContainer/> */}
      <Grid
        container
        py={2}
        sx={{
          width: '98%',
          height: '100%',
          display: 'flex'
        }}>
        {
          vehicles?.map((item) => {
            const imageforshowing =
              item?.images.length > 0
                ? `${PUBLIC_NAS_FOLDER}/MedVallet/ImageofVehicle/${item.file_path}/${item?.images[0]}`
                : noimage;

            return (
              <Grid
                mb={1}
                lg={2}
                md={4}
                sm={6}
                xs={6}
                sx={{
                  display: 'flex',
                  height: '100%',
                  alignItems: "center",
                  justifyContent: 'center'
                }}
                key={item.registration_slno}
              >
                <Box
                  sx={{
                    width: '98%',
                    height: { xs: 200, sm: 240, md: 270, lg: 290 },
                    backgroundColor: '#6c757d',
                    borderRadius: 2,
                    boxShadow: 2,
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onClick={() => handleVehicleSelect(item)}
                >
                  <Box sx={{
                    width: '100%',
                    height: '60%',
                    position: 'relative',
                    p: 0.5
                  }}>
                    <img
                      src={imageforshowing}
                      loading='lazy'
                      style={{
                        borderRadius: 3,
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover'
                      }}
                      alt="" />
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: '40%',
                      position: 'relative',
                      p: 0.3,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-evenly'
                    }}>
                    <TextComponent
                      label={"VehicleNo"}
                      value={item.vehicle_number}
                      color={'white'}
                    />
                    <TextComponent
                      label={"MobileNo"}
                      value={item.mobile_number}
                      color={'white'}
                    />
                    <TextComponent
                      label={"TokenNo"}
                      value={item.token_number}
                      color={'white'}
                    />
                  </Box>
                </Box>
              </Grid>
            )
          })
        }
      </Grid>


      <Suspense fallback={<CircularProgressThickness />}>
        <SingleVehicleModal
          openModal={openModal}
          selectedVehicle={selectedVehicle}
          handleCloseModal={handleCloseModal}
          refetch={refetch}
          opening={opening}
          setOpening={setOpening}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
          setPreview={setPreview}
          preview={preview}
        />
      </Suspense>
    </Box>
  )
}
