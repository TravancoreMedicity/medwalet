import { Box, Paper } from '@mui/material'
import React, { useCallback, useState } from 'react'
import MasterHeader from '../../../Components/MasterHeader';
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Tooltip from '@mui/material/Tooltip';
import { succesNofity, warningNofity } from '../../../Constant/Constant'
import { ToastContainer } from 'react-toastify';
import UserTable from './UserTable';

export default function ModuleMaster() {
    const [modulename, setModuleName] = useState("")
    const [modulestatus, setModuleStatus] = useState(false);


    const insertData = {
        module_name: modulename,
        module_status: modulestatus ? 1 : 0
    }

    const resetFeild = () => {
        setModuleName("")
        setModuleStatus(0)
    }
    const handleGroupsave = useCallback(() => {
        if (modulename === "") {
            warningNofity("Please Fill the Blank Fields")
        } else {
            console.log(insertData);
            succesNofity("Successfull Created !")
            resetFeild()
        }
    })
    return (

        <>
            <ToastContainer />
            <Box sx={{ width: '100%', height: '93vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paper elevation={3} sx={{ width: '98%', height: '95%' }}>
                    <MasterHeader name={"Module Master"} />
                    <Box sx={{ width: '100%', height: '90%', display: 'flex' }}>
                        <Box sx={{ width: '30%', height: '100%', px: 2, py: 2 }}>
                            <Input
                                value={modulename}
                                onChange={(e) => setModuleName(e.target.value)}
                                sx={{ width: '100%' }}
                                placeholder='Enter the Group Name' />
                            <Checkbox label=" Status"
                                checked={modulestatus}
                                onChange={(e) => setModuleStatus(e.target.checked)}
                                sx={{ my: 2 }} />
                            <Box>
                                <Tooltip title="Save Group">
                                    <Button onClick={handleGroupsave} color='primary' variant="outlined"><SaveOutlinedIcon sx={{ color: 'primary' }} /></Button>
                                </Tooltip>
                            </Box>
                        </Box>
                        <UserTable setGroupName={setModuleName} setGroupStatus={setModuleStatus} />
                    </Box>
                </Paper>
            </Box>
        </>
    )
}
