import React from 'react';
import Input from '@mui/joy/Input';
import { Box ,Button } from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

function SearchBar({showSearchTab}) {
    return (
        <Box gap={1} sx={{width:'100%',height:60,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Input sx={{ width: '78%', fontSize: 14 }} placeholder='Enter VehicleNo/Cust MobNo' />
            <Button  variant="contained"  >
                <SearchSharpIcon />
            </Button>
        </Box>
    )
}

export default SearchBar