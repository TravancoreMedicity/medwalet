import { Paper } from '@mui/material'
import React, { lazy, memo, Suspense, useCallback, useMemo, useRef, useState } from 'react'
import { getAllVehicles } from '../CommonComponents/useQueryFunctions'
import { useQuery } from '@tanstack/react-query';
import MasterTable from '../CommonComponents/MasterTable';
import { axioslogin } from '../../AxiosConfig/Axiox';
import { errorNofity, warningNofity } from '../../Constant/Constant';
import { format } from 'date-fns';
import ReportComponents from '../CommonComponents/ReportComponents';
import FilterFunctionSkeleton from '../../Components/FilterSkeleton';


const FilterFunction = lazy(() => import("../CommonComponents/FilterFunction"))


function DriverRevenueReports() {
  const apiRef = useRef();
  const [selectedValue, setSelectedValue] = useState('a');
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date());
  const [todayvehicle, setTodayVehicle] = useState([])
  const [vehiclebetweendate, setVehicleBetweenDate] = useState([])
  const [loadingbetweenDate, setLoadingBetweenDate] = useState(false)


  const { success, data: allvehicles, refetch, isLoading: allvehilceLoading } = useQuery({
    queryKey: ['allvehicles'],
    queryFn: () => getAllVehicles(),
    enabled: selectedValue == 'a'
  })

  const handleChange = useCallback(async (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value === 'b') {
      setLoadingBetweenDate(true)
      const postData = { currentDate: format(new Date(), 'yyyy-MM-dd') }
      try {
        const response = await axioslogin.post('/medvehilces/getTodayVehicles', postData);
        const { success, data } = response.data;
        if (success === 1) {
          setLoadingBetweenDate(false)
          setTodayVehicle(data);
        }
      } catch (error) {
        errorNofity("Error fetching today's vehicles:", error);
      }
      setVehicleBetweenDate([])
    }
    if (event.target.value === 'a') {
      setVehicleBetweenDate([])
      setTodayVehicle([])
    }
  });

  const filterindData = selectedValue === "a" && allvehicles
    ? allvehicles : selectedValue === 'b' ?
      todayvehicle : vehiclebetweendate;

  const FilteringOnlyPayment = filterindData?.filter(vehicle => vehicle.vallet_type === 1);

  const GroupByEmployee = filterindData && FilteringOnlyPayment?.reduce((acc, vehicle) => {
    const driver = vehicle.driver_emid || "Unknown Zone";
    if (!acc[driver]) {
      acc[driver] = { count: 0, data: [] };
    }
    acc[driver].data.push(vehicle);
    acc[driver].count += 1;
    return acc;
  }, {});

  const FormatteddriverTotalRevenue = useMemo(() => {
    if (!allvehicles) return [];
    return Object.values(GroupByEmployee).map((data, index) => ({
      slNo: index + 1,
      DriverName: data?.data[0]?.em_name,
      VehicleCount: data.count,
      TotalAmount: data.count * 100
    }));
  })

  const getVehicleFromStartAndEnd = useCallback(async () => {
    setLoadingBetweenDate(true)
    const BothDate = {
      startDate: format(new Date(start), 'yyyy-MM-dd'),
      EndDate: format(new Date(end), 'yyyy-MM-dd'),
    }
    try {
      const response = await axioslogin.post('/medvehilces/getvehicleBetweenData', BothDate);
      const { success, data } = response.data;
      if (success === 1 && data.length === 0) {
        warningNofity("No data found")
        setLoadingBetweenDate(false)
        return
      }
      setVehicleBetweenDate(data)
      setLoadingBetweenDate(false)
    } catch (error) {
      errorNofity("Error fetching today's vehicles:", error);
    }
  }, [start, end]);



  const colDefs = useMemo(
    () => [
      { field: 'slNo', flex: 2 },
      { field: 'DriverName', flex: 2 },
      { field: 'VehicleCount', flex: 2 },
      { field: 'TotalAmount', flex: 2 },
    ],
    []
  );

  const download = useCallback(() => {
    if (apiRef.current && apiRef.current.api) {
      apiRef.current.api.exportDataAsCsv();
    }
  }, []);

  return (
    <ReportComponents
      title="Employee Vise Revenue Report"
      data={[]}
      displayClose={true}
      path={'/Reports/mainpage'}
      onDownload={download}

    >
      <Suspense fallback={<FilterFunctionSkeleton />}>
        <FilterFunction
          start={start}
          end={end}
          selectedValue={selectedValue}
          handleChange={handleChange}
          handleStartDateChange={setStart}
          getVehicleFromStartAndEnd={getVehicleFromStartAndEnd}
          handleEndDateChange={setEnd}
        />
      </Suspense>
      <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", width: "100%" }} >
        <MasterTable
          loading={selectedValue === "a" ? allvehilceLoading : loadingbetweenDate}
          rowData={FormatteddriverTotalRevenue}
          columnDefs={colDefs}
          apiRef={apiRef}
        />
      </Paper>
    </ReportComponents>
  )
}

export default memo(DriverRevenueReports)