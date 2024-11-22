import { Box } from '@mui/joy'
import React, { useCallback } from 'react'
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Tooltip from '@mui/material/Tooltip';
import { succesNofity, warningNofity } from '../../../Constant/Constant'
import { ToastContainer } from 'react-toastify';


export default function UsergroupName({setGroupName,setGroupStatus,groupname,groupstatus}) {

    const insertData = {
        group_name: groupname,
        group_status: groupstatus ? 1 : 0
    }

    const resetFeild = () => {
        setGroupName("")
        setGroupStatus(0)
    }
    const handleGroupsave = useCallback(() => {
        if (groupname === "") {
            warningNofity("Please Fill the Blank Fields")
        } else {
            console.log(insertData);
            succesNofity("Successfull Created !")
            resetFeild()
        }
    })
    return (
        <>
            <Box sx={{ width: '30%', height: '100%', px: 2, py: 2 }}>
                <Input
                    value={groupname}
                    onChange={(e) => setGroupName(e.target.value)}
                    sx={{ width: '100%' }}
                    placeholder='Enter the Group Name' />
                <Checkbox label="User Group Status"
                    checked={groupstatus}
                    onChange={(e) => setGroupStatus(e.target.checked)}
                    sx={{ my: 2 }} />
                <Box>
                    <Tooltip title="Save Group">
                        <Button onClick={handleGroupsave} color='primary' variant="outlined"><SaveOutlinedIcon sx={{ color: 'primary' }} /></Button>
                    </Tooltip>
                </Box>
            </Box>
            <ToastContainer />

        </>
    )
}
