import React, { useCallback, useMemo, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/joy/Chip';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Typography } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { getAllDriverUserRight, getallPresentDriver } from '../../CommonComponents/useQueryFunctions';
import { errorNofity, succesNofity, warningNofity } from '../../../Constant/Constant';
import { axioslogin } from '../../../AxiosConfig/Axiox';

function AttendaceCard() {
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
            const { success } = result.data;
            if (success === 2) {
                errorNofity("Error in creating User!");
            } else {
                succesNofity("Attendace updated");
                // setCheckedYes({});
                fetchDriver();
            }
        } catch (err) {
            warningNofity("Error during attendance submission:", err);
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


    return (
        <>
            {
                formatteddata?.map((driver) => {
                    const attendance = dirverAttendace?.find((d) => d.emp_id === driver.empid);
                    const inColor = attendance && attendance.instatus === 1 && attendance.outstatus !== 1 ? "green" : "";
                    const outColor = attendance && attendance.outstatus === 1 && attendance.instatus === 1 ? "red" : "";
                    const Status = attendance
                        ? attendance.instatus === 1 && attendance.outstatus === 1
                            ? "Checked out"
                            : attendance.instatus === 1
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
                        <Box sx={{
                            width: '97%',
                            height: 70,
                            bgcolor: 'white',
                            borderRadius: 5,
                            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                            display: 'flex',
                            alignItems: 'center',
                            px: 1,
                            my: 1
                        }}
                            key={driver.slNo}
                        >
                            <Avatar src="/broken-image.jpg" />
                            <Box sx={{
                                width: '50%',
                                height: '100%',
                                marginLeft: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',

                            }}>
                                <Typography sx={{ fontSize: 10 }}><strong style={{ marginRight: 2 }}>Name</strong>:{driver.Drivers}</Typography>
                                <Box sx={{ fontSize: 10 }}>
                                    <strong style={{ marginRight: 2 }}>Status</strong>
                                    : <Chip
                                        color={statusColor}
                                        sx={{
                                            fontSize: 9,
                                            color: statusColor,
                                        }}
                                    >{Status}</Chip>
                                </Box>
                            </Box>
                            <Box sx={{
                                width: '40%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}>
                                <TaskAltIcon
                                    sx={{ color: inColor }}
                                    onClick={() => {
                                        handleCheckboxChange(driver.empid, 'yes')
                                    }}
                                />
                                <HighlightOffIcon
                                    sx={{ color: outColor }}
                                    onClick={() => handleCheckboxChange(driver.empid, 'no')}
                                />
                            </Box>
                        </Box>
                    )
                })
            }
        </>
    )
}

export default AttendaceCard