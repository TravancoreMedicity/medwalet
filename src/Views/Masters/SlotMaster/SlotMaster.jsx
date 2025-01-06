import React, { lazy, useCallback, useMemo, useState } from 'react';
import { Box, IconButton, Paper } from '@mui/material'
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Tooltip from '@mui/material/Tooltip';
import { getAllSlotMaster, getAllZoneMaster } from '../../CommonComponents/useQueryFunctions';
import { useQuery } from '@tanstack/react-query';
import Autocomplete from '@mui/joy/Autocomplete';
import { employeeID, errorNofity, succesNofity, warningNofity } from '../../../Constant/Constant';
import { axioslogin } from '../../../AxiosConfig/Axiox';
import EditIcon from '@mui/icons-material/Edit';


 const MasterHeader = lazy(() => import('../../../Components/MasterHeader'));
 const MasterTable = lazy(() => import('../../CommonComponents/MasterTable'));


export default function SlotMaster() {
  const [slotcount, setSlotCount] = useState(0)
  const [slotstatus, setSlotStatus] = useState(false)
  const [updateflag, setUpdateFlag] = useState(0);
  const [updatedata, setUpdateData] = useState({})
  const [zoneslno, setZoneSlNo] = useState(null);


  const {  data: allzonemaster } = useQuery({
    queryKey: ['allzonemaster'],
    queryFn: () => getAllZoneMaster(),
  })

  // the data is formated for easily displaying it in the Autocomplete component
  const formattedData = allzonemaster ?
    allzonemaster.map((zone) => ({
      slNo: zone.zone_slno,
      label: zone.zone_name,
      Status: zone.zone_status === 1 ? 'Active' : 'Inactive',
    }))
    : [];


  const insertData = useMemo(()=>({
    slot_count: slotcount,
    zone_slno: zoneslno,
    slot_status: slotstatus ? 1 : 0,
    create_user:employeeID()
  }),[slotcount,zoneslno,slotstatus])


  const updateData = useMemo(()=>( {
    slot_count: slotcount,
    zone_slno: zoneslno,
    slot_status: slotstatus ? 1 : 0,
    create_user: employeeID(),
    slot_slno: updatedata.slNo
  }),[slotcount,zoneslno,slotstatus,updatedata])

  
  const resetField = useCallback(() => {
    setSlotCount(0)
    setSlotStatus(false)
    setZoneSlNo(null)
  },[])

  const {  data: allsloteMaster, refetch } = useQuery({
    queryKey: ['alluserMaster'],
    queryFn: () => getAllSlotMaster(),
  })

    // the data is formated for easily displaying it in the Master Table
  const formattedslotMaster = allsloteMaster ?
    allsloteMaster.map((slot) => ({
      slNo: slot.slot_slno,
      Slotcount: slot.slot_count,
      zonemaster: slot.zone_name,
      Status: slot.slot_status === 1 ? 'Active' : 'Inactive',
      zone_sl: slot.zone_slno
    })) : []



    //insertion and updation of the slot master
  const handleGroupsave = useCallback(async () => {
    if (slotcount === null || zoneslno === "") {
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
        warningNofity(err);
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
        warningNofity(err);
      }
    }
  },[insertData,updateData,slotcount,zoneslno,refetch,updateflag,resetField]);

  //defining the column for the master table
  const [colDefs] = useState([
    { field: 'slNo' },
    { field: 'Slotcount' },
    { field: 'zonemaster' },
    { field: 'Status' },
    {
      headerName: 'Edit',
      field: 'edit',
      cellRenderer: params => (
        <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)}>
          <EditIcon color='primary' />
        </IconButton>
      ),
    },
  ]);


  //fetching the data for updation
  const getEdit = useCallback((params) => {
    const rowData = params.data;    
    setSlotCount(rowData.Slotcount);
    setSlotStatus(rowData.Status === "Active" ? true : false);
    setZoneSlNo(rowData.zone_sl);
    setUpdateFlag(1);
    setUpdateData(rowData);

  }, []);


  return (
    <Box sx={{ width: '100%', height: '93vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ width: '98%', height: '95%' }}>
        <MasterHeader name={"Slot Master"} />
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
              value={slotcount === 0 ? "":slotcount}
              onChange={(e) => setSlotCount(e.target.value)}
              sx={{ width: '100%' }}
              placeholder='Enter the Slot Count' />
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
