import { Box, Button, Tooltip, Typography } from '@mui/joy';
import { Paper } from '@mui/material'
import React, { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import MasterHeader from '../../Components/MasterHeader'
import { getAllVehicles } from '../CommonComponents/useQueryFunctions'
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import MasterTable from '../CommonComponents/MasterTable';
import { axioslogin } from '../../AxiosConfig/Axiox';
import { warningNofity } from '../../Constant/Constant';


const FilterFunction = lazy(() => import("../CommonComponents/FilterFunction"))
const ReportHeader = lazy(() => import("../../Components/ReportHeader"))

function DriverRevenueReports() {


  const [selectedValue, setSelectedValue] = useState('a');
  const [start, setStart] = useState(dayjs().format('YYYY-MM-DD'));
  const [end, setEnd] = useState(dayjs().format('YYYY-MM-DD'));
  const [todayvehicle, setTodayVehicle] = useState([])
  const [vehiclebetweendate, setVehicleBetweenDate] = useState([])
  const [loadingbetweenDate, setLoadingBetweenDate] = useState(false)
  let TodayData = new Date().toISOString().slice(0, 10);

  const { success, data: allvehicles, refetch, isLoading: allvehilceLoading } = useQuery({
    queryKey: ['allvehicles'],
    queryFn: () => getAllVehicles(),
    enabled: selectedValue == 'a'
  })
  const handleChange = useCallback(async (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value === 'b') {
      const vehicleData = await getVehiclesofToday();
      setTodayVehicle(vehicleData)
      setVehicleBetweenDate([])
    }
    if (event.target.value === 'a') {
      setVehicleBetweenDate([])
      setTodayVehicle([])
    }
  });

  const filterindData = selectedValue === "a" && allvehicles ? allvehicles : selectedValue === 'b' ? todayvehicle : vehiclebetweendate;

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


  const postData = useMemo(() => ({
    currentDate: TodayData
  }), [TodayData]);

  const BothDate = useMemo(() => ({
    startDate: start,
    EndDate: end,
  }), [start, end]);

  const getVehiclesofToday = useCallback(async () => {
    setLoadingBetweenDate(true)
    try {
      const response = await axioslogin.post('/medvehilces/getTodayVehicles', postData);
      const { success, data } = response.data;
      console.log(data, "Today Vehicles");
      if (success === 1) {
        setLoadingBetweenDate(false)
        return data;
      }
    } catch (error) {
      console.error("Error fetching today's vehicles:", error);
    }
  });


  const getVehicleFromStartAndEnd = useCallback(async () => {
    setLoadingBetweenDate(true)
    try {
      const response = await axioslogin.post('/medvehilces/getvehicleBetweenData', BothDate);
      const { success, data } = response.data;
      console.log(data, "Vehicle data");
      if (success === 1 && data.length === 0) {
        warningNofity("No data found")
        setLoadingBetweenDate(false)
        return
      }
      setVehicleBetweenDate(data)
      setLoadingBetweenDate(false)
    } catch (error) {
      console.error("Error fetching today's vehicles:", error);
    }
  });

  const handleStartDateChange = (newValue) => {
    const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
    if (dayjs(formattedDate).isValid()) {
      setStart(formattedDate);
    }
  };

  const handleEndDateChange = (newValue) => {
    const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
    if (dayjs(formattedDate).isValid()) {
      setEnd(formattedDate);
    }
  };




  const colDefs = useMemo(
    () => [
      { field: 'slNo', flex: 2 },
      { field: 'DriverName', flex: 2 },
      { field: 'VehicleCount', flex: 2 },
      { field: 'TotalAmount', flex: 2 },
    ],
    []
  );

  return (
    <Box sx={{
      height: window.innerHeight - 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 1
    }}>
      <ToastContainer />
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          height: window.innerHeight - 80,
          position: 'relative',
          p: 1
        }}>
        <ReportHeader
          name={'Employee Vise Revenue Report'}
          path={'/Reports/mainpage'}
        />
        <Suspense
          fallback="loading">
          <FilterFunction
            start={start}
            end={end}
            selectedValue={selectedValue}
            handleChange={handleChange}
            handleStartDateChange={handleStartDateChange}
            getVehicleFromStartAndEnd={getVehicleFromStartAndEnd}
            handleEndDateChange={handleEndDateChange}
          />
        </Suspense>
        <Box
          sx={{
            width: '100%',
            height: { md: '68%' },
            display: 'flex'
          }}>
          <Box sx={{
            width: '100%',
            height: '100%'
          }}>
            <MasterTable
              loading={selectedValue === "a" ? allvehilceLoading : loadingbetweenDate}
              rowData={FormatteddriverTotalRevenue}
              columnDefs={colDefs}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default memo(DriverRevenueReports)