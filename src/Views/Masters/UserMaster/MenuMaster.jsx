import { Box, Input } from '@mui/joy'
import { Paper } from '@mui/material'
import React from 'react'
import MasterHeader from '../../../Components/MasterHeader'
import Autocomplete from '@mui/joy/Autocomplete';






const AutoComplete = ({ name, options, onChange, value }) => {
    return (
        <Autocomplete
            placeholder={name}
        options={options || []}
        // getOptionLabel={(option) => option.dept_name || option.sec_name || option.em_name}
        // sx={{ width: '100%', my: 2 }}
        // onChange={onChange}
        // value={value || null}
        />
    )
}


export default function MenuMaster() {
    return (
        <Box sx={{ width: '100%', height: '93vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ width: '98%', height: '95%' }}>
                <MasterHeader name={"Menu Master"} />
                <Box sx={{ width: '100%', height: '90%', display: 'flex' }}>
                    <Box sx={{ width: '30%', height: '100%', px: 2, py: 2 }}>
                        <AutoComplete
                            name={"Select Moudle"}
                        />
                        <Input/>
                    </Box>
                </Box>

            </Paper>
        </Box>
    )
}
