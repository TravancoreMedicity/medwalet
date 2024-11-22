import { Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import MasterHeader from '../../../Components/MasterHeader'
import UsergroupName from './UsergroupName'
import UserTable from './UserTable'
import { AgGridReact } from 'ag-grid-react'
// import 'ag-grid-community/dist/styles/ag-grid.min.css'
// import 'ag-grid-community/dist/styles/ag-theme-alpine.min.css'

export default function UserMasterDashboard() {
    const [groupname, setGroupName] = useState("")
    const [groupstatus, setGroupStatus] = useState(false)

    const [rowData, setRowData] = useState([
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);
    
    const [colDefs, setColDefs] = useState([
      { field: "make" },
      { field: "model" },
      { field: "price" },
      { field: "electric" }
    ]);
   
  return (
    <Box sx={{width:'100%',height:'93vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Paper elevation={3} sx={{width:'98%',height:'95%'}}>
            <MasterHeader name={'User Group Master'}/>
            <Box sx={{ width: '100%', height: '90%', display: 'flex'}}>
                <UsergroupName groupname={groupname} groupstatus={groupstatus} setGroupName={setGroupName} setGroupStatus={setGroupStatus}/>
                {/* <UserTable setGroupName={setGroupName} setGroupStatus={setGroupStatus} /> */}
                {/* <AgGridReact
       rowData={rowData}
       columnDefs={colDefs}
   />*/}
            </Box> 
        </Paper>
    </Box>
  )
}
