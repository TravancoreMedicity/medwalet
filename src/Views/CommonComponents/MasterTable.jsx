import React, { useCallback, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Paper, responsiveFontSizes, Tooltip } from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import SkeletonLoader from '../../Components/TableSkeleton';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Typography } from '@mui/joy';

export default function MasterTable({ rowData, columnDefs, loading }) {
  const apiRef = useRef();

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


  const exportToCsv = useCallback(() => {
    if (apiRef.current && apiRef.current.api) {
      apiRef.current.api.exportDataAsCsv();
    }
  }, []);

  if (loading) {
    return <SkeletonLoader columnsCount={columnDefs?.length} rowsCount={7} columnDefs={columnDefs} />
  }

  const overlayNoRowsTemplate = `<span class="ag-overlay-loading-center">No Data Available</span>`

  const cellStyle = {
    fontSize: '16px',
    fontFamily: "Roboto"
  };


  return (
    <>
      <Paper
        className="ag-theme-alpine text-base font-bold"
        sx={{ minHeight: 100, height: '100%', width: '100%', overflow: 'auto' }}>
        <AgGridReact
          ref={apiRef}
          rowData={rowData}
          rowHeight={40}
          headerHeight={40}
          animateRows={true}
          rowStyle={rowStyle}
          overlayNoRowsTemplate={!loading && rowData && rowData?.length === 0 && overlayNoRowsTemplate}
          columnDefs={columnDefs.map((colDef) => ({
            ...colDef,
            cellStyle: cellStyle,
          }))}
        />
      </Paper>
      <Box sx={{ height: 60, mt: 2, py: 2, cursor: 'pointer' }}>
        <SaveIcon
          onClick={exportToCsv}
          sx={{ color: '#6c757d', fontSize: 30 }} />
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Export as Csv</Typography>
      </Box>
    </>

  );
}
