import React, { lazy, useCallback, useMemo, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material'
import { ToastContainer } from 'react-toastify';
import {
    getAllDriverUserRight,
    getallPresentDriver,
} from '../../CommonComponents/useQueryFunctions';
import { useQuery } from '@tanstack/react-query';
import { errorNofity, succesNofity, warningNofity } from '../../../Constant/Constant';
import { axioslogin } from '../../../AxiosConfig/Axiox';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Chip from '@mui/joy/Chip';
import { format } from 'date-fns';


const MasterHeader = lazy(() => import('../../../Components/MasterHeader'));
const MasterTable = lazy(() => import('../../CommonComponents/MasterTable'));


export default function DriverMaster() {

    let DiaplayTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
    const [checkedYes, setCheckedYes] = useState({
        empid: '',
        status: ''
    });


    let TodayData = new Date().toISOString().slice(0, 10);
    let CurrentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

    const { success: userrightsuccess, data: allusersright, refetch: fetchuserright } = useQuery({
        queryKey: ['getAllDriverUserRight'],
        queryFn: () => getAllDriverUserRight(),
    });

    const postData = useMemo(() => ({
        currentDate: TodayData
    }), [TodayData]);

    const { success: attendancesuccess, data: dirverAttendace, refetch: fetchDriver } = useQuery({
        queryKey: ['dirverAttendace'],
        queryFn: () => getallPresentDriver(postData),
        onError: (error) => {
            console.log("Error fetching driver attendance:", error);
        },
    });

    const handleCheckboxChange = useCallback((empid, value) => {
        if (checkedYes.empid === empid && checkedYes.status === value) {
            return;
        }

        const updatedCheckedYes = {
            empid: empid,
            status: value
        };
        setCheckedYes(updatedCheckedYes);
        handleattendance(updatedCheckedYes);
    }, [checkedYes, dirverAttendace]);




    const handleattendance = useCallback(async (updatedCheckedYes) => {

        if (!updatedCheckedYes || !updatedCheckedYes.empid) {
            return warningNofity("Please select Values");
        }

        const matchedAttendance = dirverAttendace?.find((driver) => {
            return driver.emp_id === updatedCheckedYes.empid;
        });


        const formattedData = {
            empid: updatedCheckedYes.empid,
            in: updatedCheckedYes.status === "yes" ? 1 : 0,
            out: updatedCheckedYes.status === "no" ? 1 : 0,
            inTime: updatedCheckedYes.status === "yes" ? `${TodayData} ${CurrentTime}` : null,
            outTime: updatedCheckedYes.status === "no" ? `${TodayData} ${CurrentTime}` : null,
            currentDate: TodayData,
            slno: matchedAttendance ? matchedAttendance.slno : null,
        };

        try {
            const result = await axioslogin.post("/medvallet/createnewCurrentDriver", formattedData);
            const { success, message } = result.data;
            if (success === 2) {
                errorNofity("Error in creating User!");
            } else {
                succesNofity(message);
                // setCheckedYes({});
                fetchDriver();
            }
        } catch (err) {
            errorNofity("Error during attendance submission:", err);
        }
    }, [dirverAttendace, TodayData, CurrentTime]);



    const formatteddata = useMemo(() => {
        return allusersright
            ? allusersright
                .map(data => {
                    return {
                        slNo: data.right_slno,
                        Drivers: data.em_name,
                        empid: data.emp_id,
                        userid: data.user_group_id,
                    };
                })
            : [];
    }, [allusersright, checkedYes]);


    const colDefs = useMemo(
        () => [
            { field: 'slNo', flex: 2 },
            { field: 'Drivers', flex: 2 },
            {
                headerName: 'Status',
                field: 'Status',
                flex: 3,
                cellRenderer: params => {
                    const matchedAttendance = dirverAttendace?.find(driver => driver.emp_id === params.data.empid);
                    const Status = matchedAttendance
                        ? matchedAttendance.instatus === 1 && matchedAttendance.outstatus === 1
                            ? "Checked out"
                            : matchedAttendance.instatus === 1
                                ? "Checked In"
                                : "Not Checked Yet"
                        : "Not Checked Yet";
                    const statusColor =
                        Status === "Checked out"
                            ? "danger"
                            : Status === "Checked In"
                                ? "success"
                                : "primary";
                    return (
                        <Chip
                            color={statusColor}
                            sx={{
                                fontWeight: 'bold',
                                color: statusColor,
                                textTransform: 'capitalize',
                            }}
                        >
                            {Status}
                        </Chip>
                    );
                },
            },

            {
                headerName: 'CheckIn',
                field: 'CheckIn',
                flex: 2,
                cellRenderer: params => {
                    const driver = dirverAttendace?.find(driver => driver.emp_id === params.data.empid);
                    const inColor = driver && driver.instatus === 1 && driver.outstatus !== 1 ? "green" : "";
                    return (
                        <TaskAltIcon
                            sx={{ color: inColor }}
                            onClick={() => {
                                handleCheckboxChange(params.data.empid, 'yes')
                            }}
                        />
                    )
                },
            },
            {
                headerName: 'CheckOut',
                field: 'CheckOut',
                flex: 2,
                cellRenderer: params => {
                    const driver = dirverAttendace?.find(driver => driver.emp_id === params.data.empid);
                    const outColor = driver && driver.outstatus === 1 && driver.instatus === 1 ? "red" : "";
                    return (

                        <HighlightOffIcon
                            sx={{ color: outColor }}
                            onClick={() => {
                                handleCheckboxChange(params.data.empid, 'no')
                            }}
                        />
                    )
                },
            },
        ],
        [checkedYes, dirverAttendace]
    );


    return (
        <Box sx={{
            width: '100%',
            height: '93vh',
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }}>
            <ToastContainer />
            <Paper
                elevation={3}
                sx={{
                    width: '98%',
                    height: "90%",
                    px: 2,
                    py: 2,
                    position: 'relative'
                }}>
                <MasterHeader name={"Driver Attendance"} />
                <Box sx={{
                    width: '100%',
                    // height: '5%',
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    justifyContent: 'space-between',
                    bgcolor: 'white',
                    my: 1,
                    borderRadius: 1
                }}>
                    <Typography sx={{ fontSize: 16 }}>Current Date: {format(new Date(), 'dd-MM-yyyy')}</Typography>
                    <Typography sx={{ fontSize: 16 }}>Current Time: {DiaplayTime}</Typography>
                </Box>
                <Box sx={{ width: '100%', height: '70%', display: 'flex' }}>
                    <Box sx={{ width: '100%', height: '90%' }}>
                        <MasterTable
                            rowData={formatteddata}
                            columnDefs={colDefs} />
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}
