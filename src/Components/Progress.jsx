import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

import logoSrc from '../assets/logo/newicon.png'

const CustomLinearProgress = styled(LinearProgress)(({ barColor, trackColor }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: trackColor || '#e0e0e0',
  '& .MuiLinearProgress-bar': {
    backgroundColor: barColor || '#1a90ff',
    borderRadius: 5,
  },
}));

// Circular Progress Component
const CustomCircularProgress = ({ size = 40, thickness = 4, barColor, trackColor, ...props }) => (
  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
    <CircularProgress
      variant="determinate"
      sx={{
        color: trackColor || '#e0e0e0',
      }}
      size={size}
      thickness={thickness}
      {...props}
      value={100}
    />
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={{
        color: barColor || '#1a90ff',
        position: 'absolute',
        left: 0,
        animationDuration: '550ms',
      }}
      size={size}
      thickness={thickness}
      {...props}
    />
  </Box>
);

// Unified Progress Component
const Progress = ({ type = 'circular', barColor, trackColor, value, size, thickness }) => {
  return type === 'linear' ? (
    <CustomLinearProgress barColor={barColor} trackColor={trackColor} variant="determinate" value={value} />
  ) : (
    <CustomCircularProgress size={size} thickness={thickness} barColor={barColor} trackColor={trackColor} />
  );
};


const CenteredProgress = ({ logoAlt = 'Logo', logoSize = 120, ...props }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    }}
  >
    {/* Logo */}
    {logoSrc && (
      <Box
        component="img"
        src={logoSrc}
        alt={logoAlt}
        sx={{
          width: logoSize,
          height: logoSize,
          marginBottom: 2, 
        }}
      />
    )}
    {/* Progress Bar */}
    <Progress {...props} />
  </Box>
);

export default CenteredProgress;
