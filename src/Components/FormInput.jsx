import { Input } from '@mui/joy';
import { Box, Typography } from '@mui/material';
import React from 'react'

export default function FormInput({ name, placeholder, value, onChange, helperText, error, type }) {
  return (
    <Box sx={{ width: '100%', minHeight: 40, mb: 1 }}>
        <Typography sx={{ fontSize: 14 }}>{name} :</Typography>
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Input
            type={type}
            placeholder={placeholder}
            value={value ?? ''}
            onChange={onChange}
            disabled={name === "Token Number"}
            slotProps={{
              input: {
                onInput: (e) => {
                  if (type === 'Number' && e.target.value.length > 10) {
                    e.target.value = e.target.value.slice(0, 10);
                  }
                  if (type === 'text' && /[^a-zA-Z0-9\s]/.test(e.target.value)) {
                    e.target.value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
                  }                  
                },
              },
            }}
            sx={{ fontSize: { xs: 12, sm: 16, md: 15, lg: 16 } }}
          />
          {error && <Typography color="error" variant="body2" sx={{ fontSize: 12 }}>{helperText}</Typography>}
        </Box>
      </Box>
  )
}



