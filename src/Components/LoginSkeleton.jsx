import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';


export default function LoginSkeleton() {
  return (
    <Paper
      sx={{
        borderRadius: 2,
        boxShadow: { xs: 0, sm: 3, lg: 3, xl: 3 },
        width: { lg: '450px', md: '400px', sm: "400px", xs: '90%' },
        minHeight: { lg: "320px", md: '280px', xs: '280px' },
        bgcolor: "white",
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Skeleton 
        variant="text" 
        sx={{
          width: '60%', 
          height: { xs: 24, sm: 32 },
          marginBottom: 2,
        }} 
      />
      <Skeleton 
        variant="rectangular" 
        sx={{ 
          width: '90%', 
          height: 48, 
          marginBottom: 2,
        }} 
      />
      <Skeleton 
        variant="rectangular" 
        sx={{ 
          width: '90%', 
          height: 48, 
          marginBottom: 2,
        }} 
      />
      <Skeleton 
        variant="rectangular" 
        sx={{ 
          width: '90%', 
          height: { xs: 40, sm: 55 }, 
          borderRadius: 2, 
          marginBottom: 2,
        }} 
      />
      <Skeleton 
        variant="text" 
        sx={{
          width: '80%', 
          height: 20, 
          marginBottom: 1,
        }} 
      />
      <Skeleton 
        variant="text" 
        sx={{
          width: '40%', 
          height: 20,
        }} 
      />
    </Paper>
  );
}
