import { Box, IconButton, Paper } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'
import MasterHeader from '../../../Components/MasterHeader';
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Tooltip from '@mui/material/Tooltip';
import { employeeID, errorNofity, succesNofity, warningNofity } from '../../../Constant/Constant'
import { ToastContainer } from 'react-toastify';
import { axioslogin } from '../../../AxiosConfig/Axiox';
import { useQuery } from '@tanstack/react-query'
import MasterTable from '../../CommonComponents/MasterTable';
import { getAllZoneMaster } from '../../CommonComponents/useQueryFunctions';
import EditIcon from '@mui/icons-material/Edit';



export default function ZoneMaster() {
    const [zonename, setZoneName] = useState("");
    const [zonestatus, setZoneStatus] = useState(false);
    const [updateflag, setUpdateFlag] = useState(0);
    const [updatedata, setUpdateData] = useState({})



    const {  data: allzonemaster, refetch } = useQuery({
        queryKey: ['allzonemaster'],
        queryFn: () => getAllZoneMaster(),
    })


    
    const formattedData = allzonemaster ?
        allzonemaster.map((zone) => ({
            slNo: zone.zone_slno,
            ZoneName: zone.zone_name,
            Status: zone.zone_status === 1 ? 'Active' : 'Inactive',
        }))
        : [];



    

    const getemployeeid = useMemo(() => {
        return employeeID();
    }, []);

    const insertData = {
        zone_name: zonename,
        zone_status: zonestatus ? 1 : 0,
        create_user: getemployeeid
    }


    const updateData = {
        zone_name: zonename,
        zone_status: zonestatus ? 1 : 0,
        edit_user: getemployeeid,
        zone_slno: updatedata.slNo
    }

    const resetFeild = useCallback(() => {
        setZoneName("")
        setZoneStatus(false)
    },[])
    const [colDefs] = useState([
        { field: 'slNo' , flex:1,},
        { field: 'ZoneName' , flex:1,},
        { field: 'Status' , flex:1,},
        {
            headerName: 'Edit',
            field: 'edit',
            flex:1,
            cellRenderer: params => (
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)}>
                    <EditIcon color='primary' />
                </IconButton>
            ),
        },
    ]);


    const getEdit = useCallback((params) => {
        const rowData = params.data;
        setZoneName(rowData.ZoneName);
        setZoneStatus(rowData.Status === 'Active' ? true : false);
        setUpdateFlag(1)
        setUpdateData(rowData)
    }, []);

    const hanldeZoneSave = useCallback(async () => {
        if (zonename === "") {
            return warningNofity("Please Fill the Blank Fields")
        }
        if (updateflag === 0) {
            try {
                const result = await axioslogin.post("/medvallet/createzonemaster", insertData)
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
                    resetFeild()
                    refetch()
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const result = await axioslogin.patch("/medvallet/updatezonemaster", updateData)
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
                    resetFeild()
                    refetch()
                }
            } catch (err) {
                console.log(err);
            }
        }
    },[zonename,updateData,insertData,updateflag])




    return (

        <>
            <Box sx={{ width: '100%', height: '93vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ToastContainer />
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
                                    <Button
                                        onClick={hanldeZoneSave}
                                        color='primary'
                                        variant="outlined"
                                    >
                                        <SaveOutlinedIcon sx={{ color: 'primary' }} />
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box sx={{ width: '70%', height: 'auto', px: 2, py: 2 }}>
                            <MasterTable
                                rowData={formattedData}
                                setZoneStatus={setZoneStatus}
                                setZoneName={setZoneName}
                                setUpdateFlag={setUpdateFlag}
                                setUpdateData={setUpdateData}
                                refetch={refetch}
                                columnDefs={colDefs}
                            />
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}
