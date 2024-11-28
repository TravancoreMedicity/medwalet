import React, { useCallback, useMemo, useState } from 'react';
import { Box, IconButton, Paper } from '@mui/material'
import MasterHeader from '../../../Components/MasterHeader';
import MasterTable from '../../CommonComponents/MasterTable';
import { employeeID, errorNofity, succesNofity, warningNofity } from '../../../Constant/Constant';
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer } from 'react-toastify';
import { axioslogin } from '../../../AxiosConfig/Axiox';
import { useQuery } from '@tanstack/react-query';
import { getAllUserMaster, getAllZoneMaster } from '../../CommonComponents/useQueryFunctions';
import EditIcon from '@mui/icons-material/Edit';


export default function UserMaster() {
    const [username, setUserName] = useState("")
    const [userstatus, setUserStatus] = useState(false)
    const [updateflag, setUpdateFlag] = useState(0);
    const [updatedata, setUpdateData] = useState({})



    
    const resetField = () => {
        setUserName("")
        setUserStatus(false)
    }
    const getemployeeid = useMemo(() => {
        return employeeID();
    }, []);

    const insertData = {
        user_name: username,
        user_status: userstatus ? 1 : 0,
        create_user: getemployeeid
    }

    const updateData = {
        user_name: username,
        user_status: userstatus ? 1 : 0,
        edit_user: getemployeeid,
        user_slno: updatedata.slNo
    }


    const { success, data: alluserMaster, refetch } = useQuery({
        queryKey: ['alluserMaster'],
        queryFn: () => getAllUserMaster(),
    })

    const formatteduser = alluserMaster ?
        alluserMaster.map((user) => ({
            slNo: user.user_slno,
            UserName: user.user_name,
            Status: user.user_status === 1 ? 'Active' : 'Inactive',
        })) : []



    const handleGroupsave = useCallback(async () => {
        if (username === "") {
            return warningNofity("Please Fill the Blank Fields")
        }
        if (updateflag === 0) {
            try {
                const result = await axioslogin.post("/medvallet/createusermaster", insertData)
                    .then((response) => {
                        return response
                    })
                    .catch((error) => {
                        return error
                    });

                const data = result.data;
                if (data.success === 2) {
                    errorNofity("Error in creating User!")
                } else {
                    succesNofity("Successfull Created !")
                    resetField()
                    refetch()
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const result = await axioslogin.patch("/medvallet/updatausermaster", updateData)
                    .then((response) => {
                        return response
                    })
                    .catch((error) => {
                        return error
                    });

                const data = result.data;
                if (data.success === 2) {
                    errorNofity("Error updating User!")
                } else {
                    succesNofity("Updated successfully !")
                    setUpdateFlag(0)
                    resetField()
                    refetch()
                }
            } catch (err) {
                console.log(err);
            }
        }
    })

    const [colDefs] = useState([
        { field: 'slNo', flex: 1 },
        { field: 'UserName', flex: 1 },
        { field: 'Status', flex: 1 },
        {
            headerName: 'Edit',
            field: 'edit',
            flex: 1,
            cellRenderer: params => (
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)}>
                    <EditIcon color='primary' />
                </IconButton>
            ),
        }
    ]);

    const getEdit = useCallback((params) => {
        const rowData = params.data;
        setUserName(rowData.UserName);
        setUserStatus(rowData.Status === 'Active' ? true : false);
        setUpdateFlag(1)
        setUpdateData(rowData)
    }, [])


    return (

        <Box sx={{ width: '100%', height: '93vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ToastContainer />
            <Paper elevation={3} sx={{ width: '98%', height: '95%' }}>
                <MasterHeader name={"Zone Master"} />
                <Box sx={{ width: '100%', height: '90%', display: 'flex' }}>
                    <Box sx={{ width: '30%', height: '100%', px: 2, py: 2 }}>
                        <Input
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            sx={{ width: '100%' }}
                            placeholder='Enter the Group Name' />
                        <Checkbox label="User Group Status"
                            checked={userstatus}
                            onChange={(e) => setUserStatus(e.target.checked)}
                            sx={{ my: 2 }} />
                        <Box>
                            <Tooltip title="Save Group">
                                <Button onClick={handleGroupsave} color='primary' variant="outlined"><SaveOutlinedIcon sx={{ color: 'primary' }} /></Button>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Box sx={{ width: '70%', height: 'auto', px: 2, py: 2 }}>
                        <MasterTable
                            rowData={formatteduser}
                            setZoneStatus={setUserStatus}
                            setZoneName={setUserName}
                            setUpdateFlag={setUpdateFlag}
                            setUpdateData={setUpdateData}
                            refetch={refetch}
                            columnDefs={colDefs}
                        />
                    </Box>
                </Box>
            </Paper>
        </Box>

    )
}
