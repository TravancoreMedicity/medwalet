import React, { useCallback, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Paper } from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function MasterTable({ rowData, columnDefs }) {
  const onGridReady = (params) => {
    console.log('Grid is ready', params.api);
  };

  const rowStyle = {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  };

  return (
    <Paper
      className="ag-theme-alpine text-base font-bold"
      sx={{  minHeight: 200,height: 500, width: '100%', overflow: 'auto' }}  
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        rowHeight={30}
        headerHeight={40}
        animateRows={true}
        
      />
    </Paper>
  );
}
