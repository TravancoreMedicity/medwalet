import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'
import { Grid } from '@mui/joy';

const ZoneDetail = ({ zone, vehilce }) => {

  const groupedByZone =
    zone?.reduce((acc, vehicle) => {
      const zone = vehicle.zone_name || "Unknown Zone";
      if (!acc[zone]) {
        acc[zone] = [];
      }
      acc[zone] = [...(acc[zone] || []), vehicle]
      return acc;
    }, {});


  return (
    <Box>
      <Grid
        container
        py={1}
        gap={0.5}
        sx={{
          width: '100%',
          minHeight: 60,
          display: 'flex',
          flexDirection:
            { lg: 'row', md: 'row', sm: 'row', xs: 'column' },
          flexWrap: 'wrap',
          px: 1,
        }}>
        {
          Object.entries(groupedByZone)
            ?.sort((a, b) => (a.zone_slno) - (b.zone_slno))
            .map(([key, value]) => {
              const count = vehilce.filter(item => item.zone_name === key).length;
              return (
                <Grid mb={1} key={key} width={{ xs: '100%', sm: 220 }}
                  sx={{
                    display: 'flex',
                    height: '100%',
                    alignItems: "center",
                    justifyContent: 'center',
                    flexGrow: 1,
                  }}>
                  <Box sx={{
                    height: { xs: 50, sm: 80, md: 120 },
                    backgroundColor: 'white',
                    borderRadius: 2,
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                    display: 'flex',
                    cursor: 'pointer',
                    position: 'relative',
                    bgcolor: '#CF81B9',
                    flex: 1
                  }}>
                    <Box sx={{ width: '100%', height: '100%', py: 2, px: 2, display: 'flex', alignItems: 'center', justifyContent: { xs: 'space-between', sm: 'space-between', md: 'center' }, flexDirection: { sm: 'column', md: 'column' } }}>
                      <Typography sx={{ fontSize: { xs: 15, sm: 19, md: 18, lg: 20 }, color: 'white' }}>{key}</Typography>
                      <Typography sx={{ fontSize: { xs: 15, sm: 18, md: 18, lg: 20 }, fontWeight: 500, color: 'white' }}>{count}/{value.length}</Typography>
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

export default memo(ZoneDetail);




