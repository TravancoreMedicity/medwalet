import React from 'react'
import { Box, Button, Tooltip, Typography } from '@mui/joy'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Radio from '@mui/joy/Radio';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function FilterFunction({
    selectedValue,
    handleChange,
    handleStartDateChange,
    getVehicleFromStartAndEnd,
    start,
    end,
    handleEndDateChange,
}) {

    return (
        <Box sx={{
            height: 60,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            boxShadow: 3,
            my: 1,
            borderRadius: 1,
            pl: 1,
            borderBottom: '1px solid #e9ecef',
            gap: 2
        }}>
            <Box sx={{ display: 'flex' }}>
                <FilterAltIcon />
                <Typography sx={{ fontWeight: 600 }}>Filter :</Typography>
            </Box>
            <Radio
                checked={selectedValue === 'a'}
                onChange={handleChange}
                value="a"
                name="radio-buttons"
                label="All"
                slotProps={{ input: { 'aria-label': 'A' } }}
                color="success" />
            <Radio
                checked={selectedValue === 'b'}
                onChange={handleChange}
                value="b"
                label="Today"
                name="radio-buttons"
                slotProps={{ input: { 'aria-label': 'A' } }}
                color="success" />
            <Radio
                checked={selectedValue === 'c'}
                onChange={handleChange}
                value="c"
                label="Select Date"
                name="radio-buttons"
                slotProps={{ input: { 'aria-label': 'A' } }}
                color="success" />
            {
                selectedValue && selectedValue === 'c' &&
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Start Date"
                        value={dayjs(start)}
                        onChange={(newvalue) => handleStartDateChange(newvalue)}
                        inputFormat="dd-MM-yyyy"
                        maxDate={dayjs(end)}
                        sx={{
                            height: 40,
                            width: 170,
                            '& .MuiInputBase-root': {
                                height: '100%',
                            },
                        }}
                    />
                    <DatePicker
                        label="End Date"
                        value={dayjs(end)}
                        inputFormat="dd-MM-yyyy"
                        onChange={(newvalue) => handleEndDateChange(newvalue)}
                        minDate={dayjs(start)}
                        maxDate={dayjs()}
                        sx={{
                            height: 40,
                            width: 170,
                            '& .MuiInputBase-root': {
                                height: '100%',
                            },
                        }}
                    />
                </LocalizationProvider>
            }
            {
                selectedValue && selectedValue === 'c' &&
                <Tooltip title="Get data">
                    <Button
                        onClick={getVehicleFromStartAndEnd}
                        sx={{
                            color: '#6c757d'
                        }}
                        variant="outlined">
                        <SearchOutlinedIcon
                            sx={{ color: '#6c757d' }} />
                    </Button>
                </Tooltip>
            }
        </Box>
    )
}

export default FilterFunction