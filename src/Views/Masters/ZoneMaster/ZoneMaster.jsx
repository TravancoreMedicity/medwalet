import { Box, Paper } from '@mui/material'
import React, { useCallback, useState } from 'react'
import MasterHeader from '../../../Components/MasterHeader';
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Tooltip from '@mui/material/Tooltip';
import { errorNofity, succesNofity, warningNofity } from '../../../Constant/Constant'
import { ToastContainer } from 'react-toastify';
import { axioslogin } from '../../../AxiosConfig/Axiox';


export default function ZoneMaster() {
    const [zonename, setZoneName] = useState("")
    const [zonestatus, setZoneStatus] = useState(false);

    const insertData = {
        zone_name: zonename,
        zone_status: zonestatus ? 1 : 0
    }


    // const empsecid = useSelector((state) => {
    //     console.log('wewewe', state.LoginUserData);
    //     return state.LoginUserData.empsecid
    // })

    const resetFeild = () => {
        setZoneName("")
        setZoneStatus(0)
    }
    const hanldeZoneSave = useCallback(async () => {
        // if (zonename === "") {
        //     warningNofity("Please Fill the Blank Fields")
        // } else {
        //     const result = await axioslogin.post("/medvallet/createzonemaster", insertData)
        //         .then((response) => {
        //             return response
        //         })
        //         .catch((error) => {
        //             return error
        //         })

        //     const data = result.data;
        //     if (data.success === 2) {
        //         errorNofity("Error in creating User!")
        //     } else {
        //         succesNofity("Successfull Created !")
        //         resetFeild()
        //     }

        // }
    })
    return (

        <>
            <ToastContainer />
            <Box sx={{ width: '100%', height: '93vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paper elevation={3} sx={{ width: '98%', height: '95%' }}>
                    <MasterHeader name={"Zone Master"} />
                    <Box sx={{ width: '100%', height: '90%', display: 'flex' }}>
                        <Box sx={{ width: '30%', height: '100%', px: 2, py: 2 }}>
                            <Input
                                value={zonename}
                                onChange={(e) => setZoneName(e.target.value)}
                                sx={{ width: '100%' }}
                                placeholder='Enter Zone Name' />
                            <Checkbox label=" Status"
                                checked={zonestatus}
                                onChange={(e) => setZoneStatus(e.target.checked)}
                                sx={{ my: 2 }} />
                            <Box>
                                <Tooltip title="Save Group">
                                    <Button onClick={hanldeZoneSave} color='primary' variant="outlined"><SaveOutlinedIcon sx={{ color: 'primary' }} /></Button>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}
