import { Box, Typography } from '@mui/material'
import React from 'react';
import server from '../assets/machine-repair.png'

function ServerDown() {
  return (
    <Box sx={{ height: window.innerHeight - 100, display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' ,flexDirection:'column'}}>
        <img src={server} width={70} height={70}/>
        <Typography sx={{fontSize:10,color:'grey',mb:0}}>The server Undergoing Maintenance</Typography>
        <Typography sx={{fontSize:10,color:'grey',mt:0}}>Please Wait few Minutes</Typography>
      </Box>
  )
}

export default ServerDown