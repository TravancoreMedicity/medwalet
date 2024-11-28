import { Checkbox, Sheet } from '@mui/joy'
import { Box } from '@mui/material'
import React from 'react'

export default function CheckBoxComponent({ label, selected, onChange, value }) {
  return (
    <Box sx={{ width: '50%', height: '100' }}>
    <Sheet variant="outlined" sx={{ p: 1, borderRadius: 'md', display: 'flex', alignItems: 'center', width: '95%' }}>
      <Checkbox
        label={label}
        checked={selected === value}
        onChange={() => onChange(value)}
        sx={{ fontSize: { xs: 15, sm: 20 }, width: '100%' }}
      />
    </Sheet>
  </Box>
  )
}

