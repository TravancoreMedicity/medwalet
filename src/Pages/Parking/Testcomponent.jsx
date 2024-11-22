import { Box, Typography } from '@mui/material'
import React from 'react'
import { Grid } from '@mui/joy';


const Testcomponent = () => {
  const parkingType = [
    { name: "Doctors parking", current: 20, Total: 100 },
    { name: "Dialysis Parking", current: 20, Total: 200 },
    { name: "Mosque Parking", current: 10, Total: 40 },
    { name: "Er Parking", current: 100, Total: 300 },
    { name: "Temporary Parking", current: 90, Total: 200 },
    { name: "Vallet", current: 100, Total: 300 },
    { name: "Non Vallet", current: 10, Total: 200 }
  ]

  return (
    <Box>
      <Grid container py={2} sx={{ width: '100%', minHeight: 200, display: 'flex', flexDirection: { lg: 'row', md: 'row', sm: 'row', xs: 'column' } }}>
        {
          parkingType?.map((type, index) => {
            return (
              <Grid mb={1} key={index} lg={1.7} md={4} sm={6} xs={12} sx={{ display: 'flex', height: '100%', alignItems: "center", justifyContent: 'center' }}>
                <Box sx={{
                  width: '97%',
                  height: { xs: 50, sm: 80, md: 150 },
                  backgroundColor: 'white',
                  borderRadius: 2,
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' ,
                  display: 'flex',
                  cursor: 'pointer',
                  position: 'relative',
                  bgcolor:'#CF81B9'
                }}>
                  <Box sx={{ width: '100%', height: '100%', py: 2, px: 2, display: 'flex', alignItems: 'center', justifyContent: { xs: 'space-between', sm: 'space-between', md: 'center' }, flexDirection: { sm: 'column', md: 'column' } }}>
                    <Typography sx={{ fontSize: { xs: 15, sm: 19, md: 20 },color:'white' }}>{type?.name}</Typography>
                    <Typography sx={{ fontSize: { xs: 15, sm: 18, md: 20 }, fontWeight: 500,color:'white'  }}>{type?.current}/{type?.Total}</Typography>
                  </Box>
                </Box>
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  )
}

export default Testcomponent