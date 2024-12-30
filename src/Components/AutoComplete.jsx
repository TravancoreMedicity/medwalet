import React, { useMemo } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import { useQuery } from '@tanstack/react-query';
import { getallDriverforDropdown } from '../Views/CommonComponents/useQueryFunctions';

export default function LabourSelectBox({ driverselection, driver, setDriverEmpid }) {

  let TodayData = new Date().toISOString().slice(0, 10);

  const postData = useMemo(() => ({
    currentDate: TodayData
  }), [TodayData]);

  const { success: attendancesuccess, data: dirverAttendace, refetch: fetchDriver } = useQuery({
    queryKey: ['dirverAttendace'],
    queryFn: () => getallDriverforDropdown(postData),
    onError: (error) => {
      console.log("Error fetching driver attendance:", error);
    },
  });

  return (
    <FormControl sx={{ width: '100%' }}>
      <Autocomplete
        placeholder="Choose Driver"
        options={dirverAttendace ? dirverAttendace : []}
        getOptionLabel={(option) => option.em_name || ''}
        sx={{ width: '100', fontSize: { xs: 12, sm: 16, md: 15, lg: 16 } }}
        slotProps={{
          listbox: {
            sx: {
              zIndex: 99999,
              fontSize: { xs: 12, sm: 16, md: 15, lg: 16 }
            },
          },
        }}
        onChange={(event, newValue) => {
          if (newValue) {
            driverselection(newValue);
            setDriverEmpid(newValue.emp_id)
          }
          else {
            driverselection("")
            setDriverEmpid("")
          }
        }}
        value={driver || null}
        isOptionEqualToValue={(option, value) => option.empId === value?.empId}
      />
    </FormControl>
  );
}

