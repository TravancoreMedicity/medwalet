import React, { useCallback, useMemo, useState } from 'react'
import { Box, Paper, IconButton } from '@mui/material'
import MasterHeader from '../../../Components/MasterHeader';
import Autocomplete from '@mui/joy/Autocomplete';
import Checkbox from '@mui/joy/Checkbox';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query'
import {
    getDepartment,
    getDepartmentSection,
    getDepartmentEmployee,
    getAllUserMaster,
    getAllUserRights
} from '../../CommonComponents/useQueryFunctions';
import { employeeID, errorNofity, succesNofity, warningNofity } from '../../../Constant/Constant';
import { ToastContainer } from 'react-toastify';
import { axioslogin } from '../../../AxiosConfig/Axiox';
import MasterTable from '../../CommonComponents/MasterTable';
import EditIcon from '@mui/icons-material/Edit';



const AutoComplete = ({ name, options, onChange, value }) => {
    return (
        <Autocomplete
            key={value}
            placeholder={name}
            options={options || []}
            getOptionLabel={(option) => option.dept_name || option.sec_name || option.em_name || option.user_name}
            sx={{ width: '100%', my: 2 }}
            onChange={onChange}
            value={value || null}
        />
    )
}


export default function UserRightMaster() {

    const [updateFlag, setUpdateFlag] = useState(0)
    const [departmentid, setDepartmentId] = useState(0)
    const [SectionId, setSectionId] = useState(0)
    const [employeeid, setEmployeeId] = useState(0)
    const [userid, setUserId] = useState(0);
    const [status, setStatus] = useState(false)
    const [updatedata, setUpdateData] = useState({})

    //get all deparment
    const { success, data: department } = useQuery({
        queryKey: ["department"],
        queryFn: getDepartment,
    })

    //get all deparment section
    const { success: departsecsuccess, data: departmentsec } = useQuery({
        queryKey: ["departmentselection", departmentid],
        queryFn: () => getDepartmentSection(departmentid),
        enabled: !!departmentid, // Trigger only if dept_id is available
    });

    //get all deparment employee
    const { success: employeesuccess, data: departmeentemployee } = useQuery({
        queryKey: ["departmentemeployye", SectionId],
        queryFn: () => getDepartmentEmployee(SectionId),
        enabled: !!SectionId,
    });

    const { success: usermastersuccess, data: alluserMaster } = useQuery({
        queryKey: ['alluserMaster'],
        queryFn: () => getAllUserMaster(),
        enabled: !!departmentid
    })

    const { success: userrightsuccess, data: allusersright, refetch: fetchuserright } = useQuery({
        queryKey: ['allusersright'],
        queryFn: () => getAllUserRights(),
    })

    const InsertionData = useMemo(() => ({
        dept_id: departmentid,
        sect_id: SectionId,
        emp_id: employeeid,
        user_group_id: userid,
        status: status ? 1 : 0,
        create_user: employeeID()
    }), [departmentid, SectionId, employeeid, userid, status, employeeID]);

    const updateData = useMemo(() => ({
        dept_id: departmentid,
        sect_id: SectionId,
        emp_id: employeeid,
        user_group_id: userid,
        status: status ? 1 : 0,
        edit_user: employeeID(),
        right_slno: updatedata.slNo,
    }), [updatedata, departmentid, SectionId, employeeid, userid, status, employeeID])


    const resetall = useCallback(() => {
        setDepartmentId(0);
        setSectionId(0);
        setEmployeeId(0)
        setUserId(0)
        setStatus(false)
    })

    const hanldeSubmitForm = useCallback(async () => {
        if (departmentid === 0
            || SectionId === 0
            || userid === 0
        ) return warningNofity("Please Fill the Blank Fields");

        if (updateFlag === 0) {
            try {
                const response = await axioslogin.post("/medvallet/createuserRight", InsertionData);
                const { success } = response.data;
                console.log(success, "success");

                if (success === 2) {
                    errorNofity("Data Already exists!")
                    resetall()
                } else {
                    succesNofity("Successfull Created !")
                    resetall()
                    fetchuserright()
                }
            } catch (err) {
                warningNofity(err.response.data.message);
            }
        } else {
            try {
                const result = await axioslogin.patch("/medvallet/updateuserRight", updateData)
                const data = result.data;
                if (data.success === 2) {
                    errorNofity("Error updating User!")
                } else {
                    succesNofity("Updated successfully !")
                    setUpdateFlag(0)
                    resetall()
                    fetchuserright()
                }
            } catch (err) {
                console.log(err);
            }
        }
    }, [updateData, InsertionData])



    const [colDefs] = useState([
        { field: 'slNo', flex: 1 },
        { field: 'Department', flex: 1 },
        { field: 'Section', flex: 1 },
        { field: 'Employee', flex: 1 },
        { field: 'EmployeeRight', flex: 1 },
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
        },
    ]);

    const formattedData = allusersright ?
        allusersright.map((data) => ({
            slNo: data.right_slno,
            Department: data.dept_name,
            Section: data.sec_name,
            Employee: data.em_name,
            EmployeeRight: data.user_name,
            Status: data.status === 1 ? 'Active' : 'Inactive',
            depid: data.dept_id,
            secid: data.sect_id,
            empid: data.emp_id,
            userid: data.user_group_id
        })) : []



    const getEdit = useCallback((params) => {

        const rowData = params.data;
        setDepartmentId(rowData.depid);
        setSectionId(rowData.secid);
        setEmployeeId(rowData.empid)
        setUserId(rowData.userid)
        setStatus(rowData.Status === "Active" ? true : false)
        setUpdateFlag(1)
        setUpdateData(rowData)
    }, [department]);



    return (
        <>
            <ToastContainer />
            <Box sx={{ width: '100%', height: '93vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paper elevation={3} sx={{ width: '98%', height: "90%", position: 'relative' }}>
                    <MasterHeader name={"Driver Master"} />
                    <Box sx={{ width: '100%', height: '90%', display: 'flex' }}>
                        <Box sx={{ width: '30%', height: '100%', px: 2, py: 2 }}>
                            <AutoComplete
                                name={"Select Deparment"}
                                options={department}
                                onChange={(e, value) => setDepartmentId(value ? value.dept_id : 0)}
                                value={department?.find(item => item.dept_id === departmentid) || null}

                            />
                            <AutoComplete
                                name={"Select Deparment Section"}
                                options={departmentsec}
                                onChange={(e, value) => setSectionId(value ? value.sec_id : 0)}
                                value={departmentsec?.find(item => item.sec_id === SectionId) || null}


                            />
                            <AutoComplete
                                name={"Select Department Employee"}
                                options={departmeentemployee}
                                onChange={(e, value) => setEmployeeId(value ? value.em_id : 0)}
                                value={departmeentemployee?.find(item => item.em_id === employeeid) || null}

                            />
                            <AutoComplete
                                name={"Select User"}
                                options={alluserMaster}
                                onChange={(e, value) => setUserId(value ? value.user_slno : 0)}
                                value={alluserMaster?.find(item => item.user_slno === userid) || null}

                            />
                            <Checkbox
                                label="User Right Status"
                                checked={status}
                                onChange={(e) => setStatus(e.target.checked)}
                            />
                            <Box sx={{ mt: 1 }}>
                                <Tooltip title="Save Change">
                                    <Button onClick={hanldeSubmitForm} color='primary' variant="outlined"><SaveOutlinedIcon sx={{ color: 'primary' }} /></Button>
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box sx={{ width: '70%', height: 'auto', px: 2, py: 2 }}>
                            <MasterTable
                                rowData={formattedData}
                                columnDefs={colDefs}
                            />
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}



