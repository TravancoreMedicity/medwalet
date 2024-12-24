import React, { useMemo } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import { useQuery } from '@tanstack/react-query';
import { getdriverDropdownReport } from '../Views/CommonComponents/useQueryFunctions';

export default function AllDriverAutoComplete({ driverselection, driver, setDriverEmpid }) {

    let TodayData = new Date().toISOString().slice(0, 10);

    const postData = useMemo(() => ({
        currentDate: TodayData
    }), [TodayData]);

    const { success: attendancesuccessReport, data: dirverAttendaceReport, refetch: fetchDriverReport } = useQuery({
        queryKey: ['dirverAttendaceReport'],
        queryFn: () => getdriverDropdownReport(),
        onError: (error) => {
            console.error("Error fetching driver attendance:", error);
        },
    });


    return (
        <FormControl sx={{ width: '100%' }}>
            <Autocomplete
                placeholder="Choose Driver"
                options={dirverAttendaceReport ? dirverAttendaceReport : []}
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
                        console.log(newValue, "value");
                        driverselection(newValue);
                        setDriverEmpid(newValue.emp_id)
                    }
                    else {
                        driverselection("")
                        setDriverEmpid("")
                    }
                }}
                value={driver || null}
                isOptionEqualToValue={(option, value) => option?.emp_id === value?.emp_id}
            />
        </FormControl>
    );
}

