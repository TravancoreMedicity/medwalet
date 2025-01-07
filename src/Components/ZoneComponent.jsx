import React, { lazy, Suspense } from 'react'
import { Box, Checkbox, Typography } from '@mui/joy'

const SlotView = lazy(() => import("../Pages/Parking/Component/SlotView"));

export default function ZoneComponent({
  zone,
  selected,
  onChange,
  setSlotNumber,
  allvehicles,
  slotselect
}) {


  
  const groupedByZone = zone
  .reduce((acc, vehicle) => {
      const zone = vehicle.zone_name || "Unknown Zone";
      if (!acc[zone]) {
          acc[zone] = [];
      }
      acc[zone].push(vehicle);
      return acc;
  }, {});


  return (
    <Box sx={{
      width: '100%', maxHeight: 220, mb: 1, py: 1, px: 1, mt: 2,
      borderRadius: 1, bgcolor: 'white', overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      scrollbarWidth: 'none',
    }}>
      <Typography sx={{ fontSize: 18 }}>Zone </Typography>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {
          Object.entries(groupedByZone)?.map(([key, value]) => {
            const zoneSlno = value[0]?.zone_slno;
            return (
              <Box 
              key={key}
               sx={{ width: '100%' }}>
                <Checkbox
                  sx={{ boxShadow: 3, bgcolor: '#e5e5e5', py: 1, borderRadius: 3, width: '100%', px: 1 }}
                  key={key}
                  label={key}
                  checked={selected === zoneSlno}
                  onChange={(e) => onChange(zoneSlno)}
                />
                {slotselect === zoneSlno &&
                  <Suspense fallback="loading...!">
                    <SlotView
                      zonename={key}
                      allvehicles={allvehicles}
                      count={value}
                      setSlotNumber={setSlotNumber}
                      selected={selected}
                    />
                  </Suspense>
                }
              </Box>
            )
          })
        }
      </Box>
    </Box>
  )
}


