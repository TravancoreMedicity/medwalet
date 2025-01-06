import PersonIcon from '@mui/icons-material/Person';
import React, { memo } from 'react'
import { Box, Button, Tooltip, Typography } from '@mui/joy'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AllDriverAutoComplete from '../../Components/AllDriverAutoComplete';


function SearchComponent({
    driverselection,
    driver,
    setDriverEmpid,
    handleEmployeeSearch,
}) {

    const handleDriverSelect = (val) => {
        setDriverEmpid(val);
    };

    return (
        <Box
            sx={{
                height: 60,
                display: 'flex',
                alignItems: 'center',
                boxShadow: 3,
                my: 1,
                borderRadius: 1,
                pl: 1,
                borderBottom: '1px solid #e9ecef',
                gap: 1,
                width: 600
            }}>
            <Box
                sx={{
                    display: 'flex',
                    width: 150
                }}>
                <PersonIcon />
                <Typography sx={{ fontWeight: 600 }}>Search :</Typography>
            </Box>
            <AllDriverAutoComplete
                driverselection={driverselection}
                driver={driver}
                setDriverEmpid={handleDriverSelect}
            />
            <Tooltip title="Get data">
                <Button
                    onClick={handleEmployeeSearch}
                    sx={{ color: '#6c757d', height: 10 }}
                    variant="outlined">
                    <SearchOutlinedIcon
                        sx={{ color: '#6c757d' }} />
                </Button>
            </Tooltip>
        </Box>
    )
}

export default memo(SearchComponent)
