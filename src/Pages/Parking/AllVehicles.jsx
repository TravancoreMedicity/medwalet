import React, { useCallback, useState } from 'react';
import { Grid } from '@mui/joy'
import { Box, Typography } from '@mui/material'
import SingleVehicleModal from './SingleVehicleModal';


const car = require("../../assets/blog2.jpg")
const car2 = require("../../assets/car2.jpg")
const car3 = require("../../assets/car3.jpg")
const car4 = require("../../assets/car4.jpg")
const car5 = require("../../assets/car5.jpg")
const car6 = require("../../assets/car6.jpg")

export default function AllVehicles({ memoizedState }) {

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleVehicleSelect = useCallback((vehicle) => {
    setSelectedVehicle(vehicle)
    setOpenModal(true)
  })


  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setSelectedVehicle(null);
  })

  const vehicleData = [
    {
      vehicleNumber: "KL01AB1234",
      type: "Non-vallet",
      slotNumber: "01",
      parkingTime: "10/28/2023, 1:00:00 PM",
      mobilenumber: "9656168957",
      randomHour: '5h',
      parkingtype: "Zone Two",
      imageUrl: [car, car2, car3, car4, car5, car6],
    },
    {
      vehicleNumber: "KL02CD5678",
      type: "vallet",
      slotNumber: "02",
      parkingTime: "10/28/2023, 6:00:00 PM",
      mobilenumber: "9656993064",
      randomHour: '11h 10m',
      parkingtype: "Temporary Parking",
      imageUrl: [car2, car, car3, car4, car5, car6],
    },
    {
      vehicleNumber: "KL03EF9876",
      type: "Non-vallet",
      slotNumber: "03",
      parkingTime: "10/28/2023, 3:00:00 PM",
      mobilenumber: "9656168957",
      randomHour: '7h 20m',
      parkingtype: "Doctors Parking",
      imageUrl: [car3, car2, car, car4, car5, car6],
    },
    {
      vehicleNumber: "KL04GH5432",
      type: "vallet",
      slotNumber: "04",
      parkingTime: "10/28/2023, 9:30:00 AM",
      mobilenumber: "9656168957",
      randomHour: '10h 20m',
      parkingtype: "Zone Two",
      imageUrl: [car4, car2, car3, car, car5, car6],
    },
    {
      vehicleNumber: "KL05IJ7654",
      type: "Non-vallet",
      slotNumber: "05",
      parkingTime: "10/28/2023, 5:00:00 PM",
      mobilenumber: "7510160280",
      randomHour: "2h 31 m",
      parkingtype: "Emergency Parking",
      imageUrl: [car5, car2, car3, car4, car, car6],
    },
    {
      vehicleNumber: "KL06KL4321",
      type: "vallet",
      slotNumber: "06",
      parkingTime: "10/28/2023, 7:45:00 AM",
      mobilenumber: "965693064",
      parkingtype: "Zone1",
      randomHour: '3h 30m',
      imageUrl: [car6, car2, car3, car4, car5, car],
    },
  ];
  return (
    <Box sx={{ width: '100%', minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container py={2} sx={{ width: '98%', height: '100%', display: 'flex' }}>
        {
          vehicleData?.map((item) => {
            return (
              <Grid  mb={1} lg={2} md={4} sm={6} xs={6} sx={{ display: 'flex', height: '100%', alignItems: "center", justifyContent: 'center' }} key={item.vehicleNumber}>
                <Box sx={{
                  width: '98%', height: { xs: 200, sm: 240, md: 270, lg: 290 }, backgroundColor: '#6c757d', borderRadius: 2, boxShadow: 2, cursor: 'pointer', position: 'relative'
                }}
                  onClick={() => handleVehicleSelect(item)}
                >
                  <Box sx={{ width: '100%', height: '60%', position: 'relative', p: 0.5 }}>
                    <img src={item.imageUrl[0]} style={{ borderRadius: 3, height: '100%', width: '100%', objectFit: 'cover' }} alt="" />
                  </Box>
                  <Box sx={{ width: '100%', height: '40%', position: 'relative', p: 0.5 }}>
                    <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18, lg: 18 },color:'white' }}><strong>Vehicle</strong>:{item.vehicleNumber}</Typography>
                    <Typography sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 17 },color:'white' }}><strong>Mobile No</strong>:{item.mobilenumber}</Typography>
                    <Typography sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 17 },color:'white' }}><strong>Slot No</strong>:{item.slotNumber}</Typography>
                  </Box>
                </Box>
              </Grid>
            )
          })
        }
      </Grid>


      <SingleVehicleModal
        openModal={openModal}
        selectedVehicle={selectedVehicle}
        memoizedState={memoizedState}
        handleCloseModal={handleCloseModal}
      />
    </Box>
  )
}
