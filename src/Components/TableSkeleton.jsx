import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

const SkeletonLoader = ({ columnsCount, rowsCount, columnDefs }) => {
  const skeletons = [];

  // Header row with actual column names
  const headerRow = (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        backgroundColor: '#f4f4f4',
        borderBottom: '1px solid #ddd',
        padding: 1,
      }}
    >
      {columnDefs.map((colDef, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            marginRight: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {colDef.field}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  // Data skeleton rows
  for (let i = 0; i < rowsCount; i++) {
    skeletons.push(
      <Box
        key={i}
        display="flex"
        flexDirection="row"
        sx={{
          marginBottom: 1,
          borderBottom: '1px solid #ddd',
        }}
      >
        {Array(columnsCount)
          .fill(null)
          .map((_, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                marginRight: 1,
                padding: 1,
                borderLeft: index > 0 ? '1px solid #ddd' : 'none',
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height={20} // Row height
                sx={{ borderRadius: 1 }}
              />
            </Box>
          ))}
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* Render header and rows */}
      {headerRow}
      {skeletons}
    </Box>
  );
};

export default SkeletonLoader;
