import React, { lazy, useCallback, useMemo, useState } from 'react';
import { Box, IconButton, Paper } from '@mui/material'
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer } from 'react-toastify';
import { getAllSlotMaster, getAllZoneMaster } from '../../CommonComponents/useQueryFunctions';
import { useQuery } from '@tanstack/react-query';
import Autocomplete from '@mui/joy/Autocomplete';
import { employeeID, errorNofity, succesNofity, warningNofity } from '../../../Constant/Constant';
import { axioslogin } from '../../../AxiosConfig/Axiox';
import EditIcon from '@mui/icons-material/Edit';


 const MasterHeader = lazy(() => import('../../../Components/MasterHeader'));
 const MasterTable = lazy(() => import('../../CommonComponents/MasterTable'));


export default function SlotMaster() {
  const [slotname, setSlotName] = useState("")
  const [slotstatus, setSlotStatus] = useState(false)
  const [updateflag, setUpdateFlag] = useState(0);
  const [updatedata, setUpdateData] = useState({})
  const [zoneslno, setZoneSlNo] = useState(null);


  const { success, data: allzonemaster } = useQuery({
    queryKey: ['allzonemaster'],
    queryFn: () => getAllZoneMaster(),
  })


  const formattedData = allzonemaster ?
    allzonemaster.map((zone) => ({
      slNo: zone.zone_slno,
      label: zone.zone_name,
      Status: zone.zone_status === 1 ? 'Active' : 'Inactive',
    }))
    : [];


  const insertData = useMemo(()=>({
    slot_name: slotname,
    zone_slno: zoneslno,
    slot_status: slotstatus ? 1 : 0,
    create_user:employeeID()
  }))


  const updateData = useMemo(()=>( {
    slot_name: slotname,
    zone_slno: zoneslno,
    slot_status: slotstatus ? 1 : 0,
    create_user: employeeID(),
    slot_slno: updatedata.slNo
  }))

  
  const resetField = useCallback(() => {
    setSlotName("")
    setSlotStatus(false)
    setZoneSlNo(null)

  })

  const { success: slotmastersuccess, data: allsloteMaster, refetch } = useQuery({
    queryKey: ['alluserMaster'],
    queryFn: () => getAllSlotMaster(),
  })


  const formattedslotMaster = allsloteMaster ?
    allsloteMaster.map((slot) => ({
      slNo: slot.slot_slno,
      UserName: slot.slot_name,
      zonemaster: slot.zone_name,
      Status: slot.slot_status === 1 ? 'Active' : 'Inactive',
      zone_sl: slot.zone_slno
    })) : []




  const handleGroupsave = useCallback(async () => {
    if (slotname === "" || zoneslno === "") {
      return warningNofity("Please Fill the Blank Fields")
    }
    if (updateflag === 0) {
      try {
        const result = await axioslogin.post("/medvallet/createslotmaster", insertData)
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
        const result = await axioslogin.patch("/medvallet/updateslotmaster", updateData)
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
  });


  const [colDefs] = useState([
    { field: 'slNo', flex: 1 },
    { field: 'UserName', flex: 1 },
    { field: 'zonemaster', flex: 1 },
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



  const getEdit = useCallback((params) => {
    const rowData = params.data;
    setSlotName(rowData.UserName);
    setSlotStatus(rowData.Status === "Active" ? true : false);
    setZoneSlNo(rowData.zone_sl);
    setUpdateFlag(1);
    setUpdateData(rowData);

  }, []);


  return (
    <Box sx={{ width: '100%', height: '93vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ToastContainer />
      <Paper elevation={3} sx={{ width: '98%', height: '95%' }}>
        <MasterHeader name={"Zone Master"} />
        <Box sx={{ width: '100%', height: '90%', display: 'flex' }}>
          <Box sx={{ width: '30%', height: '100%', px: 2, py: 2 }}>
            <Autocomplete
              placeholder="Select Zone Master"
              options={formattedData}
              sx={{ width: '100%', mb: 1 }}
              onChange={(e, value) => setZoneSlNo(value ? value.slNo : null)}
              value={zoneslno ? formattedData.find((zone) => zone.slNo === zoneslno) || null : null}

            />
            <Input
              value={slotname}
              onChange={(e) => setSlotName(e.target.value)}
              sx={{ width: '100%' }}
              placeholder='Enter the Slot Name' />
            <Checkbox label=" Status"
              checked={slotstatus}
              onChange={(e) => setSlotStatus(e.target.checked)}
              sx={{ my: 2 }} />
            <Box>
              <Tooltip title="Save Group">
                <Button onClick={handleGroupsave} color='primary' variant="outlined">
                  <SaveOutlinedIcon sx={{ color: 'primary' }} />
                </Button>
              </Tooltip>
            </Box>
          </Box>
          <Box sx={{ width: '70%', height: 'auto', px: 2, py: 2 }}>
            <MasterTable
              rowData={formattedslotMaster}
              columnDefs={colDefs}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
