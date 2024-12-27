import React, { useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Paper } from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import SkeletonLoader from '../../Components/TableSkeleton';
import { Box } from '@mui/joy';

export default function MasterTable({ rowData, columnDefs, loading ,apiRef}) {



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
      <Paper elevation={0}>
        <Box
          className="ag-theme-alpine"
          sx={{
            height: { xs: 540, sm: 620, md: 650, lg: 660, xl:670 },
            width: '100%',
          }}>
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
        </Box>
      </Paper>
      {/* <Box sx={{ height: 60, mt: 2, py: 2, cursor: 'pointer' }}>
        <SaveIcon
          onClick={exportToCsv}
          sx={{ color: '#6c757d', fontSize: 30 }} />
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Export as Csv</Typography>
      </Box> */}
    </>

  );
}
