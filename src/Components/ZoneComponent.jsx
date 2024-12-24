import React, { lazy, Suspense } from 'react'
import { Box, Checkbox, Typography } from '@mui/joy'



const SlotView = lazy(() => import("../Pages/Parking/Component/SlotView"));

export default function ZoneComponent({ zone, selected, onChange, setSlotNumber, allvehicles, slotselect }) {

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
          zone?.map((item, index) => {
            return (
              <Box key={index} sx={{ width: '100%' }}>
                <Checkbox
                  sx={{ boxShadow: 3, bgcolor: '#e5e5e5', py: 1, borderRadius: 3, width: '100%', px: 1 }}
                  key={index}
                  label={item.zone_name}
                  checked={selected === item.zone_slno}
                  onChange={(e) => onChange(item.zone_slno)}
                />
                {slotselect === item.zone_slno &&
                  <Suspense fallback="loading...!">
                    <SlotView
                      zonename={item.zone_name}
                      allvehicles={allvehicles}
                      count={item.slot_count}
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


