import React, { useCallback, useState } from 'react'
import { Box, Paper, useScrollTrigger } from '@mui/material'
import MasterHeader from '../../../Components/MasterHeader';
import Autocomplete from '@mui/joy/Autocomplete';
import Checkbox from '@mui/joy/Checkbox';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query'
import { getDepartment, getDepartmentSection, getDepartmentEmployee } from '../../CommonComponents/useQueryFunctions';
import { succesNofity, warningNofity } from '../../../Constant/Constant';
import { ToastContainer } from 'react-toastify';



const AutoComplete = ({ name, options, onChange, value }) => {
    return (
        <Autocomplete
            placeholder={name}
            options={options || []}
            getOptionLabel={(option) => option.dept_name || option.sec_name || option.em_name}
            sx={{ width: '100%', my: 2 }}
            onChange={onChange}
            value={value || null}
        />
    )
}


export default function DriverMain() {

    const [selectdepartment, setSelectDepartment] = useState(null);
    const [selectdepatmentsection, setselectDepatmentSection] = useState(null);
    const [selectemployee, setSelectEmployee] = useState(null);
    const [groupstatus, setGroupStatus] = useState(false)


    //department Onchange Fun
    const handleDepartmentSelection = useCallback(async (e, newValue) => {
        if (newValue) {
            setSelectDepartment(newValue);
            setselectDepatmentSection(null);
            setSelectEmployee(null)
        } else {
            setSelectDepartment(null);
            setselectDepatmentSection(null);
            setSelectEmployee(null)
        }
    })

    //department section onchange Fun
    const handleDepartmentSectionSel = useCallback(async (e, newValue) => {
        if (newValue) {
            setselectDepatmentSection(newValue);
            setSelectEmployee(null)
        } else {
            setselectDepatmentSection(null);
            setSelectEmployee(null)
        }
    })
    //department section employee Fun
    const handledeparmentEmployee = useCallback(async (e, newValue) => {
        if (newValue) {
            setSelectEmployee(newValue);
        } else {
            setSelectEmployee(null);
        }
    })

    //get all deparment
    const { success, data: department } = useQuery({
        queryKey: ["department"],
        queryFn: getDepartment,
    })

    //get all deparment section
    const { success: departsecsuccess, data: departmentsec } = useQuery({
        queryKey: ["departmentselection", selectdepartment],
        queryFn: () => getDepartmentSection(selectdepartment?.dept_id),
        enabled: !!selectdepartment?.dept_id,
    });

    //get all deparment employee
    const { success: employeesuccess, data: departmeentemployee } = useQuery({
        queryKey: ["departmentemeployye", selectdepatmentsection],
        queryFn: () => getDepartmentEmployee(selectdepatmentsection?.sec_id),
        enabled: !!selectdepatmentsection?.sec_id,
    });



    const departmentOptions = department ?
        department.map((dept) => ({
            dept_id: dept.dept_id,
            dept_name: dept.dept_name,
        }))
        : [];
    const departmentsection = departmentsec ?
        departmentsec.map((deptsec) => ({
            sec_id: deptsec.sec_id,
            sec_name: deptsec.sec_name,
        }))
        : [];

    const departmentemeployee = departmeentemployee ?
        departmeentemployee.map((deptemp) => ({
            em_id: deptemp.em_id,
            em_name: deptemp.em_name
        }))
        : [];


    const InsertionData = {
        dep_id:selectdepartment?.dept_id,
        sec_id:selectdepatmentsection?.sec_id,
        em_id:selectemployee?.em_id,
        status:groupstatus?1:0
    }

    const resetall = useCallback(()=>{
        setSelectDepartment(null);
        setselectDepatmentSection(null);
        setSelectEmployee(null);
    })

    const hanldeSubmitForm = useCallback(() => {
        if (!selectdepartment || !selectdepatmentsection || !selectemployee){
            warningNofity("Please fill all the Fields")
        }else{
            succesNofity("Inserted Successfully")
            console.log(InsertionData)
            resetall()
        }
    })


    return (
      <>
      <ToastContainer/>
      <Box sx={{ width: '100%', height: '93vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ width: '98%', height: '95%' }}>
                <MasterHeader name={"Driver Master"} />
                <Box sx={{ width: '100%', height: '90%', display: 'flex' }}>
                    <Box sx={{ width: '30%', height: '100%', px: 2, py: 2 }}>
                        <AutoComplete
                            name={"Select Deparment"}
                            options={departmentOptions}
                            value={selectdepartment}
                            onChange={handleDepartmentSelection}
                        />
                        <AutoComplete
                            name={"Select Deparment Section"}
                            options={departmentsection}
                            onChange={handleDepartmentSectionSel}
                            value={selectdepatmentsection}

                        />
                        <AutoComplete
                            name={"Select Department Employee"}
                            options={departmentemeployee}
                            onChange={handledeparmentEmployee}
                            value={selectemployee}
                        />
                        <Checkbox
                         label="User Right Status"
                         checked={groupstatus}
                         onChange={(e) => setGroupStatus(e.target.checked)}
                         />
                        <Box sx={{ mt: 1 }}>
                            <Tooltip title="Save Change">
                                <Button onClick={hanldeSubmitForm} color='primary' variant="outlined"><SaveOutlinedIcon sx={{ color: 'primary' }} /></Button>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
      </>
    )
}



