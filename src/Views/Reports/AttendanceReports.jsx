import { Box, Button } from '@mui/joy';
import { Paper } from '@mui/material'
import React, { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import dayjs from 'dayjs';
import MasterTable from '../CommonComponents/MasterTable';
import { axioslogin } from '../../AxiosConfig/Axiox';
import { errorNofity, warningNofity } from '../../Constant/Constant';
import { getAllAttendaceReport } from '../CommonComponents/useQueryFunctions';
import { useQuery } from '@tanstack/react-query';
import FilterFunctionSkeleton from '../../Components/FilterSkeleton';




const Searchskeleton = lazy(() => import("../../Components/Searchskeleton"))
const ReportHeader = lazy(() => import("../../Components/ReportHeader"))
const FilterFunction = lazy(() => import("../CommonComponents/FilterFunction"))
const SearchComponent = lazy(() => import("../CommonComponents/SearchComponent"))

function AttendanceReports() {

  const [selectedValue, setSelectedValue] = useState('a');
  const [start, setStart] = useState(dayjs().format('YYYY-MM-DD'));
  const [end, setEnd] = useState(dayjs().format('YYYY-MM-DD'));
  const [todayvehicle, setTodayVehicle] = useState([])
  const [vehiclebetweendate, setVehicleBetweenDate] = useState([])
  const [driver, setDriver] = useState("");
  const [driverempid, setDriverEmpid] = useState("")
  const [employeeDetail, setEmployeeDetail] = useState([]);
  let TodayData = new Date().toISOString().slice(0, 10);
  const [loadingbetweenDate, setLoadingBetweenDate] = useState(false)

  const handleChange = useCallback(async (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value === 'b') {
      const vehicleData = await getVehiclesofToday();
      setTodayVehicle(vehicleData)
      setVehicleBetweenDate([])
      setDriver("")
      setDriverEmpid("")
    }
    if (event.target.value === 'a') {
      setVehicleBetweenDate([])
      setTodayVehicle([])
      setDriver("")
      setDriverEmpid("")
    }
  });


  const driverselection = useCallback((driver) => {
    if (!driver) {
      setSelectedValue('a')
    }
    setDriver(driver);
  }, []);

  const { success: AttendaceReportsucess, data: AttendaceReport, isLoading: Attendaceloading } = useQuery({
    queryKey: ['getAllAttendaceReport'],
    queryFn: () => getAllAttendaceReport(),
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

  const searchData = useMemo(() => ({
    driver_id: driverempid
  }))

  const handleEmployeeSearch = useCallback(async () => {
    setSelectedValue("")
    setLoadingBetweenDate(true)
    try {
      const response = await axioslogin.post('/medvallet/getselectedEmployee', searchData);
      const { success, data } = response.data;
      if (success === 2) return errorNofity("error in fetching data")
      setEmployeeDetail(data)
      setLoadingBetweenDate(false)
    } catch (err) {
      errorNofity("Error in searching!")
    }
  }, [searchData])


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
      const response = await axioslogin.post('/medvallet/getTodayAttendaceReport', postData);
      const { success, data } = response.data;
      if (success === 2) return errorNofity("error in fetching data")
      setLoadingBetweenDate(false)
      return data;
    } catch (error) {
      console.error("Error fetching today's vehicles:", error);
    }
  }, [postData]);


  const getVehicleFromStartAndEnd = useCallback(async () => {
    setLoadingBetweenDate(true)
    try {
      const response = await axioslogin.post('/medvallet/getAttendaceBetweenDate', BothDate);
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
  }, [BothDate]);


  const MappingData = selectedValue === 'a' && AttendaceReport ? AttendaceReport
    : selectedValue === 'b' ? todayvehicle
      : selectedValue === 'c' ? vehiclebetweendate
        : employeeDetail



    

  const formattedfinalData = useMemo(() => {
    if (!MappingData) return [];
    return MappingData?.map((data, index) => ({
      slNo: index + 1,
      DriverName: data?.em_name,
      CheckIn: data?.check_in_time,
      Checkout: data?.check_out_time === "9999-12-31 23:59:59" ? "Not Checked Out" : data?.check_out_time,
      TotalCount: data?.vehicle_count
    }));
  })


  const colDefs = useMemo(
    () => [
      { field: 'slNo', flex: 2 },
      { field: 'DriverName', flex: 2 },
      { field: 'CheckIn', flex: 2 },
      { field: 'Checkout', flex: 2 },
      { field: 'TotalCount', flex: 2 },
    ],
    []
  );

  return (
    <Box sx={{
      height: window.innerHeight - 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 1,
    }}>
      <ToastContainer />
      <Paper elevation={3}
        sx={{
          flex: 1,
          height: window.innerHeight - 80,
          position: 'relative',
          p: 1
        }}>
        <ReportHeader
          name={'Driver Attendace Reports'}
          path={'/Reports/mainpage'}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Suspense fallback={<FilterFunctionSkeleton />}>
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
          <Suspense fallback={<Searchskeleton />}>
            <SearchComponent
              driverselection={driverselection}
              driver={driver}
              setDriverEmpid={setDriverEmpid}
              handleEmployeeSearch={handleEmployeeSearch}

            />
          </Suspense>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: {md:'68%'},
            display: 'flex'
          }}>
          <Box sx={{
            width: '100%',
            height: '100%'
          }}>
            <MasterTable
              loading={selectedValue === 'a' ? Attendaceloading : loadingbetweenDate}
              rowData={formattedfinalData}
              columnDefs={colDefs}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default memo(AttendanceReports)